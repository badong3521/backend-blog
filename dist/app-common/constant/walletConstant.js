"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletType = exports.WalletStatus = void 0;
var WalletStatus;
(function (WalletStatus) {
    WalletStatus[WalletStatus["ACTIVE"] = 1] = "ACTIVE";
    WalletStatus[WalletStatus["INACTIVE"] = 2] = "INACTIVE";
})(WalletStatus = exports.WalletStatus || (exports.WalletStatus = {}));
var WalletType;
(function (WalletType) {
    WalletType[WalletType["MOMO"] = 1] = "MOMO";
    WalletType[WalletType["VIETTELPAY"] = 2] = "VIETTELPAY";
    WalletType[WalletType["ONEPAY"] = 3] = "ONEPAY";
})(WalletType = exports.WalletType || (exports.WalletType = {}));
