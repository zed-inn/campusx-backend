import { z } from "zod";

export const SignupInitSchema = z.object({
  email: z.email("Invalid email"),
});

export type SignupInitDto = z.infer<typeof SignupInitSchema>;
