"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const _app_configs_1 = require("../../app-configs");
const logger_1 = __importDefault(require("../../app-helpers/logger"));
const AWS = __importStar(require("aws-sdk"));
const nodemailer = require("nodemailer");
class SendEmail {
    static initConfiguration() {
        const sesConfig = {
            accessKeyId: _app_configs_1.ACCESS_KEY_ID,
            secretAccessKey: _app_configs_1.SECRET_ACCESS_KEY,
            region: _app_configs_1.REGION,
            apiVersion: _app_configs_1.API_VERSION,
        };
        const sesAws = new AWS.SES(sesConfig);
        return sesAws;
    }
    static sendEmail(toAddresses, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                Destination: {
                    ToAddresses: [...toAddresses],
                },
                Message: {
                    Body: {
                        Text: {
                            Charset: "UTF-8",
                            Data: body,
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: subject,
                    },
                },
                Source: _app_configs_1.SOURCE,
            };
            const sesAws = this.initConfiguration();
            const sendPromise = sesAws.sendEmail(params).promise();
            return yield sendPromise;
        });
    }
    static nodeMailer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //gmail
                const transporter = nodemailer.createTransport({
                    // config mail server
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: _app_configs_1.EMAIL_USER,
                        pass: _app_configs_1.EMAIL_PASSWORD, //Mật khẩu tài khoản gmail vừa tạo
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false,
                    },
                });
                // const transporter = nodemailer.createTransport({
                //   host: "smtp.office365.com",
                //   port: "587",
                //   auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
                //   secureConnection: true,
                //   tls: { rejectUnauthorized: false },
                // });
                return transporter;
            }
            catch (err) {
                logger_1.default.error(err);
                throw err;
            }
        });
    }
    static nodeMailerSendMail(toAddresses, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mainOptions = {
                    // thiết lập đối tượng, nội dung gửi mail
                    from: _app_configs_1.SOURCE,
                    to: toAddresses.toString(),
                    subject: subject,
                    // text: body, //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
                    html: body,
                };
                const transporter = yield this.nodeMailer();
                yield transporter.sendMail(mainOptions);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.SendEmail = SendEmail;
