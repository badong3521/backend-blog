"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloTemplate = exports.LCDApi = exports.OrderSort = exports.VerificationMethod = exports.Gender = exports.DiscountStatus = exports.PartnerStatus = exports.AdvertisementStatus = void 0;
var AdvertisementStatus;
(function (AdvertisementStatus) {
    AdvertisementStatus[AdvertisementStatus["Inactive"] = 0] = "Inactive";
    AdvertisementStatus[AdvertisementStatus["Active"] = 1] = "Active";
})(AdvertisementStatus = exports.AdvertisementStatus || (exports.AdvertisementStatus = {}));
var PartnerStatus;
(function (PartnerStatus) {
    PartnerStatus[PartnerStatus["Inactive"] = 0] = "Inactive";
    PartnerStatus[PartnerStatus["Active"] = 1] = "Active";
})(PartnerStatus = exports.PartnerStatus || (exports.PartnerStatus = {}));
var DiscountStatus;
(function (DiscountStatus) {
    DiscountStatus[DiscountStatus["Inactive"] = 0] = "Inactive";
    DiscountStatus[DiscountStatus["Active"] = 1] = "Active";
})(DiscountStatus = exports.DiscountStatus || (exports.DiscountStatus = {}));
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
    Gender[Gender["Other"] = 2] = "Other";
})(Gender = exports.Gender || (exports.Gender = {}));
var VerificationMethod;
(function (VerificationMethod) {
    VerificationMethod[VerificationMethod["Mail"] = 0] = "Mail";
    VerificationMethod[VerificationMethod["Sms"] = 1] = "Sms";
})(VerificationMethod = exports.VerificationMethod || (exports.VerificationMethod = {}));
var OrderSort;
(function (OrderSort) {
    OrderSort[OrderSort["ExpireSoon"] = 0] = "ExpireSoon";
    OrderSort[OrderSort["ExpireLate"] = 1] = "ExpireLate";
    OrderSort[OrderSort["Newest"] = 2] = "Newest";
    OrderSort[OrderSort["Oldest"] = 3] = "Oldest";
})(OrderSort = exports.OrderSort || (exports.OrderSort = {}));
var LCDApi;
(function (LCDApi) {
    LCDApi["Heart"] = "heart";
    LCDApi["AccessCodeCheck"] = "accessCodeCheck";
    LCDApi["GetDoorStatus"] = "getDoorStatus";
    LCDApi["UnLookDoor"] = "unLockDoor";
    LCDApi["GetEWallet"] = "getEWallet";
    LCDApi["PaymentInformation"] = "paymentInformation";
    LCDApi["PaymentStatus"] = "paymentStatus";
    LCDApi["GetPhoneQRCode"] = "getPhoneQRCode";
    LCDApi["Banner"] = "banner";
    LCDApi["NewOrder"] = "newOrder";
    LCDApi["ListOrder"] = "listOrder";
})(LCDApi = exports.LCDApi || (exports.LCDApi = {}));
var ZaloTemplate;
(function (ZaloTemplate) {
    ZaloTemplate["OrderAfterOTP"] = "248266";
    ZaloTemplate["OrderOTP"] = "228688";
    ZaloTemplate["SignUpOTP"] = "229248";
    ZaloTemplate["OrderConfirm"] = "240142";
    ZaloTemplate["Mainten"] = "249288";
})(ZaloTemplate = exports.ZaloTemplate || (exports.ZaloTemplate = {}));
