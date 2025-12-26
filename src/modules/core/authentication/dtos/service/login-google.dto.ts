import { ProfileInterface } from "@modules/core/profile";
import { UserInterface } from "@modules/core/user";
import { z } from "zod";

export const LoginGoogleSchema = z.object({
  email: UserInterface.fields.email,
  fullName: ProfileInterface.fields.fullName,
});

export type LoginGoogleDto = z.infer<typeof LoginGoogleSchema>;
