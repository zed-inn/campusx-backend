import { z } from "zod";
import { UserModel } from "@modules/core/user";
import { ProfileModel } from "../../profile.model";

export const ProfileReversedSchema = ProfileModel.dbSchema.extend({
  user: UserModel.dbSchema,
});

export type ProfileReversedDto = z.infer<typeof ProfileReversedSchema>;

export const ProfileSchema = UserModel.dbSchema.extend({
  profile: ProfileModel.dbSchema,
});

export type ProfileDto = z.infer<typeof ProfileSchema>;
