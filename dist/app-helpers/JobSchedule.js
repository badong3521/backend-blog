"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startJob = void 0;
const _app_services_1 = require("../app-services");
const DiscountService_1 = require("@app-services/DiscountService");
const JobOrderService_1 = require("@app-services/JobOrderService");
const LuckyDrawService_1 = require("@app-services/LuckyDrawService");
const cron = require("node-cron");
function startJob() {
    const jobOrderService = new JobOrderService_1.JobOrderService();
    const discountService = new DiscountService_1.DiscountService();
    const luckyDrawService = new LuckyDrawService_1.LuckyDrawService();
    const userService = new _app_services_1.UserService();
    cron.schedule("* * * * *", () => {
        jobOrderService.updateOrderExpire();
        jobOrderService.updateOrderRevoked();
        jobOrderService.updateOrderCancel();
        jobOrderService.sendNotiExport();
        jobOrderService.sendNotiImport();
        jobOrderService.sendNotiExpire();
        jobOrderService.removeSaveBoxslotOrder();
        jobOrderService.updateBoxStatus();
    });
    cron.schedule("0 0 0 * * *", () => {
        // every 24 hours
        discountService.scheduleUpdateDiscountStatus();
        jobOrderService.deleteOrderNotificationSended();
        userService.deleteUserInactive();
    });
    //job run every hour
    // cron.schedule("0 0 * * * *", () => {
    //   jobOrderService.sendNotiExport();
    // });
    //job run each 2 hour
    // cron.schedule("0 0 1,3,5,7,9,11,13,15,17,19,21,23 * * *", () => {
    //   jobOrderService.sendNotiImport();
    // });
    //job run 6 hour
    // cron.schedule("0 0 5,11,17,23 * * *", () => {
    //   jobOrderService.sendNotiExpire();
    // });
    //job run 11 hour
    cron.schedule("0 15 4 19,26,6,13 9,10 1", () => {
        luckyDrawService.sendNotiLuckyDraw("mon1");
    });
    cron.schedule("0 15 9 19,26,6,13 9,10 1", () => {
        luckyDrawService.sendNotiLuckyDraw("mon2");
    });
    cron.schedule("0 15 13 19,26,6,13 9,10 1", () => {
        luckyDrawService.sendNotiLuckyDraw("mon3");
    });
    cron.schedule("0 15 4 20,27,7,14 9,10 2", () => {
        luckyDrawService.sendNotiLuckyDraw("tu1");
    });
    cron.schedule("0 15 9 20,27,7,14 9,10 2", () => {
        luckyDrawService.sendNotiLuckyDraw("tu2");
    });
    cron.schedule("0 15 13 20,27,7,14 9,10 2", () => {
        luckyDrawService.sendNotiLuckyDraw("tu3");
    });
    cron.schedule("0 15 4 21,28,8,15 9,10 3", () => {
        luckyDrawService.sendNotiLuckyDraw("we1");
    });
    cron.schedule("0 15 9 21,28,8,15 9,10 3", () => {
        luckyDrawService.sendNotiLuckyDraw("we2");
    });
    cron.schedule("0 15 13 21,28,8,15 9,10 3", () => {
        luckyDrawService.sendNotiLuckyDraw("we3");
    });
    cron.schedule("0 15 4 22,29,9 9,10 4", () => {
        luckyDrawService.sendNotiLuckyDraw("th1");
    });
    cron.schedule("0 15 7 22,29,9 9,10 4", () => {
        luckyDrawService.sendNotiLuckyDraw("th2");
    });
    cron.schedule("0 15 13 22,29,9 9,10 4", () => {
        luckyDrawService.sendNotiLuckyDraw("th3");
    });
    cron.schedule("0 15 4 9,23,30,10 9,10 5", () => {
        luckyDrawService.sendNotiLuckyDraw("fr1");
    });
    cron.schedule("0 15 9 9,23,30,10 9,10 5", () => {
        luckyDrawService.sendNotiLuckyDraw("fr2");
    });
    cron.schedule("0 15 13 9,23,30,10 9,10 5", () => {
        luckyDrawService.sendNotiLuckyDraw("fr3");
    });
    cron.schedule("0 15 4 24,1,11 9,10 6", () => {
        luckyDrawService.sendNotiLuckyDraw("sa1");
    });
    cron.schedule("0 15 9 24,1,11 9,10 6", () => {
        luckyDrawService.sendNotiLuckyDraw("sa2");
    });
    cron.schedule("0 15 13 24,1,11 9,10 6", () => {
        luckyDrawService.sendNotiLuckyDraw("sa3");
    });
    cron.schedule("0 15 4 25,2,12 9,10 7", () => {
        luckyDrawService.sendNotiLuckyDraw("su1");
    });
    cron.schedule("0 15 9 25 9,10 7", () => {
        luckyDrawService.sendNotiLuckyDraw("su21");
    });
    cron.schedule("0 15 9 2 9,10 7", () => {
        luckyDrawService.sendNotiLuckyDraw("su22");
    });
    cron.schedule("0 15 9 12 9,10 7", () => {
        luckyDrawService.sendNotiLuckyDraw("su23");
    });
    cron.schedule("0 15 13 25,2,12 9,10 7", () => {
        luckyDrawService.sendNotiLuckyDraw("su3");
    });
    cron.schedule("0 59 16 15 10 *", () => {
        luckyDrawService.sendNotiLuckyDraw("fiaff");
    });
    cron.schedule("0 0 13 15 10 *", () => {
        luckyDrawService.sendNotiLuckyDraw("filuckydraw");
    });
}
exports.startJob = startJob;
