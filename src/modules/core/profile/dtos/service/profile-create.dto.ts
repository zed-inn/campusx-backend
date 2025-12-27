import { z } from "zod";
import { ProfileSchema } from "./profile-schema.dto";

export const ProfileCreateSchema = ProfileSchema.pick({
  avatarUrl: true,
  fullName: true,
  username: true,
  about: true,
  gender: true,
  dob: true,
});

export type ProfileCreateDto = z.infer<typeof ProfileCreateSchema>;
