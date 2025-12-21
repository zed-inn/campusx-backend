import db from "@config/database";
import { Profile } from "@modules/core/profile";
import {
  LikeAttributes,
  LikeCreationAttributes,
} from "../interfaces/like.interface";
import { defineModel } from "@shared/utils/define-model";
import { DataTypes } from "sequelize";
import { Discussion } from "./discussion.model";

export const Like = defineModel<LikeAttributes, LikeCreationAttributes>(
  db,
  "DiscussionLike",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    discussionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Discussion, key: "id" },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "discussionId"],
        name: "one_user_one_discussion_like",
      },
    ],
  }
);

// Associations
Discussion.hasMany(Like, {
  foreignKey: "discussionId",
  onDelete: "CASCADE",
  as: "likes",
});
Like.belongsTo(Discussion, { foreignKey: "discussionId", as: "discussion" });

Profile.hasMany(Like, { foreignKey: "userId", onDelete: "CASCADE" });
Like.belongsTo(Profile, { foreignKey: "userId" });
