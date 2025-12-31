import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { defineModel } from "@shared/utils/define-model";
import { AppError } from "@shared/errors/app-error";
import { modelSchema } from "@shared/utils/model-schema";
import { FOLLOW_STATUS } from "./follow.constants";
import { Profile } from "../profile/profile.model";

export const FollowModel = modelSchema({
  followerId: z.uuidv4("Invalid Follower Id"),
  followeeId: z.uuidv4("Invalid Followee Id"),
  status: z
    .enum(FOLLOW_STATUS._, { error: "Invalid Status" })
    .default(FOLLOW_STATUS.ACTIVE),
});

export type FollowAttributes = z.infer<typeof FollowModel.dbSchema>;

export type FollowCreationAttributes = Omit<
  z.infer<typeof FollowModel.dbFields>,
  never
>;

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
      values: FOLLOW_STATUS._,
      allowNull: false,
      defaultValue: FOLLOW_STATUS.ACTIVE,
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

// Associations
Profile.hasMany(Follow, { foreignKey: "followerId", as: "following" });
Follow.belongsTo(Profile, { foreignKey: "followerId", as: "followerProfile" });

Profile.hasMany(Follow, { foreignKey: "followeeId", as: "followers" });
Follow.belongsTo(Profile, { foreignKey: "followeeId", as: "followeeProfile" });

// Hooks
Follow.beforeValidate((follow: any) => {
  if (follow.followeeId === follow.followerId)
    throw new AppError("You can't follow yourself", 406);
});

export type FollowInstance = InstanceType<typeof Follow>;
