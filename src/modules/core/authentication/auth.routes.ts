import { Router } from "express";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { AuthController } from "./auth.controller";
import { LoginBasicSchema } from "./dtos/login-basic.dto";
import { SignupInitSchema } from "./dtos/signup-init.dto";
import { SignupVerifySchema } from "./dtos/signup-verify.dto";
import { SignupFinalSchema } from "./dtos/signup-final.dto";

const router = Router();

router.post(
  "/login/basic",
  validateRequestBody(LoginBasicSchema),
  AuthController.loginWithPassword
);

router.post(
  "/signup/send-otp",
  validateRequestBody(SignupInitSchema),
  AuthController.getOtp
);

router.post(
  "/signup/verify-otp",
  validateRequestBody(SignupVerifySchema),
  AuthController.verifyOtp
);

router.post(
  "/signup/create-password",
  validateRequestBody(SignupFinalSchema),
  AuthController.createPassword
);

router.get("/logout", AuthController.logout);

export const AuthRouter = router;
