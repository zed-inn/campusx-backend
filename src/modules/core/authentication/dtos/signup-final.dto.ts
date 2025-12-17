import { UserInterface } from "@modules/core/user";
import { z } from "zod";

export const SignupFinalSchema = z.object({
  otpToken: z.string("Invalid otpToken"),
  password: UserInterface.extra.fields.password,
});

export type SignupFinalDto = z.infer<typeof SignupFinalSchema>;
