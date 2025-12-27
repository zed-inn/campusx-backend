import { DataTypes } from "sequelize";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import {
  CategoryAttributes,
  CategoryCreationAttributes,
} from "../interfaces/category.interface";
import { INSIGHT_CONFIG } from "../insight.config";

export const Category = defineModel<
  CategoryAttributes,
  CategoryCreationAttributes
>(db, "Category", {
  id: { ...PRIMARY_ID },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [INSIGHT_CONFIG.CATEGORY.MIN, Infinity],
        msg: `Category name must be atleast ${INSIGHT_CONFIG.CATEGORY.MIN} characters.`,
      },
    },
  },
});

export type CategoryInstance = InstanceType<typeof Category>;
