"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwt = void 0;
const _app_configs_1 = require("../app-configs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jsonwebtoken_1.default.verify(token, _app_configs_1.RANDOM_TOKEN_SECRET, (err) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        //   req.userId = decoded.id;
        next();
    });
};
const AuthJwt = () => {
    return {
        verifyToken,
    };
};
exports.AuthJwt = AuthJwt;
