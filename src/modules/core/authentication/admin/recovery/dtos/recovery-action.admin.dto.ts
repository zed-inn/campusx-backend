import { PasswordSchema, UserModel } from "@modules/core/user";
import { z } from "zod";

export const RecoveryBasicSchema = z.object({
  adminCode: z.string(),
  email: UserModel.fields.email,
  password: PasswordSchema,
});

export type RecoveryBasicDto = z.infer<typeof RecoveryBasicSchema>;
