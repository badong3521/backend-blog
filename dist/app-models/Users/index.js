"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const usersSchema = new Schema({
    username: String,
    password: String,
    token: String,
    refreshToken: String,
});
const UsersModel = mongoose_1.default.model('Users', usersSchema);
exports.default = UsersModel;
