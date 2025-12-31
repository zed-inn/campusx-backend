import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { CATEGORY_LENGTH } from "../post/insight.constants";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";

export const CategoryModel = modelSchema({
  id: z.uuidv4("Invalid Category Id"),
  name: z
    .string("Invalid Category Name")
    .min(CATEGORY_LENGTH.MIN, { error: "Category name is too short." }),
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
        args: [CATEGORY_LENGTH.MIN, Infinity],
        msg: `Category name must be atleast ${CATEGORY_LENGTH.MIN} characters.`,
      },
    },
  },
});

export type CategoryInstance = InstanceType<typeof Category>;
