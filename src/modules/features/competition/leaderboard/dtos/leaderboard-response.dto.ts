import { z } from "zod";
import { LeaderboardModel } from "../leaderboard.model";
import { ShortUserSchema } from "@modules/core/profile";

export const LeaderboardSchema = LeaderboardModel.dbSchema.extend({
  user: ShortUserSchema,
});

export type LeaderboardDto = z.infer<typeof LeaderboardSchema>;
