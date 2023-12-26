"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_COLLECTION_NAME = exports.PROFILE_STATUS = exports.USER_STATUS = void 0;
const mongoose_1 = require("mongoose");
const Notification_1 = require("../Notification");
const user_role_1 = require("./user-role");
// import { PARTNER_COLLECTION_NAME } from "./partner";
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ACTIVE"] = "ACTIVE";
    USER_STATUS["LOCK"] = "LOCK";
    USER_STATUS["INACTIVE"] = "INACTIVE";
})(USER_STATUS = exports.USER_STATUS || (exports.USER_STATUS = {}));
var PROFILE_STATUS;
(function (PROFILE_STATUS) {
    PROFILE_STATUS["VERIFYING"] = "VERIFYING";
    PROFILE_STATUS["VERIFYED"] = "VERIFYED";
})(PROFILE_STATUS = exports.PROFILE_STATUS || (exports.PROFILE_STATUS = {}));
exports.USER_COLLECTION_NAME = "users";
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    idGoogle: {
        type: String,
        default: "",
    },
    idFacebook: {
        type: String,
        default: "",
    },
    idApple: {
        type: String,
        default: "",
    },
    newPassword: {
        type: String,
        required: false,
    },
    code: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: USER_STATUS,
        required: false,
        default: USER_STATUS.INACTIVE,
    },
    preLockStatus: {
        type: String,
    },
    profileStatus: {
        type: String,
        enum: PROFILE_STATUS,
        required: false,
        default: PROFILE_STATUS.VERIFYING,
    },
    fullName: {
        type: String,
    },
    isDriver: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userRoleId: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: user_role_1.USER_ROLE_COLLECTION_NAME,
            required: true,
        },
    ],
    address: {
        type: String,
        default: "",
    },
    dob: {
        type: Date,
        default: new Date("1997-01-01"),
    },
    gender: {
        type: Number,
        default: 0,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    lockReason: {
        type: String,
        default: "",
    },
    lockExpire: {
        type: Date,
    },
    passwordExpire: {
        type: Date,
    },
    accessExpire: {
        type: Date,
    },
    createdBy: {
        type: String,
        default: "admin",
    },
    updatedBy: {
        type: String,
        required: true,
        default: "admin",
    },
    personalId: {
        type: String,
        default: "",
    },
    inAutoConfirm: {
        type: Boolean,
        default: true, //Không bắt khách hàng xác thực tạm thời
    },
    deviceIdentifier: [
        {
            deviceId: {
                type: String,
            },
            firebaseToken: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: new Date(),
            },
            default: [],
        },
    ],
    notification: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: Notification_1.NOTIFICATION_COLLECTION_NAME,
            default: [],
        },
    ],
    note: {
        type: String,
        required: false,
        default: "",
    },
    affCode: {
        type: String,
        required: false,
    },
    loginTime: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});
// userSchema.plugin(UniqueValidator);
exports.default = (0, mongoose_1.model)(exports.USER_COLLECTION_NAME, userSchema);
