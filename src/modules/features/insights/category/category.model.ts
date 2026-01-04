import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { CATEGORY } from "./category.constants";

export const CategoryModel = modelSchema({
  id: z.uuidv4("Invalid Category Id"),
  name: z
    .string("Invalid Category Name")
    .min(CATEGORY.NAME.LENGTH.MIN, { error: "Category name is too short" })
    .min(CATEGORY.NAME.LENGTH.MAX, { error: "Category name is too long" }),
});

export type CategoryAttributes = z.infer<typeof CategoryModel.dbSchema>;

export type CategoryCreationAttributes = Omit<
  z.infer<typeof CategoryModel.dbFields>,
  "id"
>;

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
        args: [CATEGORY.NAME.LENGTH.MIN, CATEGORY.NAME.LENGTH.MAX],
        msg: `Category name must be between ${CATEGORY.NAME.LENGTH.MIN}-${CATEGORY.NAME.LENGTH.MAX} characters.`,
      },
    },
  },
});

export type CategoryInstance = InstanceType<typeof Category>;
