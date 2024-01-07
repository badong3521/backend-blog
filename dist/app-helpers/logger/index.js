"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestLogger = void 0;
const dev_logger_1 = __importDefault(require("./dev-logger"));
exports.default = (0, dev_logger_1.default)();
function createRequestLogger() {
    return function logRequest(req, res, next) {
        if (req.url) {
            if (!req.url.includes("api/result")) {
                (0, dev_logger_1.default)().info(req.url);
            }
        }
        next();
    };
}
exports.createRequestLogger = createRequestLogger;
