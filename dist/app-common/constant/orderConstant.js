"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_STATUS_ICON_LINK = exports.CREATED_BY = exports.CANCEL_REASON = exports.CANCEL_BY = exports.CONFIRM_STATUS = exports.ORDER_STATUS = exports.PAYMENT_STATUS = exports.PackageType = exports.REFUND_HOUR = void 0;
exports.REFUND_HOUR = 0.25;
var PackageType;
(function (PackageType) {
    PackageType[PackageType["ELECTRONIC"] = 2] = "ELECTRONIC";
    PackageType[PackageType["STATIONERY"] = 3] = "STATIONERY";
    PackageType[PackageType["DOCUMENT"] = 4] = "DOCUMENT";
    PackageType[PackageType["FRAGILE"] = 5] = "FRAGILE";
    PackageType[PackageType["OTHER"] = 1] = "OTHER";
})(PackageType = exports.PackageType || (exports.PackageType = {}));
// TODO: update these status
var PAYMENT_STATUS;
(function (PAYMENT_STATUS) {
    PAYMENT_STATUS[PAYMENT_STATUS["PENDING"] = 1] = "PENDING";
    PAYMENT_STATUS[PAYMENT_STATUS["SENT"] = 2] = "SENT";
    PAYMENT_STATUS[PAYMENT_STATUS["COMPLETED"] = 3] = "COMPLETED";
    PAYMENT_STATUS[PAYMENT_STATUS["FALSE"] = 4] = "FALSE";
    PAYMENT_STATUS[PAYMENT_STATUS["CANCELED"] = 5] = "CANCELED";
    PAYMENT_STATUS[PAYMENT_STATUS["EXPIRED"] = 6] = "EXPIRED";
})(PAYMENT_STATUS = exports.PAYMENT_STATUS || (exports.PAYMENT_STATUS = {}));
var ORDER_STATUS;
(function (ORDER_STATUS) {
    ORDER_STATUS[ORDER_STATUS["PENDING"] = 1] = "PENDING";
    ORDER_STATUS[ORDER_STATUS["WAITING_FOR_SHIPPER"] = 2] = "WAITING_FOR_SHIPPER";
    ORDER_STATUS[ORDER_STATUS["PRODUCT_IMPORTING"] = 3] = "PRODUCT_IMPORTING";
    ORDER_STATUS[ORDER_STATUS["PRODUCT_EXPORTING"] = 4] = "PRODUCT_EXPORTING";
    ORDER_STATUS[ORDER_STATUS["EXPIRED"] = 5] = "EXPIRED";
    ORDER_STATUS[ORDER_STATUS["COMPLETED"] = 6] = "COMPLETED";
    ORDER_STATUS[ORDER_STATUS["CANCELED"] = 7] = "CANCELED";
    ORDER_STATUS[ORDER_STATUS["REVOKED"] = 8] = "REVOKED";
    ORDER_STATUS[ORDER_STATUS["LOCKED"] = 9] = "LOCKED";
    ORDER_STATUS[ORDER_STATUS["CONFIRM_FALSE"] = 10] = "CONFIRM_FALSE";
    ORDER_STATUS[ORDER_STATUS["END_BY_ADMIN"] = 11] = "END_BY_ADMIN";
    ORDER_STATUS[ORDER_STATUS["RECALLED"] = 12] = "RECALLED";
})(ORDER_STATUS = exports.ORDER_STATUS || (exports.ORDER_STATUS = {}));
var CONFIRM_STATUS;
(function (CONFIRM_STATUS) {
    CONFIRM_STATUS[CONFIRM_STATUS["APPROVE"] = 1] = "APPROVE";
    CONFIRM_STATUS[CONFIRM_STATUS["REJECT"] = 2] = "REJECT";
})(CONFIRM_STATUS = exports.CONFIRM_STATUS || (exports.CONFIRM_STATUS = {}));
var CANCEL_BY;
(function (CANCEL_BY) {
    CANCEL_BY["SYSTEM"] = "-1";
    CANCEL_BY["CUSTOMER"] = "1";
    CANCEL_BY["DRIVER"] = "2";
})(CANCEL_BY = exports.CANCEL_BY || (exports.CANCEL_BY = {}));
var CANCEL_REASON;
(function (CANCEL_REASON) {
    CANCEL_REASON["PAYMENT_FALE"] = "do thanh to\u00E1n th\u1EA5t b\u1EA1i";
    CANCEL_REASON["CUSTOMER_NOT_IMPORT"] = "do kh\u00E1ch h\u00E0ng kh\u00F4ng s\u1EED d\u1EE5ng t\u1EE7";
})(CANCEL_REASON = exports.CANCEL_REASON || (exports.CANCEL_REASON = {}));
var CREATED_BY;
(function (CREATED_BY) {
    CREATED_BY["CUSTOMER"] = "1";
    CREATED_BY["DRIVER"] = "2";
})(CREATED_BY = exports.CREATED_BY || (exports.CREATED_BY = {}));
var ORDER_STATUS_ICON_LINK;
(function (ORDER_STATUS_ICON_LINK) {
    ORDER_STATUS_ICON_LINK["ICON_DEFAULT"] = "https://obximage.s3.amazonaws.com/ic_avatar.png";
    ORDER_STATUS_ICON_LINK["L_SUCCESS"] = "https://obximage.s3.amazonaws.com/ic_order_box_l1.png";
    ORDER_STATUS_ICON_LINK["L_DISABLE"] = "https://obximage.s3.amazonaws.com/ic_order_box_l_disable.png";
    ORDER_STATUS_ICON_LINK["L_ERROR"] = "https://obximage.s3.amazonaws.com/ic_order_box_l_error.png";
    ORDER_STATUS_ICON_LINK["M_SUCCESS"] = "https://obximage.s3.amazonaws.com/ic_order_box_m.png";
    ORDER_STATUS_ICON_LINK["M_DISABLE"] = "https://obximage.s3.amazonaws.com/ic_order_box_m_disable.png";
    ORDER_STATUS_ICON_LINK["M_ERROR"] = "https://obximage.s3.amazonaws.com/ic_order_box_m_error.png";
    ORDER_STATUS_ICON_LINK["S_SUCCESS"] = "https://obximage.s3.amazonaws.com/ic_order_box_s.png";
    ORDER_STATUS_ICON_LINK["S_DISABLE"] = "https://obximage.s3.amazonaws.com/ic_order_box_s_disable.png";
    ORDER_STATUS_ICON_LINK["S_ERROR"] = "https://obximage.s3.amazonaws.com/ic_order_box_s_error.png";
})(ORDER_STATUS_ICON_LINK = exports.ORDER_STATUS_ICON_LINK || (exports.ORDER_STATUS_ICON_LINK = {}));
