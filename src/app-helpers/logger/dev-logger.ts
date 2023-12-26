import { format, createLogger, transports } from "winston";
import DailyRotateFile = require("winston-daily-rotate-file");

function buildDevLogger() {
  const logFormat = format.printf(({ message, level, timestamp, stack }) => {
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

  return createLogger({
    format: format.combine(
      format.colorize(),
      format.json(),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console(), fileRotateTransport],
  });
}

export default buildDevLogger;
