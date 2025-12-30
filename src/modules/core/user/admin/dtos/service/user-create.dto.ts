import { UserInterface } from "@modules/core/user/user.interface";
import { z } from "zod";

export const UserCreateSchema = UserInterface.dbSchema
  .pick({
    email: true,
    role: true,
  })
  .extend({
    password: UserInterface.extra.fields.password,
  });

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
