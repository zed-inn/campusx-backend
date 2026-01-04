import { ProfileModel } from "@modules/core/profile";
import { PasswordSchema, UserModel } from "@modules/core/user";
import { z } from "zod";

export const LoginBasicSchema = z.object({
  email: UserModel.fields.email.optional(),
  username: ProfileModel.fields.username.optional(),
  password: PasswordSchema,
});

export type LoginBasicDto = z.infer<typeof LoginBasicSchema>;

export const LoginGoogleSchema = z.object({
  fullName: ProfileModel.fields.fullName,
  avatarUrl: ProfileModel.fields.avatarUrl.default(null),
  email: UserModel.fields.email,
});

export type LoginGoogleDto = z.infer<typeof LoginGoogleSchema>;
