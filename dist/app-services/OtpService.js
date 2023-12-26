"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.OtpService = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
const date_helper_1 = __importDefault(require("../app-helpers/date.helper"));
const otp_helper_1 = __importStar(require("../app-helpers/otp.helper"));
const otp_1 = __importDefault(require("../app-models/Otp/otp"));
const types_1 = require("../app-type/types");
const index_1 = require("../app-utils/smtp/index");
const MailTemplate_1 = require("../app-utils/smtp/MailTemplate");
const logger_1 = __importDefault(require("../app-helpers/logger"));
let OtpService = class OtpService {
    generateOtpSendZalo(user) {
        throw new Error("Method not implemented.");
    }
    generateOtp(user, title = MailTemplate_1.MailTemplateOTPChangePassword.otpTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpCode = otp_helper_1.default.generateOTP();
                const expirationTime = date_helper_1.default.addMinutesToDate(new Date(new Date().toISOString()), 1);
                const otpObject = yield otp_1.default.create({
                    otp: otpCode,
                    expirationTime,
                    salt: user._id,
                });
                const { email, fullName } = user;
                const index = user.phoneNumber.length - 4;
                const phoneNumber = user.phoneNumber.substring(index);
                yield index_1.SendEmail.nodeMailerSendMail([email], title, MailTemplate_1.MailTemplateOTP.otpTemplate({
                    fullName,
                    otpCode,
                    phoneNumber: `xxxx${phoneNumber}`,
                }));
                const objResponstToClient = {
                    _id: otpObject._id,
                    otp: otpObject.otp,
                    verified: otpObject.verified,
                    expirationTime: otpObject.expirationTime,
                    salt: otpObject.salt,
                };
                const result = otp_helper_1.Encrypt.encrypt(JSON.stringify(objResponstToClient));
                return result;
            }
            catch (err) {
                logger_1.default.error(err);
                throw err;
            }
        });
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
    updateOtpByFields(_id, _otp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield otp_1.default.updateOne({ _id }, { $set: Object.assign({}, _otp) });
        });
    }
    getOtpById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return otp_1.default.findById(_id);
        });
    }
    getOtpByOtp(otpCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return otp_1.default.findOne({ otp: otpCode });
        });
    }
    deleteOtp(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield otp_1.default.deleteMany({
                _id: {
                    $in: id.map((item) => {
                        return new mongoose_1.Types.ObjectId(item);
                    }),
                },
            });
            if (result.deletedCount >= 0) {
                return result.deletedCount;
            }
            return result;
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.UserService),
    __metadata("design:type", Object)
], OtpService.prototype, "userService", void 0);
OtpService = __decorate([
    (0, inversify_1.injectable)()
], OtpService);
exports.OtpService = OtpService;
