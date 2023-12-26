/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { container } from "./ioc";

import AuthenticationUserController from "../app-controller/Controller/AuthController";
import { AuthenticationValidation } from "../app-controller/middlewares";
import { VerifySignUp } from "@app-middlewares/verify.signup";
import httpAuthorize from "@app-helpers/middlewares/http.authorize";

const Route = express.Router();

const AuthenticationControllerInstance =
  container.get<AuthenticationUserController>(AuthenticationUserController);

Route.get("/test", (req, res) => {
  // Trả về JSON làm phản hồi
  res.json({ message: "TestAPI GET", data: { key: "value" } });
});

Route.post(
  "/sign-up",
  AuthenticationValidation.signUp,
  VerifySignUp.checkDuplicateEmail,
  AuthenticationControllerInstance.signUp.bind(AuthenticationControllerInstance)
);

// Sign In
Route.post(
  "/sign-in",
  AuthenticationValidation.signIn,
  AuthenticationControllerInstance.signIn.bind(AuthenticationControllerInstance)
);

// Sign out
Route.post(
  "/sign-out",
  httpAuthorize,
  AuthenticationValidation.signOut,
  AuthenticationControllerInstance.signOut.bind(
    AuthenticationControllerInstance
  )
);

Route.post(
  "/verify-otp-sign-up-mb",
  AuthenticationValidation.verifyOtpSignInMobile,
  AuthenticationControllerInstance.verifyOTPSignUp.bind(
    AuthenticationControllerInstance
  )
);

Route.post(
  "/resend-otp-sign-up",
  AuthenticationControllerInstance.resendOtpSignUp.bind(
    AuthenticationControllerInstance
  )
);

export default Route;
