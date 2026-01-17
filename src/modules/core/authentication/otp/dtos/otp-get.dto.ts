import { UserModel } from "@modules/core/user";
import { z } from "zod";
import { OTP } from "../otp.constants";

export const OtpGetSchema = z.object({
  email: UserModel.fields.email,
  action: z.enum(OTP.ACTIONS._).default(OTP.ACTIONS.REGISTER),
});

export type OtpGetDto = z.infer<typeof OtpGetSchema>;
