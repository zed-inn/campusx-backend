import { z } from "zod";

export const LoginBasicSchema = z
  .object({
    email: z.email("Invalid Email").optional(),
    username: z.string("Invalid username").optional(),
    password: z.string("Wrong password").min(8, { error: "Wrong password" }),
  })
  .refine((data) => data.email || data.username, {
    error: "Atleast email or username is required.",
  });

export type LoginBasicDto = z.infer<typeof LoginBasicSchema>;
