import CryptoJS from "crypto-js";

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

export class Encrypt {
  static encrypt(value: string) {
    return CryptoJS.AES.encrypt(value, saltString).toString();
  }

  static decrypt(ciphertext: string) {
    return CryptoJS.AES.decrypt(ciphertext, saltString).toString(
      CryptoJS.enc.Utf8
    );
  }
}

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

export function expirateMinute(start: string | Date, pause: number) {
  const startDate = new Date(start);
  const endDate = new Date(new Date().toISOString());

  const duration = (endDate.getTime() - startDate.getTime()) / 60000; //moment.duration(endDate.diff(startDate)).asMinutes();
  return duration > pause;
}

export function isExpireTime(expireTime: string | Date) {
  const startDate = new Date(expireTime);
  const endDate = new Date(new Date().toISOString());
  //const duration = (endDate.getTime() - startDate.getTime()) / 60000; //moment.duration(endDate.diff(startDate)).asMinutes();
  return endDate > startDate;
}
export function stringGenerator(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateOTP(length = 0) {
  const newLength = length == 0 ? 6 : length;
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < newLength; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export function generateCode(length = 0) {
  const newLength = length == 0 ? 10 : length;
  const digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const digitsLength = digits.length;
  let CODE = "";
  for (let i = 0; i < newLength; i++) {
    CODE += digits[Math.floor(Math.random() * digitsLength)];
  }
  return CODE;
}

export function generateConfirmCode(length = 0) {
  const newLength = length == 0 ? 4 : length;
  const digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digitsLength = digits.length;
  let CODE = "";
  for (let i = 0; i < newLength; i++) {
    CODE += digits[Math.floor(Math.random() * digitsLength)];
  }
  return CODE;
}
export default { generateOTP, generateCode };
