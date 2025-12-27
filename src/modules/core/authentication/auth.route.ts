import { Router } from "express";
import { AuthController } from "./auth.controller";
import { LoginBasicSchema } from "./dtos/service/login-basic.dto";
import { SignupSchema } from "./dtos/service/signup-final.dto";
import { mount } from "@shared/utils/mount-router";
import { LoginGoogleSchema } from "./dtos/service/login-google.dto";
import { ValidateReq } from "@shared/middlewares/validate-request";

const router = Router();

router.post(
  "/login/basic",
  ValidateReq.body(LoginBasicSchema),
  AuthController.loginWithPassword
);

router.post(
  "/login/google",
  ValidateReq.body(LoginGoogleSchema),
  AuthController.loginWithGoogle
);

router.post("/otp/get", AuthController.getOtp);

router.post("/otp/verify", AuthController.verifyOtp);

router.post(
  "/signup/create-password",
  ValidateReq.body(SignupSchema),
  AuthController.createPassword
);

router.post(
  "/forgot-password/reset-password",
  ValidateReq.body(SignupSchema),
  AuthController.resetPassword
);

router.get("/logout", AuthController.logout);

export const AuthRouter = mount("/auth", router);
