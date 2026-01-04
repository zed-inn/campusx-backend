import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { Profile } from "@modules/core/profile";
import { STATS } from "@shared/utils/db-types";

export const FollowStatModel = modelSchema({
  id: z.uuidv4("Invalid Stat Id"),
  followers: z.number("Invalid Followers").nonnegative("Invalid Followers"),
  following: z.number("Invalid Following").nonnegative("Invalid Following"),
});

export type FollowStatAttributes = z.infer<typeof FollowStatModel.dbSchema>;
export type FollowStatCreationAttributes = Omit<
  z.infer<typeof FollowStatModel.dbFields>,
  "followers" | "following"
>;

export const FollowStat = defineModel<
  FollowStatAttributes,
  FollowStatCreationAttributes
>(db, "FollowStat", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    references: { model: Profile, key: "id" },
  },
  followers: { ...STATS },
  following: { ...STATS },
});

// Associations
Profile.hasOne(FollowStat, { foreignKey: "id", as: "followStat" });
FollowStat.belongsTo(Profile, { foreignKey: "id", as: "user" });

export type FollowStatInstance = InstanceType<typeof FollowStat>;
