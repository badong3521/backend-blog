"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const ioc_1 = require("./ioc");
const AuthController_1 = __importDefault(require("../app-controller/Controller/AuthController"));
const middlewares_1 = require("../app-controller/middlewares");
const verify_signup_1 = require("../app-middlewares/verify.signup");
const http_authorize_1 = __importDefault(require("../app-helpers/middlewares/http.authorize"));
const Route = express_1.default.Router();
const AuthenticationControllerInstance = ioc_1.container.get(AuthController_1.default);
Route.get("/test", (req, res) => {
    // Trả về JSON làm phản hồi
    res.json({ message: "TestAPI GET", data: { key: "value" } });
});
Route.post("/sign-up", middlewares_1.AuthenticationValidation.signUp, verify_signup_1.VerifySignUp.checkDuplicateEmail, AuthenticationControllerInstance.signUp.bind(AuthenticationControllerInstance));
// Sign In
Route.post("/sign-in", middlewares_1.AuthenticationValidation.signIn, AuthenticationControllerInstance.signIn.bind(AuthenticationControllerInstance));
// Sign out
Route.post("/sign-out", http_authorize_1.default, middlewares_1.AuthenticationValidation.signOut, AuthenticationControllerInstance.signOut.bind(AuthenticationControllerInstance));
Route.post("/verify-otp-sign-up-mb", middlewares_1.AuthenticationValidation.verifyOtpSignInMobile, AuthenticationControllerInstance.verifyOTPSignUp.bind(AuthenticationControllerInstance));
Route.post("/resend-otp-sign-up", AuthenticationControllerInstance.resendOtpSignUp.bind(AuthenticationControllerInstance));
exports.default = Route;
