import { check } from "express-validator";
import MessageErrors from "@app-common/MessageErrors";
import { Platform } from "../requests";
import isMobilePhone from "./isMobilePhone";

export const signIn = [
  check("platform").custom((value) => {
    if (![Platform.MOBILE, Platform.WEB].includes(value)) {
      throw new Error("Thông tin môi trường không hợp lệ");
    }

    return true;
  }),
  check("phoneNumber")
    .custom((value, { req }) => {
      if (req.body.platform === Platform.WEB) {
        return true;
      }

      if (req.body.platform === Platform.MOBILE && !value) {
        throw new Error("Thông tin đăng nhập không được để trống");
      }

      if (typeof value !== "string") {
        throw new Error(MessageErrors.field.string.invalid);
      }
      if (value.length >= 100) {
        throw new Error(MessageErrors.field.string.length);
      }

      return true;
    })
    .exists({
      checkFalsy: false,
      checkNull: true,
    })
    .withMessage("Thông tin đăng nhập không được để trống")
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 100,
    })
    .withMessage(MessageErrors.field.string.length),
  check("username").custom((value, { req }) => {
    if (req.body.platform === Platform.MOBILE) {
      return true;
    }

    if (req.body.platform === Platform.WEB && !value) {
      throw new Error("Thông tin đăng nhập không được để trống");
    }

    if (typeof value !== "string") {
      throw new Error(MessageErrors.field.string.invalid);
    }
    if (value.length >= 100) {
      throw new Error(MessageErrors.field.string.length);
    }

    return true;
  }),
  check("password")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage("Thông tin đăng nhập không được để trống")
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 100,
    })
    .withMessage(MessageErrors.field.string.length),
  check("deviceId")
    .custom((value, { req }) => {
      if (req.body.platform === Platform.MOBILE && !value) {
        throw new Error(MessageErrors.auth.missDeviceId);
      }

      return true;
    })
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
  check("firebaseToken")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.auth.missFirebaseToken)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const signUpVerifyOtp = [
  check("otp")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty),
];

export const signOut = [
  check("platform").custom((value) => {
    if (![Platform.MOBILE, Platform.WEB].includes(value)) {
      throw new Error("Thông tin môi trường không hợp lệ");
    }

    return true;
  }),
  check("deviceId")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.auth.missFirebaseToken)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const signUp = [
  check("username")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 100,
    })
    .withMessage(MessageErrors.field.string.length),
  check("password")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty),
  check("email")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isEmail()
    .withMessage(MessageErrors.field.email.invalide),
  check("phoneNumber")
    .custom((value) => {
      const regx = isMobilePhone(value, "vi-VN");
      if (!regx) {
        throw new Error(MessageErrors.field.phoneNumber.invalid);
      }
      return true;
    })
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.phoneNumber.invalid),
  check("fullName")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 100,
    })
    .withMessage(MessageErrors.field.string.length),
];

export const changePasswordMobile = [
  check("password")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    // .isLength({
    //   min: 6,
    //   max: 32,
    // })
    .withMessage(MessageErrors.field.password.length),
  check("newPassword")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage(MessageErrors.field.password.length)
    .custom((value, { req }) => {
      if (value === req.body.password) {
        throw new Error(MessageErrors.field.password.beSame);
      }

      return true;
    }),
  check("confirmNewPassword")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage(MessageErrors.field.password.length)
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(MessageErrors.field.password.match);
      }

      return true;
    }),
];

export const verifyOtpSignInMobile = [
  check("otp")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty),
  check("hash")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const verifyOtpChangePasswordMobile = [
  check("otp")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty),
  check("hash")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const changeForgotPassword = [
  check("otp")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 8,
      min: 6,
    })
    .withMessage(MessageErrors.field.string.length),
  check("hash")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
  check("password")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage(MessageErrors.field.password.length),
  check("confirmPassword")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage(MessageErrors.field.password.length)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(MessageErrors.field.password.match);
      }

      return true;
    }),
];

export const verifyUserByPhone = [
  check("phoneNumber")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isMobilePhone("vi-VN")
    .withMessage(MessageErrors.field.phoneNumber.invalid),
];

export const verifyUserByEmail = [
  check("email")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isEmail()
    .withMessage(MessageErrors.field.email.invalide),
];

export const verifyResendOTP = [
  check("hash")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const verifyOtp = [
  check("otp")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 8,
      min: 6,
    })
    .withMessage(MessageErrors.field.string.length),
  check("hash")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const resendOtpForgotPassword = [
  check("hash")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const verifyOtpchangeForgotPassword = [
  check("otp")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 8,
      min: 6,
    })
    .withMessage(MessageErrors.field.string.length),
  check("hash")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const signUpWithSocial = [
  check("username")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 100,
    })
    .withMessage(MessageErrors.field.string.length),
  check("email")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isEmail()
    .withMessage(MessageErrors.field.email.invalide),
  check("phoneNumber")
    .custom((value) => {
      const regx = isMobilePhone(value, "vi-VN");
      if (!regx) {
        throw new Error(MessageErrors.field.phoneNumber.invalid);
      }
      return true;
    })
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.phoneNumber.invalid),
  check("fullName")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 100,
    })
    .withMessage(MessageErrors.field.string.length),
];

export const signInSocial = [
  check("platform").custom((value) => {
    if (![Platform.MOBILE, Platform.WEB].includes(value)) {
      throw new Error("Thông tin môi trường không hợp lệ");
    }

    return true;
  }),
  check("phoneNumber")
    .custom((value, { req }) => {
      if (req.body.platform === Platform.WEB) {
        return true;
      }

      if (req.body.platform === Platform.MOBILE && !value) {
        throw new Error("Thông tin đăng nhập không được để trống");
      }

      if (typeof value !== "string") {
        throw new Error(MessageErrors.field.string.invalid);
      }
      if (value.length >= 100) {
        throw new Error(MessageErrors.field.string.length);
      }

      return true;
    })
    .exists({
      checkFalsy: false,
      checkNull: true,
    })
    .withMessage("Thông tin đăng nhập không được để trống")
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      max: 100,
    })
    .withMessage(MessageErrors.field.string.length),
  check("username").custom((value, { req }) => {
    if (req.body.platform === Platform.MOBILE) {
      return true;
    }

    if (req.body.platform === Platform.WEB && !value) {
      throw new Error("Thông tin đăng nhập không được để trống");
    }

    if (typeof value !== "string") {
      throw new Error(MessageErrors.field.string.invalid);
    }
    if (value.length >= 100) {
      throw new Error(MessageErrors.field.string.length);
    }

    return true;
  }),
  check("deviceId")
    .custom((value, { req }) => {
      if (req.body.platform === Platform.MOBILE && !value) {
        throw new Error(MessageErrors.auth.missDeviceId);
      }

      return true;
    })
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
  check("firebaseToken")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.auth.missFirebaseToken)
    .isString()
    .withMessage(MessageErrors.field.string.invalid),
];

export const addPasswordMobile = [
  check("newPassword")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage(MessageErrors.field.password.length)
    .custom((value, { req }) => {
      if (value === req.body.password) {
        throw new Error(MessageErrors.field.password.beSame);
      }

      return true;
    }),
  check("confirmNewPassword")
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(MessageErrors.field.string.empty)
    .isString()
    .withMessage(MessageErrors.field.string.invalid)
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage(MessageErrors.field.password.length)
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(MessageErrors.field.password.match);
      }

      return true;
    }),
];
