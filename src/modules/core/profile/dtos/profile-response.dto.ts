import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";
import { PROFILE } from "../profile.config";

export const ProfileResponseSchema = BaseSchema.extend({
  id: z.uuidv4(),
  username: z.string().min(PROFILE.USERNAME_MIN_LENGTH).nullable(),
  fullName: z.string().min(PROFILE.FULLNAME_MIN_LENGTH),
  about: z.string().nullable(),
  profileImageUrl: z.url().nullable(),
  gender: z.enum(PROFILE.GENDER_OPTIONS).nullable(),
  dob: z.number().nullable(),
  referralCode: z.string().length(PROFILE.REFERRAL_CODE_LENGTH),
  followers: z.number().positive().default(0),
  followings: z.number().positive().default(0),
  forums: z.number().positive().default(0),
  reviews: z.number().positive().default(0),
});

export type ProfileResponseDto = z.infer<typeof ProfileResponseSchema>;
