import { z } from "zod";
import { UserInterface } from "../user.interface";

export const UpdatePasswordSchema = z.object({
  email: UserInterface.fields.email,
  password: UserInterface.extra.fields.password,
});

export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
