import { z } from "zod";
import { ProfileSchema } from "../service/profile-schema.dto";

export const ProfileResponseMaxSchema = ProfileSchema;

export const ProfileResponseMinSchema = ProfileResponseMaxSchema.pick({
  id: true,
  username: true,
  fullName: true,
  avatarUrl: true,
  isFollowed: true,
});

export type ProfileResponseMinDto = z.infer<typeof ProfileResponseMinSchema>;

export type ProfileResponseMaxDto = z.infer<typeof ProfileResponseMaxSchema>;
