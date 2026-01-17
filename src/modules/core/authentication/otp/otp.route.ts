import { OtpGetSchema } from "./dtos/otp-get.dto";
import { OtpController } from "./otp.controller";
import { OtpVerifySchema } from "./dtos/otp-verify.dto";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { z } from "zod";

const router = new DetailedRouter("OTP");

router
  .describe(
    "Get Otp",
    "Get auto generated otp on email when doing actions `REGISTER` or `RECOVERY`",
  )
  .body(OtpGetSchema)
  .output("Otp sent.")
  .post("/get", OtpController.getOtp);

router
  .describe("Verify Otp", "Verify otp sent on email")
  .body(OtpVerifySchema)
  .output("otpToken", z.string(), "Otp verified.")
  .post("/verify", OtpController.verifyOtp);

export const OtpRouter = router;
