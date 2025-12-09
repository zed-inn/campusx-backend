import { z } from "zod";

export const SignupVerifySchema = z.object({
  email: z.email("Invalid email"),
  otp: z.string("Invalid Otp"),
});

export type SignupVerifyDto = z.infer<typeof SignupVerifySchema>;
