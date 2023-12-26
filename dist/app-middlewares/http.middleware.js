"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMiddleware = void 0;
const HttpMiddleware = () => {
    const bearerToken = () => {
        const headerKey = "Bearer";
        return function (req, res, next) {
            let token;
            if (req.headers && req.headers.authorization) {
                const authorization = req.headers.authorization;
                const parts = authorization.split(" ");
                if (parts.length === 2 && parts[0] === headerKey) {
                    token = parts[1];
                }
            }
            res.locals.token = token;
            next();
        };
    };
    const checkDatabase = () => {
        return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            next();
        });
    };
    const notFound = () => {
        return (req, res) => {
            return res.status(404).json({
                error_code: 404,
                message: "request not found!",
            });
        };
    };
    return {
        bearerToken,
        checkDatabase,
        notFound,
    };
};
exports.HttpMiddleware = HttpMiddleware;
