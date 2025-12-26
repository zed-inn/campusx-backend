import { z } from "zod";
import { ProfileInterface } from "../../interfaces/profile.interface";

export const ProfileCreateSchema = ProfileInterface.dbSchema.pick({
  avatarUrl: true,
  fullName: true,
  username: true,
  about: true,
  gender: true,
  dob: true,
});

export type ProfileCreateDto = z.infer<typeof ProfileCreateSchema>;
