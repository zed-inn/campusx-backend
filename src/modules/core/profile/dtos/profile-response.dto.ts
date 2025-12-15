import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";
import { PROFILE_CONFIG } from "../profile.config";

export const ProfileResponseSchema = BaseSchema.extend({
  id: z.uuidv4(),
  username: z.string().nullable(),
  fullName: z.string(),
  about: z.string().nullable(),
  profileImageUrl: z.url().nullable(),
  gender: z.enum(PROFILE_CONFIG.GENDER).nullable(),
  dob: z.number().nullable(),
});

export type ProfileResponseDto = z.infer<typeof ProfileResponseSchema>;
