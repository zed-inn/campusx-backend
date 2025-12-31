import { UserModel } from "@modules/core/user";
import { ProfileModel } from "@modules/core/user-profile";
import { z } from "zod";

export const LoginBasicSchema = z
  .object({
    email: UserModel.fields.email.optional(),
    username: ProfileModel.fields.username.optional(),
    password: UserModel.extra.fields.password,
  })
  .refine((data) => data.email || data.username, {
    error: "Atleast email or username is required.",
  });

export type LoginBasicDto = z.infer<typeof LoginBasicSchema>;
