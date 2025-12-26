import { UserInterface } from "@modules/core/user";
import { z } from "zod";

export const SignupSchema = z.object({
  otpToken: z.string("Invalid otpToken"),
  password: UserInterface.extra.fields.password,
});

export type SignupDto = z.infer<typeof SignupSchema>;
