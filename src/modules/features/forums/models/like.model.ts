import db from "@config/database";
import { DataTypes, Model, ModelStatic } from "sequelize";
import { Forum } from "./forum.model";
import { Profile } from "@modules/core/profile";
import {
  LikeAttributes,
  LikeCreationAttributes,
} from "../interfaces/like.interface";

const LikeModel = db.define("ForumLike", {
  forumId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "one person one like",
    references: { model: Forum, key: "id" },
  },
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "one person one like",
    references: { model: Profile, key: "id" },
  },
});

export const Like = LikeModel as ModelStatic<
  Model<LikeAttributes, LikeCreationAttributes>
>;

Profile.hasMany(Like, {
  foreignKey: "profileId",
  as: "likes",
  onDelete: "CASCADE",
});
Like.belongsTo(Profile, { foreignKey: "profileId", as: "writer" });

Forum.hasMany(Like, {
  foreignKey: "forumId",
  as: "likes",
  onDelete: "CASCADE",
});
Like.belongsTo(Forum, { foreignKey: "forumId" });
