import db from "@config/database";
import { Profile } from "@modules/core/profile";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";
import { DataTypes, Model, ModelStatic } from "sequelize";
import { Forum } from "./forum.model";
import {
  CommentAttributes,
  CommentCreationAttributes,
} from "../interfaces/comment.interface";

const CommentModel = db.define("ForumComment", {
  id: { ...PRIMARY_ID },
  localId: { type: DataTypes.STRING, allowNull: true },
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Profile, key: "id" },
  },
  forumId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Forum, key: "id" },
  },
  replyingTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: "ForumComments", key: "id" },
  },
  body: { type: DataTypes.STRING, allowNull: false },
  replies: { ...STATS },
});

export const Comment = CommentModel as ModelStatic<
  Model<CommentAttributes, CommentCreationAttributes>
>;

Forum.hasMany(Comment, {
  foreignKey: "forumId",
  onDelete: "CASCADE",
  as: "comments",
});
Comment.belongsTo(Forum, { foreignKey: "forumId", as: "forum" });

Profile.hasMany(Comment, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
  as: "comments",
});
Comment.belongsTo(Profile, { foreignKey: "profileId", as: "profile" });

Comment.hasMany(Comment, {
  foreignKey: "replyingTo",
  onDelete: "SET NULL",
  as: "replies",
});
Comment.belongsTo(Comment, { foreignKey: "replyingTo" });
