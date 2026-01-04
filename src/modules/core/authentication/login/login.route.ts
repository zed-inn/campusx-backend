import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { LoginBasicSchema, LoginGoogleSchema } from "./dtos/login.dto";
import { LoginController } from "./login.controller";

const router = Router();

router.post(
  "/basic",
  ValidateReq.body(LoginBasicSchema),
  LoginController.loginWithPassword
);

router.post(
  "/google",
  ValidateReq.body(LoginGoogleSchema),
  LoginController.loginWithGoogle
);

export const LoginRouter = router;
