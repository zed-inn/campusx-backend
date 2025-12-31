import { UserModel } from "@modules/core/user";
import { z } from "zod";

export const CreatePasswordSchema = z.object({
  otpToken: z.string("Invalid Otp Token"),
  password: UserModel.extra.fields.password,
});

export type CreatePasswordDto = z.infer<typeof CreatePasswordSchema>;
