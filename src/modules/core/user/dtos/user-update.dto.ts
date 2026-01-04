import { z } from "zod";
import { UserModel } from "../user.model";
import { PasswordSchema } from "./password.dto";

// Update password
export const UpdatePasswordSchema = z.object({
  email: UserModel.fields.email,
  password: PasswordSchema,
});

export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
