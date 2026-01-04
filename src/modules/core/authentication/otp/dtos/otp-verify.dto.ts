import { z } from "zod";
import { OTP } from "../otp.constants";

export const OtpVerifySchema = z.object({
  email: z.email("Invalid Email"),
  otp: z.string("Invalid Otp").length(OTP.LENGTH),
});

export type OtpVerifyDto = z.infer<typeof OtpVerifySchema>;
