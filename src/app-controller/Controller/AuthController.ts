import { inject, injectable } from "inversify";
import "reflect-metadata";
import bcrypt from "bcrypt";
import { TYPES } from "@app-type/types";
import jwt = require("jsonwebtoken");
import UsersModel from "../../app-models/Users/user";
import { generateToken } from "../../app-utils/helpFc";
import { Request, Response, validationRequest } from "@app-helpers/httpExtends";
// import { Response, Request } from "express";
import logger from "@app-helpers/logger";
import { IUserService } from "@app-services/interfaces/IUserService";
import { IExpiredTokensService } from "@app-services/interfaces/IExpiredTokensService";
import { IAuthenticationService } from "@app-services/interfaces/IAuthenticationService";
import ResponseCodes from "@app-type/ResCode/resCode";
import { IOtpService } from "@app-services/interfaces/IOtpService";
import { OtpClientInterface } from "@app-models/Otp/otp";
import { Encrypt, isExpireTime } from "@app-helpers/otp.helper";
import MessageErrors from "@app-common/MessageErrors";
import { USER_STATUS } from "@app-common/constant/userConstant";
import { Types } from "mongoose";
import { convertCountryCodePhoneNumber } from "@app-helpers/String.helper";
import { UserLoginModelInterface } from "@app-models/Users/user-login";
import { Platform } from "@app-controller/requests";
import { RANDOM_TOKEN_SECRET } from "@app-configs";
import { IUserLoginService } from "@app-services/interfaces/IUserLoginService";
import { parseJwt } from "@app-helpers/Token.helper";

