import { z } from "zod";
import { FollowInterface } from "../../interfaces/follow.interface";
import { ProfileSchema } from "./profile-schema.dto";

export const FollowSchema = FollowInterface.dbSchema.extend({
  followerProfile: ProfileSchema,
  followeeProfile: ProfileSchema,
});

export type FollowSchemaDto = z.infer<typeof FollowSchema>;
