"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_COLLECTION_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.OTP_COLLECTION_NAME = "otp";
const userSchema = new mongoose_1.Schema({
    otp: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    expirationTime: {
        type: Date,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)(exports.OTP_COLLECTION_NAME, userSchema);
