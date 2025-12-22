import { z } from "zod";
import { FollowInterface } from "../interfaces/follow.interface";
import { ProfileInterface } from "../interfaces/profile.interface";

export const FollowFullSchema = FollowInterface.dbSchema.extend({
  followerProfile: ProfileInterface.dbSchema,
  followeeProfile: ProfileInterface.dbSchema,
});

export type FollowFullDto = z.infer<typeof FollowFullSchema>;
