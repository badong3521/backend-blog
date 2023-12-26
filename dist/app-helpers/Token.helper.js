"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJwt = exports.TokenHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenHelper = () => {
    return {
        sign(payload, jwtSecret) {
            return jsonwebtoken_1.default.sign(payload, jwtSecret);
        },
        verify(token, jwtSecret) {
            return jsonwebtoken_1.default.verify(token, jwtSecret);
        },
    };
};
exports.TokenHelper = TokenHelper;
function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    global.atob = require("atob");
    const jsonPayload = decodeURIComponent(atob(base64)
        .split("")
        .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    })
        .join(""));
    return JSON.parse(jsonPayload);
}
exports.parseJwt = parseJwt;
