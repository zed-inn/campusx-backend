import { ProfileInterface } from "@modules/core/profile";
import { UserInterface } from "@modules/core/user";
import { z } from "zod";

export const LoginBasicSchema = z
  .object({
    email: UserInterface.fields.email.optional(),
    username: ProfileInterface.fields.username.optional(),
    password: UserInterface.extra.fields.password,
  })
  .refine((data) => data.email || data.username, {
    error: "Atleast email or username is required.",
  });

export type LoginBasicDto = z.infer<typeof LoginBasicSchema>;
