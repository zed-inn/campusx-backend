import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { FOLLOW_CONFIG } from "../profile.config";

export const FollowInterface = modelSchema({
  followerId: z.uuidv4("Invalid Follower Id"),
  followeeId: z.uuidv4("Invalid Followee Id"),
  status: z
    .enum(Object.values(FOLLOW_CONFIG.STATUS), { error: "Invalid Status" })
    .default(FOLLOW_CONFIG.STATUS.ACTIVE),
});

export type FollowAttributes = z.infer<typeof FollowInterface.dbSchema>;

export type FollowCreationAttributes = Omit<
  z.infer<typeof FollowInterface.dbFields>,
  never
>;
