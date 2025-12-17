import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { User } from "@modules/core/user";
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
      unique: "one person one like",
      references: { model: Forum, key: "id" },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "one person one like",
      references: { model: User, key: "id" },
    },
  }
);

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
