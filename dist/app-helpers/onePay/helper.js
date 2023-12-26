"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMd5Signature = exports.CreateSHA256Signature = exports.urlRedirectToOnepay = void 0;
const String_helper_1 = require("../../app-helpers/String.helper");
//import crypto = require("crypto");
const CryptoJS = require("crypto-js");
const urlRedirectToOnepay = (request) => {
    let _url = "https://mtf.onepay.vn/paygate/vpcpay.op?";
    // Required Parameter
    // _url += `vpc_Version=${request.vpc_Version}&vpc_Currency=${request.vpc_Currency}&vpc_Command=${request.vpc_Command}&vpc_AccessCode=${request.vpc_AccessCode}&vpc_Merchant=${request.vpc_Merchant}`;
    // _url += `&vpc_Locale=${request.vpc_Locale}&vpc_ReturnURL=${request.vpc_ReturnURL}&vpc_MerchTxnRef=${request.vpc_MerchTxnRef}&vpc_OrderInfo=${request.vpc_OrderInfo}&vpc_Amount=${request.vpc_Amount}`;
    // _url += `&vpc_TicketNo=${request.vpc_TicketNo}`;
    // if (request.vpc_CardList != "") {
    //   _url += `&vpc_CardList=${request.vpc_CardList}`;
    // }
    // _url += `&AgainLink=${request.AgainLink}&Title=${request.Title}`;
    // if (request.vpc_Customer_Phone != "") {
    //   _url += `&vpc_Customer_Phone=${request.vpc_Customer_Phone}`;
    // }
    // if (request.vpc_Customer_Email != "") {
    //   _url += `&vpc_Customer_Email=${request.vpc_Customer_Email}`;
    // }
    // if (request.vpc_Customer_Id != "") {
    //   _url += `&vpc_Customer_Phone=${request.vpc_Customer_Id}`;
    // }
    // _url += `&vpc_SecureHash=${request.vpc_SecureHash}`;
    const requestKey = Object.keys(request);
    const keySort = requestKey.sort();
    let appendAmp = 0;
    for (const index in keySort) {
        const key = keySort[index];
        if (!(0, String_helper_1.isNullOrEmpty)(request[key])) {
            if (appendAmp == 0) {
                _url +=
                    encodeURIComponent(key) + "=" + encodeURIComponent(request[key]);
                appendAmp = 1;
            }
            else {
                _url +=
                    "&" +
                        encodeURIComponent(key) +
                        "=" +
                        encodeURIComponent(request[key]);
            }
        }
    }
    const secureHash = (0, exports.CreateSHA256Signature)(request);
    _url += `&vpc_SecureHash=${secureHash}`;
    return _url;
};
exports.urlRedirectToOnepay = urlRedirectToOnepay;
const CreateSHA256Signature = (request) => {
    const SECURE_SECRET = "6D0870CDE5F24F34F3915FB0045120D6";
    let md5HashData = "";
    const requestKey = Object.keys(request);
    const keySort = requestKey.sort();
    for (const index in keySort) {
        const key = keySort[index];
        if (!(0, String_helper_1.isNullOrEmpty)(request[key])) {
            // if (appendAmp == 0) {
            //     vpcURL += encodeURIComponent(key) + '=' + encodeURIComponent(request[key]);
            //     appendAmp = 1;
            // } else {
            //     vpcURL += '&' + encodeURIComponent(key) + "=" + encodeURIComponent(request[key]);
            // }
            //$md5HashData .= $value; sử dụng cả tên và giá trị tham số để mã hóa
            if (!(0, String_helper_1.isNullOrEmpty)(request[key]) &&
                key != "vpc_SecureHash" &&
                (key.substring(0, 4) == "vpc_" || key.substring(0, 5) == "user_")) {
                md5HashData += key + "=" + request[key] + "&";
            }
        }
    }
    const lengthString = md5HashData.length;
    if (lengthString > 1) {
        md5HashData = md5HashData.substring(0, lengthString - 1);
    }
    // //creating hmac object
    // const hmac = crypto.createHmac("sha256", SECURE_SECRET);
    // //passing the data to be hashed
    // const data = hmac.update(md5HashData);
    // //Creating the hmac in the required format
    // const gen_hmac = data.digest("hex");
    // //Printing the output on the console
    // console.log("hmac : " + gen_hmac);
    // return gen_hmac.toUpperCase();
    //const CryptoJS = require("crypto-js");
    const key = CryptoJS.enc.Hex.parse(SECURE_SECRET);
    const hashed = CryptoJS.HmacSHA256(md5HashData, key).toString();
    return hashed.toUpperCase();
};
exports.CreateSHA256Signature = CreateSHA256Signature;
const CreateMd5Signature = (request, key) => {
    const md5HashData = CryptoJS.HmacMD5(request, "V3OBX");
    return md5HashData.toString();
};
exports.CreateMd5Signature = CreateMd5Signature;
