import { ProfileModel } from "@modules/core/profile";
import { PasswordSchema, UserModel } from "@modules/core/user";
import { z } from "zod";

export const RegisterBasicSchema = z.object({
  otpToken: z.string("Invalid Otp Token"),
  password: PasswordSchema,
});

export type RegisterBasicDto = z.infer<typeof RegisterBasicSchema>;

export const RegisterGoogleSchema = z.object({
  fullName: ProfileModel.fields.fullName,
  avatarUrl: ProfileModel.fields.avatarUrl.default(null),
  email: UserModel.fields.email,
});

export type RegisterGoogleDto = z.infer<typeof RegisterGoogleSchema>;
