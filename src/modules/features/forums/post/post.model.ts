import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile/profile.model";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { POST } from "./post.constants";

export const PostModel = modelSchema({
  id: z.uuidv4("Invalid Forum Id"),
  localId: z.string("Invalid Local Id").nullable(),
  userId: z.uuidv4("Invalid User Id"),
  title: z
    .string("Invalid Title")
    .min(POST.TITLE.LENGTH.MIN, { error: "Title is too short" })
    .max(POST.TITLE.LENGTH.MAX, { error: "TItle is too long" }),
  body: z
    .string("Invalid Body")
    .min(POST.BODY.LENGTH.MIN, { error: "Body is too short" })
    .max(POST.BODY.LENGTH.MAX, { error: "Body is too long" })
    .nullable(),
  imageUrl: z.url("Invalid Image Url").nullable(),
});

export type PostAttributes = z.infer<typeof PostModel.dbSchema>;
export type PostCreationAttributes = Omit<
  z.infer<typeof PostModel.dbFields>,
  "id"
>;

export const Post = defineModel<PostAttributes, PostCreationAttributes>(
  db,
  "ForumPost",
  {
    id: { ...PRIMARY_ID },
    localId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [POST.TITLE.LENGTH.MIN, POST.TITLE.LENGTH.MAX],
          msg: `Title should be in length between ${POST.TITLE.LENGTH.MIN}-${POST.TITLE.LENGTH.MAX} characters`,
        },
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: {
          args: [POST.BODY.LENGTH.MIN, POST.BODY.LENGTH.MAX],
          msg: `Body should be in length between ${POST.BODY.LENGTH.MIN}-${POST.BODY.LENGTH.MAX} characters`,
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { isUrl: true },
    },
  }
);

// Associations
Profile.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "posts",
});
Post.belongsTo(Profile, { foreignKey: "userId", as: "writer" });

export type PostInstance = InstanceType<typeof Post>;
