import { z } from "zod";
import { UserModel } from "../user.model";
import { PasswordSchema } from "./password.dto";

// With password
export const CreateProtectedSchema = z.object({
  email: UserModel.fields.email,
  role: UserModel.fields.role.default("STUDENT"),
  password: PasswordSchema,
});

export type CreateProtectedDto = z.infer<typeof CreateProtectedSchema>;

// Without password
export const CreateSimpleSchema = CreateProtectedSchema.pick({
  email: true,
  role: true,
});

export type CreateSimpleDto = z.infer<typeof CreateSimpleSchema>;
