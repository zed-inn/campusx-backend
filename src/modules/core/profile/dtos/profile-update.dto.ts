import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  username: z.string().nullable().optional(),
  fullName: z.string().optional(),
  about: z.string().nullable().optional(),
  profileImageUrl: z.url().nullable().optional(),
  gender: z.enum(["Male", "Female", "Other"]).nullable().optional(),
  dob: z.number().positive().nullable().optional(),
});

export type ProfileUpdateDto = z.infer<typeof ProfileUpdateSchema>;
