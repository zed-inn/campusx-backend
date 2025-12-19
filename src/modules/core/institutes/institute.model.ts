import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { PRIMARY_ID } from "@shared/utils/db-types";
import {
  InstituteAttributes,
  InstituteCreationAttributes,
} from "./institute.interface";
import { Sanitize } from "@shared/utils/sanitize";

export const Institute = defineModel<
  InstituteAttributes,
  InstituteCreationAttributes
>(db, "Institute", {
  id: { ...PRIMARY_ID },
  aisheCode: { type: DataTypes.STRING, allowNull: true, unique: "institute" },
  name: { type: DataTypes.STRING, allowNull: false, unique: "institute" },
  nameNormalized: { type: DataTypes.STRING, allowNull: false },
  shortName: { type: DataTypes.STRING, allowNull: true },
  about: { type: DataTypes.TEXT, allowNull: true },
  district: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
  pinCode: { type: DataTypes.INTEGER, allowNull: true },
  yearOfEstablishment: { type: DataTypes.INTEGER, allowNull: true },
  website: { type: DataTypes.STRING, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  category: { type: DataTypes.STRING, allowNull: true },
  administrativeMinistry: { type: DataTypes.STRING, allowNull: true },
  standaloneType: { type: DataTypes.STRING, allowNull: true },
  management: { type: DataTypes.STRING, allowNull: true },
  collegeType: { type: DataTypes.STRING, allowNull: true },
  universityName: { type: DataTypes.STRING, allowNull: true },
  universityType: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  landline: { type: DataTypes.STRING, allowNull: true },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  rating: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
  ratingsCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  reviewsCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  instituteType: { type: DataTypes.STRING, allowNull: true },
});

// Hooks
Institute.beforeValidate(async (institute: any) => {
  if (institute.name)
    institute.nameNormalized = Sanitize.normalizeString(institute.name);
});
