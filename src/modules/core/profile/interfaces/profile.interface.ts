import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { PROFILE_CONFIG } from "../profile.config";

export const ProfileInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Profile Id"),
    username: z
      .string("Invalid Username")
      .min(PROFILE_CONFIG.USERNAME.MIN, { error: "Username is too short" })
      .max(PROFILE_CONFIG.USERNAME.MAX, { error: "Username is too long" })
      .nullable(),
    fullName: z
      .string("Invalid Fullname")
      .min(PROFILE_CONFIG.FULLNAME.MIN, { error: "Fullname is too short" })
      .max(PROFILE_CONFIG.FULLNAME.MAX, { error: "Fullname is too long" }),
    about: z.string("Invalid About").nullable(),
    avatarUrl: z.url("Invalid Avatar Url").nullable(),
    gender: z
      .enum(PROFILE_CONFIG.GENDER, { error: "Invalid Gender" })
      .nullable(),
    dob: z
      .number("Invalid Dob")
      .nonnegative("Dob cannot be negative")
      .min(PROFILE_CONFIG.DOB.MIN, { error: "You haven't lived that long!!" })
      .max(PROFILE_CONFIG.DOB.MAX, { error: "You are from future!!" })
      .nullable(),
    followersCount: z
      .number("Invalid Followers")
      .nonnegative("Invalid Followers")
      .default(0),
    followingCount: z
      .number("Invalid Following")
      .nonnegative("Invalid Following")
      .default(0),
  },
  {
    isFollowed: z.boolean("Invalid Value").default(false),
  }
);

export type ProfileAttributes = z.infer<typeof ProfileInterface.dbSchema>;

export type ProfileCreationAttributes = Omit<
  z.infer<typeof ProfileInterface.dbFields>,
  "referralCode" | "followersCount" | "followingCount"
>;
