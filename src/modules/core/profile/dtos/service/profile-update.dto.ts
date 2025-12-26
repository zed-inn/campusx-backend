import { z } from "zod";
import { ProfileInterface } from "../../interfaces/profile.interface";

export const ProfileUpdateSchema = ProfileInterface.dbSchema
  .pick({
    avatarUrl: true,
    fullName: true,
    username: true,
    about: true,
    gender: true,
    dob: true,
  })
  .partial();

export type ProfileUpdateDto = z.infer<typeof ProfileUpdateSchema>;
