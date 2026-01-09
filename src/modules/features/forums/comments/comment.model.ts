import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile/profile.model";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";
import { Post } from "../post/post.model";
import { COMMENT } from "./comment.constants";

export const CommentModel = modelSchema({
  id: z.uuidv4("Invalid Comment Id"),
  localId: z.string("Invalid Local Id").nullable(),
  userId: z.uuidv4("Invalid User Id"),
  postId: z.uuidv4("Invalid Post Id"),
  replyingTo: z.uuidv4("Invalid Parent Comment Id").nullable(),
  body: z
    .string("Invalid Body")
    .min(COMMENT.BODY.LENGTH.MIN, { error: "Body is required" })
    .max(COMMENT.BODY.LENGTH.MAX, { error: "Body is too long" }),
  repliesCount: z.number().nonnegative(),
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
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Post, key: "id" },
  },
  replyingTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: "ForumComments", key: "id" },
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [COMMENT.BODY.LENGTH.MIN, COMMENT.BODY.LENGTH.MAX],
        msg: `Body should be in a length of ${COMMENT.BODY.LENGTH.MIN}-${COMMENT.BODY.LENGTH.MAX} characters`,
      },
    },
  },
  repliesCount: { ...STATS },
});

// Associations
Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  as: "comments",
});
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

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

export type CommentInstance = InstanceType<typeof Comment>;
