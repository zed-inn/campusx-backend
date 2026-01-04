import { z } from "zod";
import { ProfileModel } from "../profile.model";
import { GlobalSchema } from "@shared/dtos/global.dto";

export const ProfileGetSchema = z.object({
  userId: ProfileModel.fields.id,
});

export type ProfileGetDto = z.infer<typeof ProfileGetSchema>;

export const ProfileGetUsersSchema = z.object({
  name: ProfileModel.fields.fullName
    .or(ProfileModel.fields.username)
    .optional(),
  page: GlobalSchema.fields.page,
});

export type ProfileGetUsersDto = z.infer<typeof ProfileGetUsersSchema>;

export const ProfileCheckUsernameSchema = z.object({
  username: ProfileModel.fields.username,
});

export type ProfileCheckUsernameDto = z.infer<
  typeof ProfileCheckUsernameSchema
>;
