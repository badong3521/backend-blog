"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerPosition = exports.BANNER_STATUS = exports.ScreenType = void 0;
var ScreenType;
(function (ScreenType) {
    ScreenType[ScreenType["APP"] = 1] = "APP";
    ScreenType[ScreenType["LCD"] = 2] = "LCD";
})(ScreenType = exports.ScreenType || (exports.ScreenType = {}));
var BANNER_STATUS;
(function (BANNER_STATUS) {
    BANNER_STATUS[BANNER_STATUS["ONGOING"] = 0] = "ONGOING";
    BANNER_STATUS[BANNER_STATUS["HIDDEN"] = -1] = "HIDDEN";
    BANNER_STATUS[BANNER_STATUS["PENDING"] = 1] = "PENDING";
    BANNER_STATUS[BANNER_STATUS["STOPING"] = 2] = "STOPING";
})(BANNER_STATUS = exports.BANNER_STATUS || (exports.BANNER_STATUS = {}));
var BannerPosition;
(function (BannerPosition) {
    BannerPosition["APP_SLIDE01"] = "APP.Slide01";
    BannerPosition["APP_SLIDE02"] = "APP.Slide02";
    BannerPosition["APP_SLIDE03"] = "APP.Slide03";
    BannerPosition["APP_MINI01"] = "APP.Mini01";
    BannerPosition["LCD_BIG01"] = "LCD.Big01";
    BannerPosition["LCD_POPUP01"] = "LCD.Popup01";
    BannerPosition["LCD_SLIDE01"] = "LCD.Slide01";
    BannerPosition["LCD_MINI01"] = "LCD.Mini01";
    BannerPosition["LCD_MINI02"] = "LCD.Mini02";
    BannerPosition["LCD_MINI03"] = "LCD.Mini03";
})(BannerPosition = exports.BannerPosition || (exports.BannerPosition = {}));
