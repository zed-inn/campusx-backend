import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { RegisterBasicSchema, RegisterGoogleSchema } from "./dtos/register.dto";
import { RegisterController } from "./register.controller";

const router = Router();

router.post(
  "/basic",
  ValidateReq.body(RegisterBasicSchema),
  RegisterController.registerBasic
);

router.post(
  "/google",
  ValidateReq.body(RegisterGoogleSchema),
  RegisterController.registerGoogle
);

export const RegisterRouter = router;
