import { z } from "zod";
import { ProfileModel } from "../profile.model";

export const ProfileUpdateSchema = z.object({
  fullName: ProfileModel.fields.fullName.optional(),
  username: ProfileModel.fields.username.optional(),
  about: ProfileModel.fields.about.optional(),
  avatarUrl: ProfileModel.fields.avatarUrl.optional(),
  gender: ProfileModel.fields.gender.optional(),
  dob: ProfileModel.fields.dob.optional(),
});

export type ProfileUpdateDto = z.infer<typeof ProfileUpdateSchema>;
