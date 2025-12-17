import { z } from "zod";
import { UserInterface } from "@modules/core/user";

export const SignupVerifySchema = z.object({
  email: UserInterface.fields.email,
  otp: z.string("Invalid Otp"),
});

export type SignupVerifyDto = z.infer<typeof SignupVerifySchema>;
