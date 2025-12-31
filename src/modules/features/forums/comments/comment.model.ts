import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Forum } from "../posts/posts.model";
import { Profile } from "@modules/core/user-profile";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";

export const CommentModel = modelSchema({
  id: z.uuidv4("Invalid Comment Id"),
  localId: z.string("Invalid Local Id").nullable().default(null),
  userId: z.uuidv4("Invalid User Id"),
  forumId: z.uuidv4("Invalid Forum Id"),
  replyingTo: z.uuidv4("Invalid Parent Comment Id").nullable().default(null),
  body: z.string("Invalid Body"),
  repliesCount: z.number().nonnegative().default(0),
});

export type CommentAttributes = z.infer<typeof CommentModel.dbSchema>;
export type CommentCreationAttributes = Omit<
  z.infer<typeof CommentModel.dbFields>,
  "id" | "repliesCount"
>;

export const Comment = defineModel<
  CommentAttributes,
  CommentCreationAttributes
>(db, "ForumComment", {
  id: { ...PRIMARY_ID },
  localId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
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
  body: { type: DataTypes.TEXT, allowNull: false },
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
Comment.belongsTo(Comment, { foreignKey: "replyingTo", as: "parentComment" });

// Hooks
Comment.beforeDestroy(async (comment) => {
  const repliedComments = await Comment.findAll({
    where: { replyingTo: comment.dataValues.id },
  });

  for (const c of repliedComments) {
    await c.destroy();
  }
});

export type CommentInstance = InstanceType<typeof Comment>;
