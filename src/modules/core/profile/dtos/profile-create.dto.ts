import { z } from "zod";
import { ProfileModel } from "../profile.model";

export const ProfileCreateSchema = z.object({
  fullName: ProfileModel.fields.fullName,
  username: ProfileModel.fields.username.default(null).optional(),
  about: ProfileModel.fields.about.default(null).optional(),
  avatarUrl: ProfileModel.fields.avatarUrl.default(null).optional(),
  gender: ProfileModel.fields.gender.default(null).optional(),
  dob: ProfileModel.fields.dob.default(null).optional(),
});

export type ProfileCreateDto = z.infer<typeof ProfileCreateSchema>;
