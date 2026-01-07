import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Category } from "../category/category.model";
import { POST } from "./post.constants";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { modelSchema } from "@shared/utils/model-schema";
import { defineModel } from "@shared/utils/define-model";

export const PostModel = modelSchema({
  id: z.uuidv4("Invalid Post Id"),
  title: z
    .string("Invalid Title")
    .min(POST.TITLE.LENGTH.MIN, { error: "Title is too short" })
    .max(POST.TITLE.LENGTH.MAX, { error: "Title is too long" })
    .nullable(),
  body: z
    .string("Invalid Body")
    .min(POST.BODY.LENGTH.MIN, { error: "Body is too short" })
    .max(POST.BODY.LENGTH.MAX, { error: "Body is too long" })
    .nullable(),
  hindiTitle: z
    .string("Invalid Hindi Title")
    .min(POST.TITLE.LENGTH.MIN, { error: "Title is too short" })
    .max(POST.TITLE.LENGTH.MAX, { error: "Title is too long" })
    .nullable(),
  hindiBody: z
    .string("Invalid Hindi Body")
    .min(POST.BODY.LENGTH.MIN, { error: "Body is too short" })
    .max(POST.BODY.LENGTH.MAX, { error: "Body is too long" })
    .nullable(),
  imageUrl: z.url("Invalid Image Url").nullable(),
  categoryId: z.uuidv4("Invalid Category Id").nullable(),
  status: z.enum(POST.STATUS._, {
    error: "Invalid Post Status",
  }),
});

export type PostAttributes = z.infer<typeof PostModel.dbSchema>;
export type PostCreationAttributes = Omit<
  z.infer<typeof PostModel.dbFields>,
  "id"
>;

export const Post = defineModel<PostAttributes, PostCreationAttributes>(
  db,
  "Post",
  {
    id: { ...PRIMARY_ID },
    title: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    body: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    hindiTitle: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    hindiBody: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      validate: { isUrl: true },
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Category, key: "id" },
    },
    status: {
      type: DataTypes.STRING,
      values: POST.STATUS._,
      allowNull: false,
      defaultValue: POST.STATUS.Draft,
    },
  }
);

// Associations
Category.hasMany(Post, {
  foreignKey: "categoryId",
  as: "posts",
  onDelete: "SET NULL",
});
Post.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export type PostInstance = InstanceType<typeof Post>;
