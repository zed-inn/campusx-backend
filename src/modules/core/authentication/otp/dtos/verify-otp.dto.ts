import { z } from "zod";
import { OTP_LENGTH } from "../otp.constants";

export const VerifyOtpSchema = z.object({
  email: z.email("Invalid Email"),
  otp: z.string("Invalid Otp").min(OTP_LENGTH),
});

export type VerifyOtpDto = z.infer<typeof VerifyOtpSchema>;
