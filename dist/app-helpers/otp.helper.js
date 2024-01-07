"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConfirmCode = exports.generateCode = exports.generateOTP = exports.stringGenerator = exports.isExpireTime = exports.expirateMinute = exports.Encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
// function renderSaltString(length) {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }
// const saltString = renderSaltString(12);
const saltString = "renderSaltString";
class Encrypt {
    static encrypt(value) {
        return crypto_js_1.default.AES.encrypt(value, saltString).toString();
    }
    static decrypt(ciphertext) {
        return crypto_js_1.default.AES.decrypt(ciphertext, saltString).toString(crypto_js_1.default.enc.Utf8);
    }
}
exports.Encrypt = Encrypt;
// function generateOTP() {
//   // Declare a digits variable
//   // which stores all digits
//   const digits = "0123456789";
//   let OTP = "";
//   for (let i = 0; i < 6; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }
//   return OTP;
// }
function expirateMinute(start, pause) {
    const startDate = new Date(start);
    const endDate = new Date(new Date().toISOString());
    const duration = (endDate.getTime() - startDate.getTime()) / 60000; //moment.duration(endDate.diff(startDate)).asMinutes();
    return duration > pause;
}
exports.expirateMinute = expirateMinute;
function isExpireTime(expireTime) {
    const startDate = new Date(expireTime);
    const endDate = new Date(new Date().toISOString());
    //const duration = (endDate.getTime() - startDate.getTime()) / 60000; //moment.duration(endDate.diff(startDate)).asMinutes();
    return endDate > startDate;
}
exports.isExpireTime = isExpireTime;
function stringGenerator(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.stringGenerator = stringGenerator;
function generateOTP(length = 0) {
    const newLength = length == 0 ? 6 : length;
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < newLength; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
exports.generateOTP = generateOTP;
function generateCode(length = 0) {
    const newLength = length == 0 ? 10 : length;
    const digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const digitsLength = digits.length;
    let CODE = "";
    for (let i = 0; i < newLength; i++) {
        CODE += digits[Math.floor(Math.random() * digitsLength)];
    }
    return CODE;
}
exports.generateCode = generateCode;
function generateConfirmCode(length = 0) {
    const newLength = length == 0 ? 4 : length;
    const digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitsLength = digits.length;
    let CODE = "";
    for (let i = 0; i < newLength; i++) {
        CODE += digits[Math.floor(Math.random() * digitsLength)];
    }
    return CODE;
}
exports.generateConfirmCode = generateConfirmCode;
exports.default = { generateOTP, generateCode };
