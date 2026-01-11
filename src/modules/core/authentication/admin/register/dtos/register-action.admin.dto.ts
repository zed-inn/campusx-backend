import { PasswordSchema, UserModel } from "@modules/core/user";
import { z } from "zod";

export const RegisterCreateBasicSchema = z.object({
  email: UserModel.fields.email,
  password: PasswordSchema,
  adminCode: z.string(),
});

export type RegisterCreateBasicDto = z.infer<typeof RegisterCreateBasicSchema>;
