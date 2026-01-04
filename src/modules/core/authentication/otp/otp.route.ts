import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { OtpGetSchema } from "./dtos/otp-get.dto";
import { OtpController } from "./otp.controller";
import { OtpVerifySchema } from "./dtos/otp-verify.dto";

const router = Router();

router.post("/get", ValidateReq.body(OtpGetSchema), OtpController.getOtp);

router.post(
  "/verify",
  ValidateReq.body(OtpVerifySchema),
  OtpController.verifyOtp
);

export const OtpRouter = router;
