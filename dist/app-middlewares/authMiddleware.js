"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resCode_1 = __importDefault(require("../app-type/ResCode/resCode"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const AuthVerifyTokenJWT = (req, res, next) => {
    var _a;
    try {
        const { headers } = req;
        const token = (_a = headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res
                .status(resCode_1.default.TokenInvalid)
                .json({ message: "Authentication failed, not token!" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET");
        const userData = decodedToken;
        req.userData = userData;
        next();
    }
    catch (err) {
        return res
            .status(resCode_1.default.TokenInvalid)
            .json({ message: "Authentication failed verify:", err });
    }
};
exports.default = AuthVerifyTokenJWT;
