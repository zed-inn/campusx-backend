import { ProfileModel } from "@modules/core/profile";
import { PasswordSchema, UserModel } from "@modules/core/user";
import { z } from "zod";
import { RegisterGoogleSchema } from "../../register/dtos/register.dto";

export const LoginBasicSchema = z.object({
  email: UserModel.fields.email.optional(),
  username: ProfileModel.fields.username.optional(),
  password: PasswordSchema,
});

export type LoginBasicDto = z.infer<typeof LoginBasicSchema>;

export const LoginGoogleSchema = RegisterGoogleSchema;

export type LoginGoogleDto = z.infer<typeof LoginGoogleSchema>;
