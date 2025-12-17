import { UserInterface } from "@modules/core/user";
import { z } from "zod";

export const SignupInitSchema = z.object({
  email: UserInterface.fields.email,
});

export type SignupInitDto = z.infer<typeof SignupInitSchema>;
