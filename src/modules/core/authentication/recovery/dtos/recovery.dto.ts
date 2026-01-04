import { PasswordSchema } from "@modules/core/user";
import { z } from "zod";

export const RecoverPasswordSchema = z.object({
  otpToken: z.string("Invalid Otp Token"),
  password: PasswordSchema,
});

export type RecoverPasswordDto = z.infer<typeof RecoverPasswordSchema>;
