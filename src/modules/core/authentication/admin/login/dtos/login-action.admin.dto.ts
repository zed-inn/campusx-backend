import { PasswordSchema, UserModel } from "@modules/core/user";
import { z } from "zod";

export const LoginBasicSchema = z.object({
  email: UserModel.fields.email,
  password: PasswordSchema,
});

export type LoginBasicDto = z.infer<typeof LoginBasicSchema>;
