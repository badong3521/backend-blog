"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPasswordMobile = exports.signInSocial = exports.signUpWithSocial = exports.verifyOtpchangeForgotPassword = exports.resendOtpForgotPassword = exports.verifyOtp = exports.verifyResendOTP = exports.verifyUserByEmail = exports.verifyUserByPhone = exports.changeForgotPassword = exports.verifyOtpChangePasswordMobile = exports.verifyOtpSignInMobile = exports.changePasswordMobile = exports.signUp = exports.signOut = exports.signUpVerifyOtp = exports.signIn = void 0;
const express_validator_1 = require("express-validator");
const MessageErrors_1 = __importDefault(require("../../app-common/MessageErrors"));
const requests_1 = require("../requests");
const isMobilePhone_1 = __importDefault(require("./isMobilePhone"));
exports.signIn = [
    (0, express_validator_1.check)("platform").custom((value) => {
        if (![requests_1.Platform.MOBILE, requests_1.Platform.WEB].includes(value)) {
            throw new Error("Thông tin môi trường không hợp lệ");
        }
        return true;
    }),
    (0, express_validator_1.check)("phoneNumber")
        .custom((value, { req }) => {
        if (req.body.platform === requests_1.Platform.WEB) {
            return true;
        }
        if (req.body.platform === requests_1.Platform.MOBILE && !value) {
            throw new Error("Thông tin đăng nhập không được để trống");
        }
        if (typeof value !== "string") {
            throw new Error(MessageErrors_1.default.field.string.invalid);
        }
        if (value.length >= 100) {
            throw new Error(MessageErrors_1.default.field.string.length);
        }
        return true;
    })
        .exists({
        checkFalsy: false,
        checkNull: true,
    })
        .withMessage("Thông tin đăng nhập không được để trống")
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 100,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
    (0, express_validator_1.check)("username").custom((value, { req }) => {
        if (req.body.platform === requests_1.Platform.MOBILE) {
            return true;
        }
        if (req.body.platform === requests_1.Platform.WEB && !value) {
            throw new Error("Thông tin đăng nhập không được để trống");
        }
        if (typeof value !== "string") {
            throw new Error(MessageErrors_1.default.field.string.invalid);
        }
        if (value.length >= 100) {
            throw new Error(MessageErrors_1.default.field.string.length);
        }
        return true;
    }),
    (0, express_validator_1.check)("password")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage("Thông tin đăng nhập không được để trống")
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 100,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
    (0, express_validator_1.check)("deviceId")
        .custom((value, { req }) => {
        if (req.body.platform === requests_1.Platform.MOBILE && !value) {
            throw new Error(MessageErrors_1.default.auth.missDeviceId);
        }
        return true;
    })
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
    (0, express_validator_1.check)("firebaseToken")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.auth.missFirebaseToken)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.signUpVerifyOtp = [
    (0, express_validator_1.check)("otp")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty),
];
exports.signOut = [
    (0, express_validator_1.check)("platform").custom((value) => {
        if (![requests_1.Platform.MOBILE, requests_1.Platform.WEB].includes(value)) {
            throw new Error("Thông tin môi trường không hợp lệ");
        }
        return true;
    }),
    (0, express_validator_1.check)("deviceId")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.auth.missFirebaseToken)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.signUp = [
    (0, express_validator_1.check)("username")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 100,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
    (0, express_validator_1.check)("password")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty),
    (0, express_validator_1.check)("email")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isEmail()
        .withMessage(MessageErrors_1.default.field.email.invalide),
    (0, express_validator_1.check)("phoneNumber")
        .custom((value) => {
        const regx = (0, isMobilePhone_1.default)(value, "vi-VN");
        if (!regx) {
            throw new Error(MessageErrors_1.default.field.phoneNumber.invalid);
        }
        return true;
    })
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.phoneNumber.invalid),
    (0, express_validator_1.check)("fullName")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 100,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
];
exports.changePasswordMobile = [
    (0, express_validator_1.check)("password")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        // .isLength({
        //   min: 6,
        //   max: 32,
        // })
        .withMessage(MessageErrors_1.default.field.password.length),
    (0, express_validator_1.check)("newPassword")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        min: 6,
        max: 32,
    })
        .withMessage(MessageErrors_1.default.field.password.length)
        .custom((value, { req }) => {
        if (value === req.body.password) {
            throw new Error(MessageErrors_1.default.field.password.beSame);
        }
        return true;
    }),
    (0, express_validator_1.check)("confirmNewPassword")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        min: 6,
        max: 32,
    })
        .withMessage(MessageErrors_1.default.field.password.length)
        .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error(MessageErrors_1.default.field.password.match);
        }
        return true;
    }),
];
exports.verifyOtpSignInMobile = [
    (0, express_validator_1.check)("otp")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty),
    (0, express_validator_1.check)("hash")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.verifyOtpChangePasswordMobile = [
    (0, express_validator_1.check)("otp")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty),
    (0, express_validator_1.check)("hash")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.changeForgotPassword = [
    (0, express_validator_1.check)("otp")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 8,
        min: 6,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
    (0, express_validator_1.check)("hash")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
    (0, express_validator_1.check)("password")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        min: 6,
        max: 32,
    })
        .withMessage(MessageErrors_1.default.field.password.length),
    (0, express_validator_1.check)("confirmPassword")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        min: 6,
        max: 32,
    })
        .withMessage(MessageErrors_1.default.field.password.length)
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error(MessageErrors_1.default.field.password.match);
        }
        return true;
    }),
];
exports.verifyUserByPhone = [
    (0, express_validator_1.check)("phoneNumber")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isMobilePhone("vi-VN")
        .withMessage(MessageErrors_1.default.field.phoneNumber.invalid),
];
exports.verifyUserByEmail = [
    (0, express_validator_1.check)("email")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isEmail()
        .withMessage(MessageErrors_1.default.field.email.invalide),
];
exports.verifyResendOTP = [
    (0, express_validator_1.check)("hash")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.verifyOtp = [
    (0, express_validator_1.check)("otp")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 8,
        min: 6,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
    (0, express_validator_1.check)("hash")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.resendOtpForgotPassword = [
    (0, express_validator_1.check)("hash")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.verifyOtpchangeForgotPassword = [
    (0, express_validator_1.check)("otp")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 8,
        min: 6,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
    (0, express_validator_1.check)("hash")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.signUpWithSocial = [
    (0, express_validator_1.check)("username")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 100,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
    (0, express_validator_1.check)("email")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isEmail()
        .withMessage(MessageErrors_1.default.field.email.invalide),
    (0, express_validator_1.check)("phoneNumber")
        .custom((value) => {
        const regx = (0, isMobilePhone_1.default)(value, "vi-VN");
        if (!regx) {
            throw new Error(MessageErrors_1.default.field.phoneNumber.invalid);
        }
        return true;
    })
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.phoneNumber.invalid),
    (0, express_validator_1.check)("fullName")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 100,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
];
exports.signInSocial = [
    (0, express_validator_1.check)("platform").custom((value) => {
        if (![requests_1.Platform.MOBILE, requests_1.Platform.WEB].includes(value)) {
            throw new Error("Thông tin môi trường không hợp lệ");
        }
        return true;
    }),
    (0, express_validator_1.check)("phoneNumber")
        .custom((value, { req }) => {
        if (req.body.platform === requests_1.Platform.WEB) {
            return true;
        }
        if (req.body.platform === requests_1.Platform.MOBILE && !value) {
            throw new Error("Thông tin đăng nhập không được để trống");
        }
        if (typeof value !== "string") {
            throw new Error(MessageErrors_1.default.field.string.invalid);
        }
        if (value.length >= 100) {
            throw new Error(MessageErrors_1.default.field.string.length);
        }
        return true;
    })
        .exists({
        checkFalsy: false,
        checkNull: true,
    })
        .withMessage("Thông tin đăng nhập không được để trống")
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        max: 100,
    })
        .withMessage(MessageErrors_1.default.field.string.length),
    (0, express_validator_1.check)("username").custom((value, { req }) => {
        if (req.body.platform === requests_1.Platform.MOBILE) {
            return true;
        }
        if (req.body.platform === requests_1.Platform.WEB && !value) {
            throw new Error("Thông tin đăng nhập không được để trống");
        }
        if (typeof value !== "string") {
            throw new Error(MessageErrors_1.default.field.string.invalid);
        }
        if (value.length >= 100) {
            throw new Error(MessageErrors_1.default.field.string.length);
        }
        return true;
    }),
    (0, express_validator_1.check)("deviceId")
        .custom((value, { req }) => {
        if (req.body.platform === requests_1.Platform.MOBILE && !value) {
            throw new Error(MessageErrors_1.default.auth.missDeviceId);
        }
        return true;
    })
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
    (0, express_validator_1.check)("firebaseToken")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.auth.missFirebaseToken)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.addPasswordMobile = [
    (0, express_validator_1.check)("newPassword")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        min: 6,
        max: 32,
    })
        .withMessage(MessageErrors_1.default.field.password.length)
        .custom((value, { req }) => {
        if (value === req.body.password) {
            throw new Error(MessageErrors_1.default.field.password.beSame);
        }
        return true;
    }),
    (0, express_validator_1.check)("confirmNewPassword")
        .exists({
        checkFalsy: true,
        checkNull: true,
    })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        min: 6,
        max: 32,
    })
        .withMessage(MessageErrors_1.default.field.password.length)
        .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error(MessageErrors_1.default.field.password.match);
        }
        return true;
    }),
];
