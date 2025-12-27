import { defineModel } from "@shared/utils/define-model";
import {
  FollowAttributes,
  FollowCreationAttributes,
} from "../interfaces/follow.interface";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Profile } from "./profile.model";
import { FOLLOW_CONFIG } from "../profile.config";

export const Follow = defineModel<FollowAttributes, FollowCreationAttributes>(
  db,
  "Follow",
  {
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    followeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    status: {
      type: DataTypes.STRING,
      values: Object.values(FOLLOW_CONFIG.STATUS),
      allowNull: false,
      defaultValue: FOLLOW_CONFIG.STATUS.ACTIVE,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["followerId", "followeeId"],
        name: "follower_following_unique",
      },
    ],
  }
);

export type FollowInstance = InstanceType<typeof Follow>;

// Associations
Profile.hasMany(Follow, { foreignKey: "followerId", as: "following" });
Follow.belongsTo(Profile, { foreignKey: "followerId", as: "followerProfile" });

Profile.hasMany(Follow, { foreignKey: "followeeId", as: "followers" });
Follow.belongsTo(Profile, { foreignKey: "followeeId", as: "followeeProfile" });
