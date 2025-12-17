import { z } from "zod";
import { BaseSchema } from "@shared/dtos/base.dto";
import { ProfileInterface } from "../profile.interface";

export const ProfileResponseSchema = BaseSchema.extend({
  id: ProfileInterface.fields.id,
  username: ProfileInterface.fields.username,
  fullName: ProfileInterface.fields.fullName,
  about: ProfileInterface.fields.about,
  profileImageUrl: ProfileInterface.fields.profileImageUrl,
  gender: ProfileInterface.fields.gender,
  dob: ProfileInterface.fields.dob,
});

export type ProfileResponseDto = z.infer<typeof ProfileResponseSchema>;
