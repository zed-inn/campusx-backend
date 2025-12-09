import { z } from "zod";

export const ProfileCreateSchema = z.object({
  username: z.string().nullable(),
  fullName: z.string({ error: "Name is required to create a profile" }),
  about: z.string().nullable(),
  profileImageUrl: z.url().nullable(),
  gender: z.enum(["Male", "Female", "Other"]).nullable(),
  dob: z.number().positive().nullable(),
});

export type ProfileCreateDto = z.infer<typeof ProfileCreateSchema>;
