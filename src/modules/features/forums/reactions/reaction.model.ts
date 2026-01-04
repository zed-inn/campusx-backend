import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { Profile } from "@modules/core/profile";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";
import { Post } from "../post/post.model";

export const ReactionModel = modelSchema({
  postId: z.uuidv4("Invalid Post Id"),
  userId: z.uuidv4("Invalid User Id"),
});

export type ReactionAttributes = z.infer<typeof ReactionModel.dbSchema>;
export type ReactionCreationAttributes = Omit<
  z.infer<typeof ReactionModel.dbFields>,
  never
>;

export const Reaction = defineModel<
  ReactionAttributes,
  ReactionCreationAttributes
>(
  db,
  "ForumReaction",
  {
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Post, key: "id" },
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
        fields: ["postId", "userId"],
        name: "forums_reaction_unique",
      },
    ],
  }
);

// Associations
Profile.hasMany(Reaction, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Reaction.belongsTo(Profile, { foreignKey: "userId" });

Post.hasMany(Reaction, {
  foreignKey: "forumId",
  onDelete: "CASCADE",
  as: "reactions",
});
Reaction.belongsTo(Post, { foreignKey: "forumId" });

export type ReactionInstance = InstanceType<typeof Reaction>;
