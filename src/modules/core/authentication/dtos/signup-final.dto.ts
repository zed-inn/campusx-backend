import { z } from "zod";

export const SignupFinalSchema = z.object({
  otpToken: z.string("Invalid otpToken"),
  password: z
    .string("Invalid password")
    .min(8, { error: "Password should be atleast contain 8 characters" }),
});

export type SignupFinalDto = z.infer<typeof SignupFinalSchema>;
