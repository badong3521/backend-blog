"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const inversify_1 = require("inversify");
require("reflect-metadata");
const bcrypt_1 = __importDefault(require("bcrypt"));
const types_1 = require("../../app-type/types");
const jwt = require("jsonwebtoken");
// import { Response, Request } from "express";
const logger_1 = __importDefault(require("../../app-helpers/logger"));
const resCode_1 = __importDefault(require("../../app-type/ResCode/resCode"));
const otp_helper_1 = require("../../app-helpers/otp.helper");
const MessageErrors_1 = __importDefault(require("../../app-common/MessageErrors"));
const userConstant_1 = require("../../app-common/constant/userConstant");
const mongoose_1 = require("mongoose");
const String_helper_1 = require("../../app-helpers/String.helper");
const requests_1 = require("../../app-controller/requests");
const _app_configs_1 = require("../../app-configs");
const Token_helper_1 = require("../../app-helpers/Token.helper");
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["USER"] = "user";
})(USER_ROLE || (USER_ROLE = {}));
let AuthenticationUserController = class AuthenticationUserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phoneNumber, username, email, fullName } = req.body;
                req.body.username = phoneNumber;
                const data = yield this.userService.createUser(Object.assign({}, req.body));
                const newOtp = yield this.otpService.generateOtp(data);
                return res.status(resCode_1.default.Success).json({
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
            }
            catch (error) {
                logger_1.default.error(error);
                return res.status(resCode_1.default.ServerError);
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(req.url);
                const { username, password, phoneNumber, platform, deviceId, firebaseToken, } = req.body;
                const convertPhoneNumber = (0, String_helper_1.convertCountryCodePhoneNumber)(phoneNumber);
                const query = {
                    phoneNumber: { $in: convertPhoneNumber },
                    status: userConstant_1.USER_STATUS.ACTIVE,
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
                const _user = yield this.userService.getUser(query);
                if (!_user) {
                    return res
                        .status(resCode_1.default.InvalidUser)
                        .json({ message: MessageErrors_1.default.user.invalid });
                }
                const user = req.body;
                const isMatch = yield bcrypt_1.default.compare(password, _user.password);
                if (!isMatch) {
                    return res.json({ message: MessageErrors_1.default.user.invalid });
                }
                const userData = yield this.authenticationService.signIn(Object.assign({}, user));
                if (!userData) {
                    return res
                        .status(resCode_1.default.NotFound)
                        .json({ message: MessageErrors_1.default.user.notFound });
                }
                const { payload, userRole, fullName, avatar, email, phoneNumber: userPhoneNumber, isDriver, } = userData;
                if (!payload) {
                    return res.json({});
                }
                // if (_user.loginTime == null) {
                //   await this.advertisementService.useAdvertisement({ userId: _user._id });
                // }
                if (requests_1.Platform.MOBILE === platform) {
                    const loginTime = new Date();
                    const filter = _user.deviceIdentifier.filter((el) => {
                        return el.deviceId !== deviceId;
                    });
                    yield this.userService.updateUserByFields(_user._id, {
                        deviceIdentifier: [{ deviceId, firebaseToken }, ...filter],
                        loginTime: loginTime,
                    });
                }
                const token = jwt.sign(payload, _app_configs_1.RANDOM_TOKEN_SECRET, {
                    expiresIn: "60d",
                });
                //thêm data vào userLogins
                const userLoginRequest = {
                    userId: _user._id,
                    deviceId: deviceId,
                    token: token,
                    loginTime: new Date(),
                    createdBy: user.phoneNumber,
                    updatedBy: user.phoneNumber,
                    createDate: new Date(),
                    updatedDate: new Date(),
                    _id: new mongoose_1.Types.ObjectId(),
                };
                this.userLoginService.createUserLogin(userLoginRequest);
                const hasPassword = !!_user.password;
                return res.status(resCode_1.default.Success).json({
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
                        isApple: !!(_user === null || _user === void 0 ? void 0 : _user.idApple),
                        isFacebook: !!(_user === null || _user === void 0 ? void 0 : _user.idFacebook),
                        isGoogle: !!(_user === null || _user === void 0 ? void 0 : _user.idGoogle),
                    },
                });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.status(resCode_1.default.ServerError).json({});
            }
        });
    }
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { platform, deviceId } = req.body;
                const token = req.headers.authorization.split(" ")[1];
                const { _id: userId } = (0, Token_helper_1.parseJwt)(token);
                yield this.expiredTokensService.create(token, userId);
                if (platform === requests_1.Platform.MOBILE) {
                    const user = yield this.userService.getUser({ _id: userId });
                    if (!user) {
                        return res
                            .status(resCode_1.default.NotFound)
                            .json({ message: MessageErrors_1.default.user.notFound });
                    }
                    yield this.userService.updateUserByFields(userId, {
                        deviceIdentifier: user.deviceIdentifier.filter((el) => el.deviceId !== deviceId),
                    });
                    yield this.userService.deleteUserLogin(userId);
                    return res
                        .status(resCode_1.default.Success)
                        .json({ message: MessageErrors_1.default.server.success });
                }
                return res
                    .status(resCode_1.default.Success)
                    .json({ message: MessageErrors_1.default.server.success });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.status(resCode_1.default.ServerError).json({ error: error });
            }
        });
    }
    verifyOTPSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, hash } = req.body;
                const otpRequest = JSON.parse(otp_helper_1.Encrypt.decrypt(hash));
                if (otp !== otpRequest.otp) {
                    return res.json({ message: MessageErrors_1.default.field.otp.invalid });
                }
                if ((0, otp_helper_1.isExpireTime)(otpRequest.expirationTime)) {
                    return res.json({ message: MessageErrors_1.default.field.otp.expirate });
                }
                const existOtp = yield this.otpService.getOtpByOtp(otp);
                if (existOtp == null) {
                    return res.json({ message: MessageErrors_1.default.field.otp.invalid });
                }
                if (existOtp.salt != req.body.userId) {
                    return res.json({ message: MessageErrors_1.default.field.otp.invalid });
                }
                if (existOtp.verified) {
                    return res.json({ message: MessageErrors_1.default.field.otp.expirate });
                }
                yield this.otpService.updateOtpByFields(otpRequest._id, {
                    verified: true,
                });
                const userIds = [req.body.userId];
                yield this.userService.toggleActivateUser(userIds, 1);
                return res
                    .status(resCode_1.default.Success)
                    .json({ data: { userId: req.body.userId } });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.status(resCode_1.default.ServerError).json({ error: error });
            }
        });
    }
    resendOtpSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.headers.userid;
                const user = yield this.userService.getUser({
                    _id,
                    status: userConstant_1.USER_STATUS.INACTIVE,
                });
                if (!user) {
                    return res.json({ message: MessageErrors_1.default.user.notFound });
                }
                const { hash } = req.body;
                const otpRequest = JSON.parse(otp_helper_1.Encrypt.decrypt(hash));
                if (!(0, otp_helper_1.isExpireTime)(otpRequest.expirationTime)) {
                    return res.json({ message: MessageErrors_1.default.field.otp.tooSoon });
                }
                const existOtp = yield this.otpService.getOtpById(otpRequest._id);
                if (!existOtp) {
                    return res.json({ message: MessageErrors_1.default.field.otp.expirate });
                }
                if (!(0, otp_helper_1.isExpireTime)(existOtp.expirationTime)) {
                    return res.json({ message: MessageErrors_1.default.field.otp.tooSoon });
                }
                const newOtp = yield this.otpService.generateOtp(user);
                return res.status(resCode_1.default.Success).json({
                    data: {
                        hash: newOtp,
                    },
                });
            }
            catch (error) {
                logger_1.default.error(error);
                res.status(resCode_1.default.ServerError);
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.UserService),
    __metadata("design:type", Object)
], AuthenticationUserController.prototype, "userService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.AuthenticationService),
    __metadata("design:type", Object)
], AuthenticationUserController.prototype, "authenticationService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.OtpService),
    __metadata("design:type", Object)
], AuthenticationUserController.prototype, "otpService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.UserLoginService),
    __metadata("design:type", Object)
], AuthenticationUserController.prototype, "userLoginService", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.ExpiredTokensService),
    __metadata("design:type", Object)
], AuthenticationUserController.prototype, "expiredTokensService", void 0);
AuthenticationUserController = __decorate([
    (0, inversify_1.injectable)()
], AuthenticationUserController);
exports.default = AuthenticationUserController;
