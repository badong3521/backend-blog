"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
function buildDevLogger() {
    const logFormat = winston_1.format.printf(({ message, level, timestamp, stack }) => {
        const template = `${timestamp} ${level}: ${stack || message}`;
        return template;
    });
    const fileRotateTransport = new DailyRotateFile({
        filename: "logs/%DATE%.log",
        datePattern: "YYYY-MM-DD",
        maxSize: "100m",
        dirname: "logs",
        frequency: "24h",
        maxFiles: "31d",
    });
    // fileRotateTransport.on("rotate", function (oldFilename, newFilename) {
    fileRotateTransport.on("rotate", function () {
        // call function like upload to s3 or on cloud
        console.log("rotate logs file");
    });
    return (0, winston_1.createLogger)({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.json(), winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.errors({ stack: true }), logFormat),
        transports: [new winston_1.transports.Console(), fileRotateTransport],
    });
}
exports.default = buildDevLogger;
