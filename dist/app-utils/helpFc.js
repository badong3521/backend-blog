"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
function generateToken(data) {
    const token = jsonwebtoken_1.default.sign(data, ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET", {
        expiresIn: "10m",
    });
    const refreshToken = jsonwebtoken_1.default.sign(data, REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET", {
        expiresIn: "30m",
    });
    return { token, refreshToken };
}
exports.generateToken = generateToken;
