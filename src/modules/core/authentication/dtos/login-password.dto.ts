import { z } from "zod";

export const LoginPasswordSchema = z
  .object({
    email: z.email("Invalid Email").optional(),
    username: z.string("Invalid username").optional(),
    password: z.string("Wrong password").min(8, { error: "Wrong password" }),
  })
  .refine((data) => data.email || data.username, {
    error: "No user found with given credentials",
  });

export type LoginPasswordDto = z.infer<typeof LoginPasswordSchema>;
