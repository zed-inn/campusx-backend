import { z } from "zod";
import { ProfileSchema } from "./profile-schema.dto";

export const ProfileUpdateSchema = ProfileSchema.pick({
  avatarUrl: true,
  fullName: true,
  username: true,
  about: true,
  gender: true,
  dob: true,
}).partial();

export type ProfileUpdateDto = z.infer<typeof ProfileUpdateSchema>;
