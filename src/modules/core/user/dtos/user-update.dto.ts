import { z } from "zod";
import { UserModel } from "../user.model";

// Update password
export const UpdatePasswordSchema = z.object({
  email: UserModel.fields.email,
  password: UserModel.extra.fields.password,
});

export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