interface UserCreate {
  username: string;
}
enum USER_ROLE {
  USER = "user",
}
@injectable()
class AuthenticationUserController {
  @inject(TYPES.UserService)
  private readonly userService!: IUserService;
  // @inject(TYPES.UserRoleService)
  // private readonly userRoleService!: IUserRoleService;
  @inject(TYPES.AuthenticationService)
  private readonly authenticationService!: IAuthenticationService;
  @inject(TYPES.OtpService) private readonly otpService!: IOtpService;
  @inject(TYPES.UserLoginService)
  private readonly userLoginService!: IUserLoginService;
  @inject(TYPES.ExpiredTokensService)
  private readonly expiredTokensService!: IExpiredTokensService;

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber, username, email, fullName } = req.body;

      req.body.username = phoneNumber;

      const data = await this.userService.createUser({
        ...req.body,
      });
      const newOtp = await this.otpService.generateOtp(data);
      return res.status(ResponseCodes.Success).json({
        data: {
          _id: data._id,
          username: username || phoneNumber,
          email,
          phoneNumber,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
          avatar: data.avatar,
          fullName,
          hash: newOtp,
        },
      });
    } catch (error) {
      logger.error(error);
      return res.status(ResponseCodes.ServerError);
    }
  }
  async signIn(req: Request, res: Response) {
    try {
      logger.info(req.url);
      const {
        username,
        password,
        phoneNumber,
        platform,
        deviceId,
        firebaseToken,
      } = req.body;
      const convertPhoneNumber = convertCountryCodePhoneNumber(phoneNumber);
      const query: any = {
        phoneNumber: { $in: convertPhoneNumber },
        status: USER_STATUS.ACTIVE,
      };
      // switch (platform) {
      //   case Platform.WEB:
      //     query.username = username;
      //     break;
      //   case Platform.MOBILE:
      //     query = {
      //       phoneNumber: { $in: convertPhoneNumber },
      //       status: USER_STATUS.ACTIVE,
      //     };
      //     //query.phoneNumber = convertPhoneNumber;
      //     break;
      // }
      const _user = await this.userService.getUser(query);
      if (!_user) {
        return res
          .status(ResponseCodes.InvalidUser)
          .json({ message: MessageErrors.user.invalid });
      }
      const user = req.body;
      const isMatch = await bcrypt.compare(password, _user.password);
      if (!isMatch) {
        return res.json({ message: MessageErrors.user.invalid });
      }
      const userData = await this.authenticationService.signIn({
        ...user,
      });

      if (!userData) {
        return res
          .status(ResponseCodes.NotFound)
          .json({ message: MessageErrors.user.notFound });
      }

      const {
        payload,
        userRole,
        fullName,
        avatar,
        email,
        phoneNumber: userPhoneNumber,
        isDriver,
      } = userData;

      if (!payload) {
        return res.json({});
      }
      // if (_user.loginTime == null) {
      //   await this.advertisementService.useAdvertisement({ userId: _user._id });
      // }

      if (Platform.MOBILE === platform) {
        const loginTime = new Date();
        const filter = _user.deviceIdentifier.filter((el: any) => {
          return el.deviceId !== deviceId;
        });

        await this.userService.updateUserByFields(_user._id, {
          deviceIdentifier: [{ deviceId, firebaseToken }, ...filter],
          loginTime: loginTime,
        });
      }

      const token = jwt.sign(payload, RANDOM_TOKEN_SECRET, {
        expiresIn: "60d",
      });

      //thêm data vào userLogins
      const userLoginRequest: UserLoginModelInterface = {
        userId: _user._id,
        deviceId: deviceId,
        token: token,
        loginTime: new Date(),
        createdBy: user.phoneNumber,
        updatedBy: user.phoneNumber,
        createDate: new Date(),
        updatedDate: new Date(),
        _id: new Types.ObjectId(),
      };

      this.userLoginService.createUserLogin(userLoginRequest);
      const hasPassword = !!_user.password;

      return res.status(ResponseCodes.Success).json({
        data: {
          username: _user.username,
          inAutoConfirm: _user.inAutoConfirm || false,
          token,
          userRole,
          fullName,
          avatar,
          phoneNumber: userPhoneNumber,
          email,
          isDriver,
          hasPassword,
          isApple: !!_user?.idApple,
          isFacebook: !!_user?.idFacebook,
          isGoogle: !!_user?.idGoogle,
        },
      });
    } catch (error) {
      logger.error(error);
      return res.status(ResponseCodes.ServerError).json({});
    }
  }

  async signOut(req: Request, res: Response) {
    try {
      const { platform, deviceId } = req.body;

      const token = req.headers.authorization.split(" ")[1];
      const { _id: userId } = parseJwt(token);
      await this.expiredTokensService.create(token, userId);

      if (platform === Platform.MOBILE) {
        const user = await this.userService.getUser({ _id: userId });

        if (!user) {
          return res
            .status(ResponseCodes.NotFound)
            .json({ message: MessageErrors.user.notFound });
        }

        await this.userService.updateUserByFields(userId, {
          deviceIdentifier: user.deviceIdentifier.filter(
            (el: any) => el.deviceId !== deviceId
          ),
        });
        await this.userService.deleteUserLogin(userId);

        return res
          .status(ResponseCodes.Success)
          .json({ message: MessageErrors.server.success });
      }

      return res
        .status(ResponseCodes.Success)
        .json({ message: MessageErrors.server.success });
    } catch (error) {
      logger.error(error);
      return res.status(ResponseCodes.ServerError).json({ error: error });
    }
  }

  async verifyOTPSignUp(req: Request, res: Response) {
    try {
      const { otp, hash } = req.body;

      const otpRequest: OtpClientInterface = JSON.parse(Encrypt.decrypt(hash));
      if (otp !== otpRequest.otp) {
        return res.json({ message: MessageErrors.field.otp.invalid });
      }

      if (isExpireTime(otpRequest.expirationTime)) {
        return res.json({ message: MessageErrors.field.otp.expirate });
      }

      const existOtp = await this.otpService.getOtpByOtp(otp);
      if (existOtp == null) {
        return res.json({ message: MessageErrors.field.otp.invalid });
      }
      if (existOtp.salt != req.body.userId) {
        return res.json({ message: MessageErrors.field.otp.invalid });
      }
      if (existOtp.verified) {
        return res.json({ message: MessageErrors.field.otp.expirate });
      }

      await this.otpService.updateOtpByFields(otpRequest._id, {
        verified: true,
      });
      const userIds = [req.body.userId];
      await this.userService.toggleActivateUser(userIds, 1);
      return res
        .status(ResponseCodes.Success)
        .json({ data: { userId: req.body.userId } });
    } catch (error) {
      logger.error(error);
      return res.status(ResponseCodes.ServerError).json({ error: error });
    }
  }

  async resendOtpSignUp(req: Request, res: Response) {
    try {
      const _id = req.headers.userid;
      const user = await this.userService.getUser({
        _id,
        status: USER_STATUS.INACTIVE,
      });
      if (!user) {
        return res.json({ message: MessageErrors.user.notFound });
      }
      const { hash } = req.body;
      const otpRequest: OtpClientInterface = JSON.parse(Encrypt.decrypt(hash));

      if (!isExpireTime(otpRequest.expirationTime)) {
        return res.json({ message: MessageErrors.field.otp.tooSoon });
      }
      const existOtp = await this.otpService.getOtpById(otpRequest._id);
      if (!existOtp) {
        return res.json({ message: MessageErrors.field.otp.expirate });
      }
      if (!isExpireTime(existOtp.expirationTime)) {
        return res.json({ message: MessageErrors.field.otp.tooSoon });
      }

      const newOtp = await this.otpService.generateOtp(user);
      return res.status(ResponseCodes.Success).json({
        data: {
          hash: newOtp,
        },
      });
    } catch (error) {
      logger.error(error);
      res.status(ResponseCodes.ServerError);
    }
  }
}

export default AuthenticationUserController;
