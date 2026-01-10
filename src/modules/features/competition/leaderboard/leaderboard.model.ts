import db from "@config/database";
import { Profile } from "@modules/core/profile";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { DataTypes } from "sequelize";
import { z } from "zod";
import { Event } from "../event/event.model";

export const LeaderboardModel = modelSchema({
  userId: z.uuidv4("Invalid User Id"),
  eventId: z.uuidv4("Invalid Event Id"),
  points: z.int("Invalid Points").nonnegative(),
});

export type LeaderboardAttributes = z.infer<typeof LeaderboardModel.dbSchema>;
export type LeaderboardCreationAttributes = Omit<
  z.infer<typeof LeaderboardModel.dbFields>,
  "points"
>;

export const Leaderboard = defineModel<
  LeaderboardAttributes,
  LeaderboardCreationAttributes
>(db, "CompetitionLeaderboard", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Profile, key: "id" },
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Event, key: "id" },
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0, max: Infinity },
  },
});

export type LeaderboardInstance = InstanceType<typeof Leaderboard>;
