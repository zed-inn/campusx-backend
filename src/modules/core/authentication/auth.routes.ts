import { validateRequest } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { LoginPasswordSchema } from "./dtos/login-password.dto";
import { AuthController } from "./auth.controller";
import { SignupInitSchema } from "./dtos/signup-init.dto";
import { SignupVerifySchema } from "./dtos/signup-verify.dto";
import { SignupFinalSchema } from "./dtos/signup-final.dto";

const router = Router();

router.post(
  "/login",
  validateRequest(LoginPasswordSchema),
  AuthController.loginWithPassword
);

router.post(
  "/signup/send-otp",
  validateRequest(SignupInitSchema),
  AuthController.getOtp
);
router.post(
  "/signup/verify-otp",
  validateRequest(SignupVerifySchema),
  AuthController.verifyOtp
);
router.post(
  "/signup/create-password",
  validateRequest(SignupFinalSchema),
  AuthController.createPassword
);

router.get("/logout", AuthController.logout);

export const AuthRouter = router;
