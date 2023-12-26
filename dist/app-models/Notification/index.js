"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_SCREEN = exports.NOTIFICATION_STATUS = exports.IS_READ = exports.NOTIFICATION_COLLECTION_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.NOTIFICATION_COLLECTION_NAME = "notifications";
var IS_READ;
(function (IS_READ) {
    IS_READ[IS_READ["READ"] = 1] = "READ";
    IS_READ[IS_READ["UNREAD"] = 2] = "UNREAD";
})(IS_READ = exports.IS_READ || (exports.IS_READ = {}));
var NOTIFICATION_STATUS;
(function (NOTIFICATION_STATUS) {
    NOTIFICATION_STATUS[NOTIFICATION_STATUS["SUCCESS"] = 1] = "SUCCESS";
    NOTIFICATION_STATUS[NOTIFICATION_STATUS["PENDING"] = 2] = "PENDING";
    NOTIFICATION_STATUS[NOTIFICATION_STATUS["FALSE"] = 3] = "FALSE";
})(NOTIFICATION_STATUS = exports.NOTIFICATION_STATUS || (exports.NOTIFICATION_STATUS = {}));
var NOTIFICATION_SCREEN;
(function (NOTIFICATION_SCREEN) {
    NOTIFICATION_SCREEN["MyOrderDetail"] = "MyOrderDetailScreen";
    NOTIFICATION_SCREEN["GiftNotification"] = "GiftNotificationScreen";
    NOTIFICATION_SCREEN["RequestOrderScreen"] = "RequestOrderScreen";
})(NOTIFICATION_SCREEN = exports.NOTIFICATION_SCREEN || (exports.NOTIFICATION_SCREEN = {}));
const schema = new mongoose_1.Schema({
    title: {
        type: String,
        required: false,
        default: "",
    },
    body: {
        type: String,
        required: false,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
    iconLink: {
        type: String,
        default: "",
    },
    isRead: {
        type: Number,
        require: true,
        default: IS_READ.UNREAD,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
        required: true,
    },
    navigate: {
        screen: {
            type: String,
        },
        params: {
            orderId: {
                type: mongoose_1.Types.ObjectId,
            },
        },
    },
    createdBy: {
        type: String,
        required: true,
        default: "admin",
    },
    updatedBy: {
        type: String,
        required: true,
        default: "admin",
    },
    topic: {
        type: String,
        required: false,
        default: null,
    },
    startTime: {
        type: Date,
        required: false,
        default: new Date(),
    },
    status: {
        type: Number,
        required: false,
        default: 2,
    },
    createdAt: {
        type: Date,
        default: new Date(new Date().toISOString()),
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)(exports.NOTIFICATION_COLLECTION_NAME, schema);
