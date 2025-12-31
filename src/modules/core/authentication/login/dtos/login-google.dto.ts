import { UserModel } from "@modules/core/user";
import { ProfileModel } from "@modules/core/user-profile";
import { z } from "zod";

export const LoginGoogleSchema = z.object({
  email: UserModel.fields.email,
  fullName: ProfileModel.fields.fullName,
  avatarUrl: ProfileModel.fields.avatarUrl,
});

export type LoginGoogleDto = z.infer<typeof LoginGoogleSchema>;
