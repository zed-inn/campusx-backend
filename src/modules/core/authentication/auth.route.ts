import { Router } from "express";
import { mount } from "@shared/utils/mount-router";
import { ValidateReq } from "@shared/middlewares/validate-request";
import { LoginBasicSchema } from "./login/dtos/login-basic.dto";
import { LoginController } from "./login/login.controller";
import { LoginGoogleSchema } from "./login/dtos/login-google.dto";
import { OtpController } from "./otp/otp.controller";
import { CreatePasswordSchema } from "./signup/dtos/create-password.dto";
import { ForgotPasswordController } from "./forgot-password/forgot-password.controller";
import { SignupController } from "./signup/signup.controller";
import { LogoutController } from "./logout/logout.controller";

const router = Router();

router.post(
  "/login/basic",
  ValidateReq.body(LoginBasicSchema),
  LoginController.loginWithPassword
);

router.post(
  "/login/google",
  ValidateReq.body(LoginGoogleSchema),
  LoginController.loginWithGoogle
);

router.post("/otp/get", OtpController.getOtp);

router.post("/otp/verify", OtpController.verifyOtp);

router.post(
  "/signup/create-password",
  ValidateReq.body(CreatePasswordSchema),
  SignupController.createPassword
);

router.post(
  "/forgot-password/reset-password",
  ValidateReq.body(CreatePasswordSchema),
  ForgotPasswordController.resetPassword
);

router.get("/logout", LogoutController.logout);

export const AuthRouter = mount("/auth", router);
