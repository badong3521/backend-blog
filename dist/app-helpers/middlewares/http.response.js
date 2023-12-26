"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageErrors_1 = __importDefault(require("../../app-common/MessageErrors"));
const httpResponse = (req, res, next) => {
    res.successRes = function ({ data = {}, errorCode = 0, message = MessageErrors_1.default.server.success, }) {
        //discordLogger(req as any, "success");
        return res.json({
            errorCode,
            message,
            data,
            errors: [],
        });
    };
    res.errorRes = function ({ errorCode, message, data, errors, } = {}) {
        errorCode = errorCode || -1;
        message = message || MessageErrors_1.default.server.error;
        data = data || {};
        errors = errors || [];
        return res.json({
            errorCode,
            message,
            data,
            errors,
        });
    };
    res.badRequest = function ({ message = MessageErrors_1.default.server.badRequest, } = {}) {
        return res.status(400).errorRes({ errorCode: 400, message: message });
    };
    res.forbidden = function ({ message = MessageErrors_1.default.server.forbidden, } = {}) {
        return res.status(403).errorRes({ errorCode: 403, message: message });
    };
    res.unauthorize = function ({ message = MessageErrors_1.default.server.unauthorize, } = {}) {
        return res.status(401).errorRes({ errorCode: 401, message: message });
    };
    // res.internal = function ({
    //   message = MessageErrors.server.internal,
    //   error,
    // }: InternalRequestParamType = {}) {
    //   discordLogger(req as any, error);
    //   return res.status(500).errorRes({ errorCode: 500, message: message });
    // };
    next();
};
exports.default = httpResponse;
