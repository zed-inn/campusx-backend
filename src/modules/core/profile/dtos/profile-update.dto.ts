import { z } from "zod";
import { ProfileInterface } from "../profile.interface";

export const ProfileUpdateSchema = z.object({
  username: ProfileInterface.fields.username.optional(),
  fullName: ProfileInterface.fields.fullName.optional(),
  about: ProfileInterface.fields.about.optional(),
  avatarUrl: ProfileInterface.fields.avatarUrl.optional(),
  gender: ProfileInterface.fields.gender.optional(),
  dob: ProfileInterface.fields.dob.optional(),
});

export type ProfileUpdateDto = z.infer<typeof ProfileUpdateSchema>;
