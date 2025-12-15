import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { PROFILE_CONFIG } from "./profile.config";

export const ProfileInterface = modelSchema({
  id: z.uuidv4(),
  username: z
    .string()
    .min(PROFILE_CONFIG.USERNAME.MIN)
    .max(PROFILE_CONFIG.USERNAME.MAX)
    .nullable(),
  fullName: z
    .string()
    .min(PROFILE_CONFIG.FULLNAME.MIN)
    .max(PROFILE_CONFIG.FULLNAME.MAX),
  about: z.string().nullable(),
  profileImageUrl: z.url().nullable(),
  gender: z.enum(PROFILE_CONFIG.GENDER).nullable(),
  dob: z
    .number()
    .positive()
    .min(PROFILE_CONFIG.DOB.MIN)
    .max(PROFILE_CONFIG.DOB.MAX)
    .nullable(),
  referralCode: z.string().length(PROFILE_CONFIG.REFERRAL_CODE_LENGTH),
});

export type ProfileAttributes = z.infer<typeof ProfileInterface.dbSchema>;

export type ProfileCreationAttributes = Omit<
  z.infer<typeof ProfileInterface.dbFields>,
  "referralCode"
>;
