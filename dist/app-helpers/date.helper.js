"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingTimeFromExpired = exports.GetExpiredTime = void 0;
const Order_hepler_1 = require("../app-helpers/Order.hepler");
function addMinutesToDate(date, minutes) {
    const startDate = new Date(new Date(date).toUTCString());
    return startDate.setMinutes(startDate.getMinutes() + minutes);
}
exports.default = { addMinutesToDate };
function GetExpiredTime(startingTime, blocks, minute = 0) {
    let endTime = null;
    if (startingTime) {
        endTime = new Date(startingTime);
        //endTime.setHours(endTime.getHours() + hour);
        if (blocks > 0) {
            endTime.setHours(endTime.getHours() + blocks * Order_hepler_1.OrderHelper.BLOCK);
        }
        if (minute > 0) {
            endTime.setMinutes(endTime.getMinutes() + minute);
        }
    }
    return endTime;
}
exports.GetExpiredTime = GetExpiredTime;
function getRemainingTimeFromExpired(endTime) {
    const now = new Date().getTime();
    let remainingTime = null;
    if (endTime) {
        const endTimeDate = new Date(endTime);
        const expireTime = endTimeDate.getTime();
        remainingTime = (expireTime - now) / (3600 * 1000);
    }
    else {
        remainingTime = 0;
    }
    return remainingTime;
}
exports.getRemainingTimeFromExpired = getRemainingTimeFromExpired;
