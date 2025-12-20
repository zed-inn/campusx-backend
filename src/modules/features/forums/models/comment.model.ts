import { DataTypes } from "sequelize";
import db from "@config/database";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { Profile } from "@modules/core/profile";
import { Forum } from "./forum.model";
import {
  CommentAttributes,
  CommentCreationAttributes,
} from "../interfaces/comment.interface";

export const Comment = defineModel<
  CommentAttributes,
  CommentCreationAttributes
>(db, "ForumComment", {
  id: { ...PRIMARY_ID },
  localId: { type: DataTypes.STRING, allowNull: true },
  userId: {
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
  repliesCount: { ...STATS },
});

// Associations
Forum.hasMany(Comment, {
  foreignKey: "forumId",
  onDelete: "CASCADE",
  as: "comments",
});
Comment.belongsTo(Forum, { foreignKey: "forumId", as: "forum" });

Profile.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Comment.belongsTo(Profile, { foreignKey: "userId", as: "writer" });

Comment.hasMany(Comment, {
  foreignKey: "replyingTo",
  as: "replies",
});
Comment.belongsTo(Comment, { foreignKey: "replyingTo" });

// Hooks
Comment.beforeDestroy(async (comment) => {
  const repliedComments = await Comment.findAll({
    where: { replyingTo: comment.dataValues.id },
  });

  for (const c of repliedComments) {
    await c.destroy();
  }
});
