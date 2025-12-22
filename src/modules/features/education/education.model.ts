import { defineModel } from "@shared/utils/define-model";
import {
  EducationAttributes,
  EducationCreationAttributes,
} from "./education.interface";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile";
import { Institute } from "@modules/core/institutes";

export const Education = defineModel<
  EducationAttributes,
  EducationCreationAttributes
>(db, "UserEducation", {
  id: { ...PRIMARY_ID },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Profile, key: "id" },
  },
  instituteId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Institute, key: "id" },
  },
  startYear: { type: DataTypes.INTEGER, allowNull: false },
  startMonth: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 12 },
  },
  endYear: { type: DataTypes.INTEGER, allowNull: true },
  endMonth: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 1, max: 12 },
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

// Associations
Profile.hasMany(Education, {
  foreignKey: "userId",
  as: "education",
  onDelete: "CASCADE",
});
Education.belongsTo(Profile, { foreignKey: "userId", as: "user" });

Institute.hasMany(Education, {
  foreignKey: "instituteId",
  onDelete: "CASCADE",
});
Education.belongsTo(Institute, { foreignKey: "instituteId", as: "institute" });
