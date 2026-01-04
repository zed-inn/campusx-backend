import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { RecoverPasswordSchema } from "./dtos/recovery.dto";
import { RecoveryController } from "./recovery.controller";

const router = Router();

router.post(
  "/basic",
  ValidateReq.body(RecoverPasswordSchema),
  RecoveryController.resetPasswordBasic
);

export const RecoveryRouter = router;
