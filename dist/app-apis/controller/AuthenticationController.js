"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
// import { Types } from "mongoose";
const http_extends_1 = require("../../app-helpers/http.extends");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const types_1 = require("../../app-type/types");
const MessageErrors_1 = __importDefault(require("../../app-common/MessageErrors"));
// import { ExpiredTokensService } from "../../app-services/ExpiredTokensService";
const logger_1 = __importDefault(require("../../app-helpers/logger"));
// import { UserLoginModelInterface } from "../../app-repositories/models/user-login";
// import { MailTemplateOTPChangePassword } from "../../app-repositories/smtp/MailTemplate";
// import { UseAdvertisementRequest } from "../../app-models/Advertisement/UseAdvertisementRequest";
const userConstant_1 = require("../../app-common/constant/userConstant");
// import { IUserLoginService } from "../../app-services/interfaces/IUserLoginService";
// import { IUserRoleService } from "../../app-services/interfaces/IUserRoleService";
// import user from "@app-repositories/models/user";
// import { type } from "../../../node_modules/@types/node/buffer.d";
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["USER"] = "user";
})(USER_ROLE || (USER_ROLE = {}));
let AuthenticationController = class AuthenticationController {
    // @inject(TYPES.AuthenticationService)
    // private readonly authenticationService: IAuthenticationService;
    // @inject(TYPES.UserRoleService)
    // private readonly userRoleService: IUserRoleService;
    // @inject(TYPES.ExpiredTokensService)
    // private readonly expiredTokensService: ExpiredTokensService;
    // // @inject(TYPES.OtpService) private readonly otpService: IOtpService;
    // @inject(TYPES.UserLoginService)
    // private readonly userloginService: IUserLoginService;
    // @inject(TYPES.AdvertisementService)
    // private readonly advertisementService: IAdvertisementService;
    // async signIn(req: Request, res: Response) {
    //   try {
    //     const result = validationRequest(req);
    //     if (!result.isEmpty()) {
    //       return res.errorRes({ errors: result.array() });
    //     }
    //     logger.info(req.url);
    //     const {
    //       username,
    //       password,
    //       phoneNumber,
    //       platform,
    //       deviceId,
    //       firebaseToken,
    //     } = req.body;
    //     const convertPhoneNumber = convertCountryCodePhoneNumber(phoneNumber);
    //     let query: any = { status: USER_STATUS.ACTIVE };
    //     switch (platform) {
    //       case Platform.WEB:
    //         query.username = username;
    //         break;
    //       case Platform.MOBILE:
    //         query = {
    //           phoneNumber: { $in: convertPhoneNumber },
    //           status: USER_STATUS.ACTIVE,
    //         };
    //         //query.phoneNumber = convertPhoneNumber;
    //         break;
    //     }
    //     const _user = await this.userService.getUser(query);
    //     if (!_user) {
    //       return res.errorRes({ message: MessageErrors.user.invalid });
    //     }
    //     const user = req.body;
    //     const isMatch = await bcrypt.compare(password, _user.password);
    //     if (!isMatch) {
    //       return res.errorRes({ message: MessageErrors.user.invalid });
    //     }
    //     const userData = await this.authenticationService.signIn({
    //       ...user,
    //     });
    //     if (!userData) {
    //       return res.errorRes({ message: MessageErrors.user.notFound });
    //     }
    //     const {
    //       payload,
    //       userRole,
    //       fullName,
    //       avatar,
    //       email,
    //       phoneNumber: userPhoneNumber,
    //       isDriver,
    //     } = userData;
    //     if (!payload) {
    //       return res.errorRes({});
    //     }
    //     if (_user.loginTime == null) {
    //       await this.advertisementService.useAdvertisement({ userId: _user._id });
    //     }
    //     if (Platform.MOBILE === platform) {
    //       const loginTime = new Date();
    //       const filter = _user.deviceIdentifier.filter((el) => {
    //         return el.deviceId !== deviceId;
    //       });
    //       await this.userService.updateUserByFields(_user._id, {
    //         deviceIdentifier: [{ deviceId, firebaseToken }, ...filter],
    //         loginTime: loginTime,
    //       });
    //     }
    //     const token = jwt.sign(payload, RANDOM_TOKEN_SECRET, {
    //       expiresIn: "60d",
    //     });
    //     //thêm data vào userLogins
    //     const userLoginRequest: UserLoginModelInterface = {
    //       _id: null,
    //       userId: _user._id,
    //       deviceId: deviceId,
    //       token: token,
    //       loginTime: new Date(),
    //       createdBy: user.phoneNumber,
    //       updatedBy: user.phoneNumber,
    //       createDate: new Date(),
    //       updatedDate: new Date(),
    //     };
    //     this.userloginService.createUserLogin(userLoginRequest);
    //     return res.successRes({
    //       data: {
    //         username: _user.username,
    //         inAutoConfirm: _user.inAutoConfirm || false,
    //         token,
    //         userRole,
    //         fullName,
    //         avatar,
    //         phoneNumber: userPhoneNumber,
    //         email,
    //         isDriver,
    //       },
    //     });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.errorRes({});
    //   }
    // }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, http_extends_1.validationRequest)(req);
            if (!result.isEmpty()) {
                return res.errorRes({ errors: result.array() });
            }
            try {
                const { phoneNumber, username, email, fullName, userRoleId } = req.body;
                req.body.username = phoneNumber;
                if (!userRoleId) {
                    const userRoleName = USER_ROLE.USER;
                    const _userRole = yield this.userRoleService.getUserRole({
                        name: userRoleName,
                    });
                    const userRole = [_userRole[0]._id];
                    req.body.userRoleId = userRole;
                }
                const data = yield this.userService.createUser(Object.assign({}, req.body));
                // const newOtp = await this.otpService.generateOtpSendZalo(data);
                return res.successRes({
                    data: {
                        _id: data._id,
                        username: username || phoneNumber,
                        email,
                        phoneNumber,
                        createdBy: data.createdBy,
                        updatedBy: data.updatedBy,
                        avatar: data.avatar,
                        fullName,
                        // hash: newOtp,
                    },
                });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    // async verifyOTPSignUp(req: Request, res: Response) {
    //   try {
    //     const validationError = validationRequest(req);
    //     if (!validationError.isEmpty()) {
    //       return res.errorRes({ errors: validationError.array() });
    //     }
    //     const { otp, hash } = req.body;
    //     const otpRequest: OtpClientInterface = JSON.parse(Encrypt.decrypt(hash));
    //     if (otp !== otpRequest.otp) {
    //       return res.errorRes({ message: MessageErrors.field.otp.invalid });
    //     }
    //     if (isExpireTime(otpRequest.expirationTime)) {
    //       return res.errorRes({ message: MessageErrors.field.otp.expirate });
    //     }
    //     const existOtp = await this.otpService.getOtpByOtp(otp);
    //     if (existOtp == null) {
    //       return res.errorRes({ message: MessageErrors.field.otp.invalid });
    //     }
    //     if (existOtp.salt != req.body.userId) {
    //       return res.errorRes({ message: MessageErrors.field.otp.invalid });
    //     }
    //     if (existOtp.verified) {
    //       return res.errorRes({ message: MessageErrors.field.otp.expirate });
    //     }
    //     await this.otpService.updateOtpByFields(otpRequest._id, {
    //       verified: true,
    //     });
    //     const userIds = [req.body.userId];
    //     await this.userService.toggleActivateUser(userIds, 1);
    //     const user = await this.userService.getUser({
    //       _id: Types.ObjectId(req.body.userId),
    //     });
    //     if (user != null && user.affCode != null) {
    //       const affUser = await this.userService.getUserByPhoneNumber(
    //         user.affCode,
    //         USER_STATUS.ACTIVE
    //       );
    //       if (affUser != null) {
    //         // const numberUser = await this.userService.countUsers(
    //         //   new Date(),
    //         //   USER_STATUS.ACTIVE
    //         // );
    //         //if (numberUser <= 4080) {
    //         const affRequest: UseAdvertisementRequest = {
    //           affObject: {
    //             userId: req.body.userId,
    //             phoneNumber: user.phoneNumber,
    //             userAFFPhoneNumber: user.affCode,
    //             userAFF: affUser._id,
    //             //numberUser: numberUser,
    //           },
    //         };
    //         await this.advertisementService.useAdvertisement(affRequest);
    //         //}
    //       }
    //     }
    //     return res.successRes({ data: { userId: req.body.userId } });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    // async signOut(req: Request, res: Response) {
    //   try {
    //     const { platform, deviceId } = req.body;
    //     const token = req.headers.authorization.split(" ")[1];
    //     const { _id: userId } = parseJwt(token);
    //     await this.expiredTokensService.create(token, userId);
    //     if (platform === Platform.MOBILE) {
    //       const user = await this.userService.getUser({ _id: userId });
    //       if (!user) {
    //         return res.errorRes({});
    //       }
    //       await this.userService.updateUserByFields(userId, {
    //         deviceIdentifier: user.deviceIdentifier.filter(
    //           (el: any) => el.deviceId !== deviceId
    //         ),
    //       });
    //       await this.userService.deleteUserloggin(userId);
    //       return res.successRes({ data: [] });
    //     }
    //     return res.successRes({ data: [] });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    // async changePassword(req: Request, res: Response) {
    //   const { username, phoneNumber, password, newPassword, confirmNewPassword } =
    //     req.body;
    //   if (isNullOrEmpty(password)) {
    //     return res.errorRes({ message: "Vui lòng nhập mật khẩu cũ" });
    //   }
    //   if (isNullOrEmpty(username) || isNullOrEmpty(phoneNumber)) {
    //     return res.errorRes({ message: "Thiếu thông tin người dùng" });
    //   }
    //   if (isNullOrEmpty(newPassword)) {
    //     return res.errorRes({ message: "Mật khẩu không được để trống" });
    //   }
    //   if (isNullOrEmpty(confirmNewPassword)) {
    //     return res.errorRes({ message: "Vui lòng nhập lại mật khẩu" });
    //   }
    //   if (newPassword !== confirmNewPassword) {
    //     return res.errorRes({ message: "Mật khẩu nhập lại không đúng" });
    //   }
    //   if (newPassword === password) {
    //     return res.errorRes({
    //       message: "Mật khẩu mới không được trùng mật khẩu cũ",
    //     });
    //   }
    //   try {
    //     const _id = req.headers.userId;
    //     const user = await this.userService.getUser({ _id });
    //     if (!user) {
    //       return res.errorRes({ message: MessageErrors.user.notFound });
    //     }
    //     const data = await this.userService.changePassword(_id, newPassword);
    //     if (!data) {
    //       return res.internal({});
    //     }
    //     return res.successRes({ data: {} });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    // async sendOtpchangePassword(req: Request, res: Response) {
    //   try {
    //     const result = validationRequest(req);
    //     if (!result.isEmpty()) {
    //       return res.errorRes({ errors: result.array() });
    //     }
    //     const _id = req.headers.userId;
    //     const user = await this.userService.getUser({
    //       _id,
    //       status: USER_STATUS.ACTIVE,
    //     });
    //     if (!user) {
    //       return res.errorRes({ message: MessageErrors.user.notFound });
    //     }
    //     const newOtp = await this.otpService.generateOtp(user);
    //     let counter = 60;
    //     const interval = setInterval(() => {
    //       console.log(counter);
    //       counter--;
    //     }, 1000);
    //     return res.successRes({
    //       data: {
    //         hash: newOtp,
    //       },
    //     });
    //   } catch (error) {
    //     logger.error(error);
    //     res.internal({});
    //   }
    // }
    changePasswordMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, http_extends_1.validationRequest)(req);
                if (!result.isEmpty()) {
                    return res.errorRes({ errors: result.array() });
                }
                const _id = req.headers.userId;
                const user = yield this.userService.getUser({
                    _id,
                    status: userConstant_1.USER_STATUS.ACTIVE,
                });
                //console.log()
                if (!user) {
                    return res.errorRes({ message: MessageErrors_1.default.user.notFound });
                }
                const { password, newPassword } = req.body;
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    return res.errorRes({ message: MessageErrors_1.default.field.password.invalid });
                }
                const data = yield this.userService.requestChangePassword(_id, newPassword);
                if (!data) {
                    return res.internal({});
                }
                // const newOtp = await this.otpService.generateOtp(user);
                // return res.successRes({
                //   data: {
                //     hash: newOtp,
                //   },
                // });
                yield this.userService.changePasswordMobile(req.headers.userId);
                return res.successRes({ data: { userId: req.headers.userId } });
            }
            catch (error) {
                logger_1.default.error(error);
                res.internal({});
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.UserService)
], AuthenticationController.prototype, "userService", void 0);
AuthenticationController = __decorate([
    (0, inversify_1.injectable)()
], AuthenticationController);
exports.default = AuthenticationController;
