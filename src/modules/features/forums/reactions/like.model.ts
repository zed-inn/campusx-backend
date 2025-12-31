import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { Profile } from "@modules/core/user-profile";
import { Forum } from "../posts/posts.model";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const LikeModel = modelSchema({
  forumId: z.uuidv4("Invalid Forum Id"),
  userId: z.uuidv4("Invalid User Id"),
});

export type LikeAttributes = z.infer<typeof LikeModel.dbSchema>;
export type LikeCreationAttributes = Omit<
  z.infer<typeof LikeModel.dbFields>,
  never
>;

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

export type LikeInstance = InstanceType<typeof Like>;
