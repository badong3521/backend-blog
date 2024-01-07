"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRED_TOKENS = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("./user");
exports.EXPIRED_TOKENS = "expired_tokens";
const expiredTokensSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: user_1.USER_COLLECTION_NAME,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)(exports.EXPIRED_TOKENS, expiredTokensSchema);
