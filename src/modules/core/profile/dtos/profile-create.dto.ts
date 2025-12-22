import { z } from "zod";
import { ProfileInterface } from "../interfaces/profile.interface";

export const ProfileCreateSchema = z.object({
  username: ProfileInterface.fields.username.default(null),
  fullName: ProfileInterface.fields.fullName,
  about: ProfileInterface.fields.about.default(null),
  avatarUrl: ProfileInterface.fields.avatarUrl.default(null),
  gender: ProfileInterface.fields.gender.default(null),
  dob: ProfileInterface.fields.dob.default(null),
});

export type ProfileCreateDto = z.infer<typeof ProfileCreateSchema>;
