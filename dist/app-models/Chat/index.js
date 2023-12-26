"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAT_COLLECTION_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.CHAT_COLLECTION_NAME = "chats";
const schemaChat = new mongoose_1.Schema({
    message: String,
    sender: String,
    roomId: String,
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)(exports.CHAT_COLLECTION_NAME, schemaChat);
