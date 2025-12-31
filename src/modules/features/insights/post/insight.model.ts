import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Category } from "../category/category.model";
import { STATUS } from "./insight.constants";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { modelSchema } from "@shared/utils/model-schema";
import { defineModel } from "@shared/utils/define-model";

export const InsightModel = modelSchema({
  id: z.uuidv4("Invalid Insight Id"),
  title: z.string("Invalid Title").nullable().default(null),
  body: z.string("Invalid Body").nullable().default(null),
  hindiTitle: z.string("Invalid Hindi Title").nullable().default(null),
  hindiBody: z.string("Invalid Hindi Body").nullable().default(null),
  imageUrl: z.url("Invalid Image Url").nullable().default(null),
  categoryId: z.uuidv4("Invalid Category Id").nullable().default(null),
  status: z.enum(STATUS._, {
    error: "Invalid Insight Status",
  }),
});

export type InsightAttributes = z.infer<typeof InsightModel.dbSchema>;

export type InsightCreationAttributes = Omit<
  z.infer<typeof InsightModel.dbFields>,
  "id"
>;

export const Insight = defineModel<
  InsightAttributes,
  InsightCreationAttributes
>(db, "Insight", {
  id: { ...PRIMARY_ID },
  title: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  body: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  hindiTitle: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  hindiBody: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  imageUrl: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Category, key: "id" },
  },
  status: {
    type: DataTypes.STRING,
    values: STATUS._,
    allowNull: false,
    defaultValue: STATUS.Draft,
  },
});

// Associations
Category.hasMany(Insight, {
  foreignKey: "categoryId",
  as: "insights",
  onDelete: "SET NULL",
});
Insight.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export type InsightInstance = InstanceType<typeof Insight>;
