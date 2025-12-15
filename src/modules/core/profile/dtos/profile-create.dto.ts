import { z } from "zod";

export const ProfileCreateSchema = z.object({
  username: z.string().nullable().default(null),
  fullName: z.string({ error: "Name is required to create a profile" }),
  about: z.string().nullable().default(null),
  profileImageUrl: z.url().nullable().default(null),
  gender: z.enum(["Male", "Female", "Other"]).nullable().default(null),
  dob: z.number().positive().nullable().default(null),
});

export type ProfileCreateDto = z.infer<typeof ProfileCreateSchema>;
