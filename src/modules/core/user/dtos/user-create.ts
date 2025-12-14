import { z } from "zod";

export const UserCreateSchema = z.object({
  email: z.email({ error: "Invalid Email" }),
  password: z.string({ error: "Invalid Password" }),
});

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
