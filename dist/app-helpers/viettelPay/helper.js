"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRedirectToVTP = exports.HashValue = void 0;
const algorithm = "SHA1";
const crypto = require("crypto"); //Using crypto Module
const HashValue = (secret, text) => {
    const hmac = crypto.createHmac(algorithm, secret);
    hmac.write(text);
    hmac.end();
    const hash = hmac.read().toString("base64");
    return hash;
};
exports.HashValue = HashValue;
// Hàm tạo Url (Phần 1.2 Tài liệu) để đối tác kết nối Cổng thanh toán VTP
// Các tham số không bắt buộc nếu đối tác không có thì truyền vào null
/* Mặc định Tham số
    command = PAYMENT
    locale = Vi
    version = 2.0
*/
const urlRedirectToVTP = (billcode, command, desc, locale, merchant_code, order_id, other_info, customer_bill_info, return_url, login_msisdn, cancel_url, trans_amount, version, check_sum) => {
    let _url = "https://sandbox.viettel.vn/PaymentGateway/payment?";
    // Required Parameter
    _url += `billcode=${billcode}&command=${command}&merchant_code=${merchant_code}&order_id=${order_id}&return_url=${return_url}`;
    _url += `&trans_amount=${trans_amount}&version=${version}&login_msisdn=${login_msisdn}`;
    // Not Required Parameter
    if (desc)
        _url += `&desc=${desc}`;
    if (locale)
        _url += `&locale=${locale}`;
    // Hàm escape(String) => replace các kí tự đặc biệt
    if (other_info)
        _url += `&other_info=${escape(JSON.stringify(other_info))}`; // JSON format.
    if (customer_bill_info)
        _url += `&customer_bill_info=${escape(JSON.stringify(customer_bill_info))}`; //JSON format
    if (cancel_url)
        _url += `&cancel_url=${cancel_url}`;
    // CheckSum
    _url += `&check_sum=${check_sum}`;
    return _url;
};
exports.urlRedirectToVTP = urlRedirectToVTP;
