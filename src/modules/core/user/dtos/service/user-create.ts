import { z } from "zod";
import { UserInterface } from "../user.interface";

export const UserCreateSchema = z.object({
  email: UserInterface.fields.email,
  password: UserInterface.extra.fields.password,
});

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
