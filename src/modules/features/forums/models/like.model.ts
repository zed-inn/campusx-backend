import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { Profile } from "@modules/core/profile";
import { Forum } from "./forum.model";
import {
  LikeAttributes,
  LikeCreationAttributes,
} from "../interfaces/like.interface";

export const Like = defineModel<LikeAttributes, LikeCreationAttributes>(
  db,
  "ForumLike",
  {
    forumId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Forum, key: "id" },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["forumId", "userId"],
        name: "one_user_one_forum_like",
      },
    ],
  }
);

export type LikeInstance = InstanceType<typeof Like>;

// Associations
Profile.hasMany(Like, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Like.belongsTo(Profile, { foreignKey: "userId" });

Forum.hasMany(Like, {
  foreignKey: "forumId",
  onDelete: "CASCADE",
  as: "likes",
});
Like.belongsTo(Forum, { foreignKey: "forumId" });
