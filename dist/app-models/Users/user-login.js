"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_LOGIN_COLLECTION_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.USER_LOGIN_COLLECTION_NAME = "userLogins";
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    },
    loginTime: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)(exports.USER_LOGIN_COLLECTION_NAME, schema);
