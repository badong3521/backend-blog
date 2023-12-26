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
const lodash_1 = __importDefault(require("lodash"));
const types_1 = require("../../app-type/types");
// import { UserService } from "../../app-services/UserService";
const http_extends_1 = require("../../app-helpers/http.extends");
const String_helper_1 = require("../../app-helpers/String.helper");
const mongoose_1 = require("mongoose");
const Constant_1 = require("../../app-common/Constant");
const MessageErrors_1 = __importDefault(require("../../app-common/MessageErrors"));
const logger_1 = __importDefault(require("../../app-helpers/logger"));
// import { MailTemplateOTPChangePassword } from "../../app-repositories/smtp/M/ailTemplate";
const userConstant_1 = require("../../app-common/constant/userConstant");
// import { RegisterDriverRequest } from "../../app-models/User/RegisterDriverRequest";
let UserController = class UserController {
    // @inject(TYPES.OtpService) private readonly otpService: IOtpService;
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const data = yield this.userService.updateUser(new mongoose_1.Types.ObjectId(req.headers.userId), user);
                return res.successRes({ data });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    // async updateUserWebAdmin(req: Request, res: Response) {
    //   try {
    //     const data = await this.userService.updateUser(
    //       Types.ObjectId(req.body._id),
    //       req.body
    //     );
    //     return res.successRes({ data });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req;
                if (lodash_1.default.isNil(query)) {
                    return res.errorRes({ message: "No user found!" });
                }
                const request = {
                    id: query._id || "",
                    page: (0, String_helper_1.formatInput)(query.page, 1),
                    pageSize: (0, String_helper_1.formatInput)(query.pageSize, 10),
                    status: query.status != null
                        ? query.status.split(",")
                        : [userConstant_1.USER_STATUS.ACTIVE, userConstant_1.USER_STATUS.INACTIVE, userConstant_1.USER_STATUS.LOCK],
                    profileStatus: query.profileStatus != null ? query.profileStatus.split(",") : null,
                    startDate: query.startDate || "",
                    endDate: query.endDate || "",
                };
                const data = yield this.userService.getUserById(request);
                return res.successRes({ data });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.headers.userId;
                const count = yield this.userService.deleteUser(id);
                return res.successRes({
                    data: [],
                    message: `Successfully deleted ${count} users`,
                });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    userInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.userInfo(new mongoose_1.Types.ObjectId(req.headers.userId));
                if ((0, String_helper_1.isNullOrEmpty)(data)) {
                    return res.errorRes({ message: "Không tìm thấy thông tin người dùng" });
                }
                return res.successRes({
                    data: {
                        code: data.code,
                        fullName: data.fullName,
                        phoneNumber: data.phoneNumber,
                        email: data.email,
                        personalId: data.personalId || "",
                        address: data.address || "",
                        avatar: data.avatar || "",
                        dob: data.dob || new Date("01/01/1000"),
                        createdAt: data.createdAt,
                        status: data.status,
                        autoOrderConfirm: data.autoOrderConfirm || false,
                        inAutoConfirm: data.inAutoConfirm || false,
                        _id: data._id,
                        gender: data.gender === Constant_1.Gender.Female
                            ? "Female"
                            : data.gender === Constant_1.Gender.Male
                                ? "Male"
                                : "",
                        partnerName: data.partnerId == null || data.partnerId.length === 0
                            ? ""
                            : data.partnerId[0]["fullName"],
                    },
                });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    // async verifyUserByPhone(req: Request, res: Response) {
    //   try {
    //     const validationError = validationRequest(req);
    //     if (!validationError.isEmpty()) {
    //       return res.errorRes({ errors: validationError.array() });
    //     }
    //     const { phoneNumber } = req.body;
    //     const data = await this.userService.verifyUserByPhone(phoneNumber);
    //     if (!data) {
    //       return res.errorRes({ message: MessageErrors.user.notFound });
    //     }
    //     const result = await this.otpService.generateOtp(data);
    //     return res.successRes({ data: { hash: result } });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    // async verifyUserByEmail(req: Request, res: Response) {
    //   try {
    //     const validationError = validationRequest(req);
    //     if (!validationError.isEmpty()) {
    //       return res.errorRes({ errors: validationError.array() });
    //     }
    //     const { email } = req.body;
    //     const data = await this.userService.verifyUserByEmail(email);
    //     if (!data) {
    //       return res.errorRes({ message: MessageErrors.user.notFound });
    //     }
    //     const result = await this.otpService.generateOtp(
    //       data,
    //       MailTemplateOTPChangePassword.otpForgotPasswordTitle
    //     );
    //     return res.successRes({ data: { hash: result } });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    // async resendOTP(req: Request, res: Response) {
    //   try {
    //     const validationError = validationRequest(req);
    //     if (!validationError.isEmpty()) {
    //       return res.errorRes({ errors: validationError.array() });
    //     }
    //     const { hash } = req.body;
    //     const otpRequest: OtpClientInterface = JSON.parse(Encrypt.decrypt(hash));
    //     if (!isExpireTime(otpRequest.expirationTime)) {
    //       return res.errorRes({ message: MessageErrors.field.otp.tooSoon });
    //     }
    //     const existOtp = await this.otpService.getOtpById(otpRequest._id);
    //     if (!existOtp) {
    //       return res.errorRes({ message: MessageErrors.field.otp.expirate });
    //     }
    //     if (!isExpireTime(existOtp.expirationTime)) {
    //       return res.errorRes({ message: MessageErrors.field.otp.tooSoon });
    //     }
    //     const data = await this.userService.userInfo(
    //       new Types.ObjectId(existOtp.salt)
    //     );
    //     if (!data) {
    //       return res.errorRes({ message: MessageErrors.user.notFound });
    //     }
    //     const result = await this.otpService.generateOtpSendZalo(data);
    //     return res.successRes({
    //       data: {
    //         hash: result,
    //       },
    //     });
    //   } catch (error) {
    //     logger.error(error);
    //     res.internal({});
    //   }
    // }
    // async changeForgotPassword(req: Request, res: Response) {
    //   try {
    //     const validationErrors = validationRequest(req);
    //     if (!validationErrors.isEmpty()) {
    //       return res.errorRes({ errors: validationErrors.array() });
    //     }
    //     const { hash, password } = req.body;
    //     const otpRequest: OtpModelInterface = JSON.parse(Encrypt.decrypt(hash));
    //     const existOtp = await this.otpService.getOtpById(otpRequest._id);
    //     if (!existOtp.verified) {
    //       return res.errorRes({ message: MessageErrors.user.invalid });
    //     }
    //     const user = await this.userService.getUser({ _id: otpRequest.salt }); // salt = userId
    //     if (!user) {
    //       return res.errorRes({ message: MessageErrors.user.notFound });
    //     }
    //     // const validationOldPassword = await this.userService.checkOldPassword(Types.ObjectId(userId), newPassword);
    //     // console.log('req.body', req.body);
    //     // if (validationOldPassword) {
    //     // 	return res.errorRes({ message: MessageErrors.action.changePassword.duplicate });
    //     // }
    //     const data = await this.userService.forgotPassword(
    //       new Types.ObjectId(user.id),
    //       password
    //     );
    //     return data
    //       ? res.successRes({ message: MessageSuccess.action.success, data: {} })
    //       : res.errorRes({ message: MessageErrors.action.failed });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    // async verifyOtp(req: Request, res: Response) {
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
    //     const existOtp = await this.otpService.getOtpById(otpRequest._id);
    //     if (existOtp.verified) {
    //       return res.errorRes({ message: MessageErrors.field.otp.expirate });
    //     }
    //     await this.otpService.updateOtpByFields(otpRequest._id, {
    //       verified: true,
    //     });
    //     return res.successRes({ data: { userId: req.body.userId } });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    toggleActivateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationErrors = (0, http_extends_1.validationRequest)(req);
                if (!validationErrors.isEmpty()) {
                    return res.errorRes({ errors: validationErrors.array() });
                }
                const { _id, status } = req.body;
                const results = yield this.userService.toggleActivateUser(_id, status);
                return results === 0
                    ? res.errorRes({ message: MessageErrors_1.default.action.failed })
                    : res.successRes({
                        message: `Successfully ${status === 0 ? "deactivated" : "activated"} ${results} users`,
                        data: [],
                    });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    inactiveUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationErrors = (0, http_extends_1.validationRequest)(req);
                if (!validationErrors.isEmpty()) {
                    return res.errorRes({ errors: validationErrors.array() });
                }
                const { _id, lockReason } = req.body;
                const data = yield this.userService.inactiveUser({
                    _id,
                    lockReason,
                });
                if (!data) {
                    return res.errorRes({ message: "Error" });
                }
                return res.successRes({ data });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    unLockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationErrors = (0, http_extends_1.validationRequest)(req);
                if (!validationErrors.isEmpty()) {
                    return res.errorRes({ errors: validationErrors.array() });
                }
                const { _id } = req.body;
                const data = yield this.userService.unLockUser({
                    _id,
                });
                if (!data) {
                    return res.errorRes({ message: "Error" });
                }
                return res.successRes({ data });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.getAllUsers();
                if (!data) {
                    return res.errorRes({ message: "Error" });
                }
                return res.successRes({ data });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    generatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, http_extends_1.validationRequest)(req);
            if (!result.isEmpty()) {
                return res.errorRes({ errors: result.array() });
            }
            try {
                const data = yield this.userService.generatePassword(req.params.id);
                return res.successRes({ data });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    // async registerDriver(req: Request, res: Response) {
    //   try {
    //     const result = validationRequest(req);
    //     if (!result.isEmpty()) {
    //       return res.errorRes({ errors: result.array() });
    //     }
    //     const request: RegisterDriverRequest = {
    //       userId: req.headers.userId ? req.headers.userId : req.body.userId,
    //       idCard: req.body.idCard,
    //       images: req.body.images,
    //     };
    //     const data = await this.userService.registerDriver(request);
    //     return res.successRes({ data });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    // async getRegisterDriverInfo(req: Request, res: Response) {
    //   try {
    //     const result = validationRequest(req);
    //     if (!result.isEmpty()) {
    //       return res.errorRes({ errors: result.array() });
    //     }
    //     const data = await this.userService.getRegisterDriverInfo(
    //       req.headers.userId
    //     );
    //     return res.successRes({ data });
    //   } catch (error) {
    //     logger.error(error);
    //     return res.internal({});
    //   }
    // }
    inAutoConfirm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.inAutoConfirm(req.headers.userId, req.body.inAutoConfirm);
                if (!data) {
                    return res.errorRes({ message: "Error" });
                }
                return res.successRes({ data });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.UserService)
], UserController.prototype, "userService", void 0);
UserController = __decorate([
    (0, inversify_1.injectable)()
], UserController);
exports.default = UserController;
