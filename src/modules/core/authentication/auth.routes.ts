import { Router } from "express";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { AuthController } from "./auth.controller";
import { LoginBasicSchema } from "./dtos/service/login-basic.dto";
import { SignupSchema } from "./dtos/service/signup-final.dto";
import { mount } from "@shared/utils/mount-router";
import { LoginGoogleSchema } from "./dtos/service/login-google.dto";

const router = Router();

router.post(
  "/login/basic",
  validateRequestBody(LoginBasicSchema),
  AuthController.loginWithPassword
);

router.post(
  "/login/google",
  validateRequestBody(LoginGoogleSchema),
  AuthController.loginWithGoogle
);

router.post("/otp/get", AuthController.getOtp);

router.post("/otp/verify", AuthController.verifyOtp);

router.post(
  "/signup/create-password",
  validateRequestBody(SignupSchema),
  AuthController.createPassword
);

router.post(
  "/forgot-password/reset-password",
  validateRequestBody(SignupSchema),
  AuthController.resetPassword
);

router.get("/logout", AuthController.logout);

export const AuthRouter = mount("/auth", router);
