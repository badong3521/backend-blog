import { inject, injectable } from "inversify";
import { Types } from "mongoose";
import DateHelper from "../app-helpers/date.helper";
import OtpHelper, { Encrypt } from "@app-helpers/otp.helper";
import { ZaloTemplate } from "@app-common/Constant";
import otp, {
  OtpClientInterface,
  OtpModelInterface,
} from "../app-models/Otp/otp";
import { TYPES } from "../app-type/types";
import { UserModelInterface } from "../app-models/Users/user";
import { SendEmail } from "../app-utils/smtp/index";
import {
  MailTemplateOTP,
  MailTemplateOTPChangePassword,
} from "../app-utils/smtp/MailTemplate";
import logger from "@app-helpers/logger";

// import { Zalo } from "@app-repositories/zalo";
import { IOtpService } from "../app-services/interfaces/IOtpService";
import { IUserService } from "../app-services/interfaces/IUserService";

@injectable()
export class OtpService implements IOtpService {
  generateOtpSendZalo(user: UserModelInterface): Promise<string> {
    throw new Error("Method not implemented.");
  }
  @inject(TYPES.UserService)
  private readonly userService!: IUserService;
  async generateOtp(
    user: UserModelInterface,
    title = MailTemplateOTPChangePassword.otpTitle
  ): Promise<string> {
    try {
      const otpCode = OtpHelper.generateOTP();
      const expirationTime = DateHelper.addMinutesToDate(
        new Date(new Date().toISOString()),
        1
      );
      const otpObject: OtpModelInterface = await otp.create({
        otp: otpCode,
        expirationTime,
        salt: user._id,
      });
      const { email, fullName } = user;
      const index = user.phoneNumber.length - 4;
      const phoneNumber = user.phoneNumber.substring(index);
      await SendEmail.nodeMailerSendMail(
        [email],
        title,
        MailTemplateOTP.otpTemplate({
          fullName,
          otpCode,
          phoneNumber: `xxxx${phoneNumber}`,
        })
      );

      const objResponstToClient: OtpClientInterface = {
        _id: otpObject._id,
        otp: otpObject.otp,
        verified: otpObject.verified,
        expirationTime: otpObject.expirationTime,
        salt: otpObject.salt,
      };

      const result = Encrypt.encrypt(JSON.stringify(objResponstToClient));
      return result;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  // async generateOtpSendZalo(user: UserModelInterface): Promise<string> {
  //   try {
  //     const otpCode = OtpHelper.generateOTP();
  //     const expirationTime = DateHelper.addMinutesToDate(new Date(), 1);
  //     const otpObject: OtpModelInterface = await otp.create({
  //       otp: otpCode,
  //       expirationTime,
  //       salt: user._id,
  //     });
  //     let phoneNumber = user.phoneNumber;
  //     if (phoneNumber.substring(0, 1) === "0") {
  //       phoneNumber = phoneNumber.slice(1);
  //       phoneNumber = "+84" + phoneNumber;
  //     }
  //     const sendZaloRequest = {
  //       phone: phoneNumber,
  //       templateId: ZaloTemplate.SignUpOTP,
  //       templateData: {
  //         otp: otpCode,
  //       },
  //     };
  //     await Zalo.sendSMS(sendZaloRequest);

  //     const objResponstToClient: OtpClientInterface = {
  //       _id: otpObject._id,
  //       otp: otpObject.otp,
  //       verified: otpObject.verified,
  //       expirationTime: otpObject.expirationTime,
  //       salt: otpObject.salt,
  //     };

  //     const result = Encrypt.encrypt(JSON.stringify(objResponstToClient));
  //     return result;
  //   } catch (err) {
  //     logger.error(err);
  //     throw err;
  //   }
  // }

  async updateOtpByFields(_id: Types.ObjectId, _otp: any) {
    await otp.updateOne({ _id }, { $set: { ..._otp } });
  }

  async getOtpById(_id: Types.ObjectId) {
    return otp.findById(_id);
  }
  async getOtpByOtp(otpCode: string) {
    return otp.findOne({ otp: otpCode });
  }
  async deleteOtp(id: Types.ObjectId[]) {
    const result = await otp.deleteMany({
      _id: {
        $in: id.map((item) => {
          return new Types.ObjectId(item);
        }),
      },
    });

    if (result.deletedCount >= 0) {
      return result.deletedCount;
    }

    return result;
  }
}
