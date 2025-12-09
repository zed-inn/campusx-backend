import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";
import { PROFILE } from "./profile.config";

const ProfileDbFields = z.object({
  id: z.uuidv4(),
  username: z.string().min(PROFILE.USERNAME_MIN_LENGTH).nullable(),
  fullName: z.string().min(PROFILE.FULLNAME_MIN_LENGTH),
  about: z.string().nullable(),
  profileImageUrl: z.url().nullable(),
  gender: z.enum(PROFILE.GENDER_OPTIONS).nullable(),
  dob: z.number().positive().min(PROFILE.DOB_MIN_VALUE).nullable(),
  referralCode: z.string().length(PROFILE.REFERRAL_CODE_LENGTH),
  followers: z.number().positive().default(0),
  followings: z.number().positive().default(0),
  forums: z.number().positive().default(0),
  reviews: z.number().positive().default(0),
});

const ProfileDbSchema = BaseSchema.extend(ProfileDbFields.shape);

export type ProfileAttributes = z.infer<typeof ProfileDbSchema>;

export type ProfileCreationAttributes = Omit<
  z.infer<typeof ProfileDbFields>,
  "followers" | "followings" | "forums" | "reviews"
>;
