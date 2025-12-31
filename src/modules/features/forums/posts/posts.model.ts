import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/user-profile";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";

export const ForumModel = modelSchema({
  id: z.uuidv4("Invalid Forum Id"),
  localId: z.string("Invalid Local Id").nullable().default(null),
  userId: z.uuidv4("Invalid User Id"),
  title: z.string("Invalid Title").min(1, { error: "Title is too short" }),
  body: z.string("Invalid Body").nullable().default(null),
  imageUrl: z.url("Invalid Image Url").nullable().default(null),
  commentsCount: z.number().nonnegative().default(0),
  likesCount: z.number().nonnegative().default(0),
});

export type ForumAttributes = z.infer<typeof ForumModel.dbSchema>;
export type ForumCreationAttributes = Omit<
  z.infer<typeof ForumModel.dbFields>,
  "id" | "commentsCount" | "likesCount"
>;

export const Forum = defineModel<ForumAttributes, ForumCreationAttributes>(
  db,
  "Forum",
  {
    id: { ...PRIMARY_ID },
    localId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    imageUrl: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    commentsCount: { ...STATS },
    likesCount: { ...STATS },
  }
);

// Associations
Profile.hasMany(Forum, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "forums",
});
Forum.belongsTo(Profile, { foreignKey: "userId", as: "writer" });

export type ForumInstance = InstanceType<typeof Forum>;
