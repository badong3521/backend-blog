"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingTime = exports.calculateBlock = exports.OrderHelper = void 0;
// import _order from "@app-repositories/models/order";
class OrderHelper {
    static blockToHours(block) {
        if (!block || Number.isNaN(block)) {
            return OrderHelper.BLOCK;
        }
        return block * OrderHelper.BLOCK;
    }
}
exports.OrderHelper = OrderHelper;
OrderHelper.BLOCK = 1;
OrderHelper.SHIPPER_OPEN_BOX_IN_TIME = 5;
OrderHelper.CUSTOMER_COMFIRM_IN_TIME = 5;
OrderHelper.MAX_SHIPPER_BOOK = 5;
OrderHelper.MAX_BLOCK = 12;
OrderHelper.TIME_TO_REVOKE = 72;
OrderHelper.TIME_SAVE_BOXSLOT = 2;
const calculateBlock = (startTime, endTime) => {
    const duration = (endTime - startTime) / (3600 * 1000);
    const block = duration % OrderHelper.BLOCK === 0
        ? duration / OrderHelper.BLOCK
        : Math.floor(duration / OrderHelper.BLOCK) + 1;
    return block;
};
exports.calculateBlock = calculateBlock;
// export const uniqueCode = async () => {
//   const code = stringGenerator(8);
//   const check = await _order.find({ code });
//   if (check.length === 0) return code;
//   return uniqueCode();
// };
// export const uniqueOtp = async () => {
//   const code = generateOTP(8);
//   const isExit = await _order.find({ openCode: code });
//   if (isExit.length === 0) {
//     return code;
//   }
//   return uniqueOtp();
// };
// export const uniqueConfirmCode = async () => {
//   const code = generateConfirmCode(4);
//   const isExit = await _order.find({ confirmCode: code });
//   if (isExit.length === 0) {
//     return code;
//   }
//   return uniqueConfirmCode();
// };
const getRemainingTime = (startingTime, blocks, minute = 0) => {
    const now = new Date().getTime();
    let remainingTime = null;
    let endTime = null;
    if (startingTime) {
        endTime = new Date(startingTime);
        //endTime.setHours(endTime.getHours() + hour);
        if (blocks > 0) {
            endTime.setHours(endTime.getHours() + blocks * OrderHelper.BLOCK);
        }
        if (minute > 0) {
            endTime.setMinutes(endTime.getMinutes() + minute);
        }
        const expireTime = endTime.getTime();
        remainingTime = (expireTime - now) / (3600 * 1000);
    }
    else {
        remainingTime = 0;
    }
    return remainingTime;
};
exports.getRemainingTime = getRemainingTime;
