import { DataTypes } from "sequelize";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import {
  InsightAttributes,
  InsightCreationAttributes,
} from "../interfaces/insight.interface";
import { INSIGHT_CONFIG } from "../insight.config";
import { Category } from "./category.model";

export const Insight = defineModel<
  InsightAttributes,
  InsightCreationAttributes
>(db, "Insight", {
  id: { ...PRIMARY_ID },
  title: { type: DataTypes.STRING, allowNull: true },
  body: { type: DataTypes.STRING, allowNull: true },
  hindiTitle: { type: DataTypes.STRING, allowNull: true },
  hindiBody: { type: DataTypes.STRING, allowNull: true },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Category, key: "id" },
  },
  status: {
    type: DataTypes.STRING,
    values: Object.values(INSIGHT_CONFIG.STATUS),
    allowNull: false,
    defaultValue: INSIGHT_CONFIG.STATUS.DRAFT,
  },
});

// Associations
Category.hasMany(Insight, {
  foreignKey: "categoryId",
  as: "insights",
  onDelete: "SET NULL",
});
Insight.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
