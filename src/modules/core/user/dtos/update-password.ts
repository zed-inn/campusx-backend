import { z } from "zod";

export const UpdatePasswordSchema = z.object({
  email: z.email({ error: "Invalid Email" }),
  password: z.string({ error: "Invalid Password" }),
});

export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
