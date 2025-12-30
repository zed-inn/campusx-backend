import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";
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
  aisheCode: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    unique: "institute",
  },
  name: { type: DataTypes.STRING, allowNull: false, unique: "institute" },
  nameNormalized: { type: DataTypes.STRING, allowNull: false },
  shortName: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  about: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  district: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  state: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  country: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  address: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pinCode: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  yearOfEstablishment: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  website: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  location: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  category: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  administrativeMinistry: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  standaloneType: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  management: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  collegeType: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  universityName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  universityType: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  phone: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  landline: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  imageUrl: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  rating: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
    get() {
      const rawValue = this.getDataValue("rating");
      return rawValue ? parseFloat(rawValue as string) : null;
    },
  },
  reviewsCount: { ...STATS },
});

export type InstituteInstance = InstanceType<typeof Institute>;

// Hooks
Institute.beforeValidate(async (institute: any) => {
  institute.nameNormalized = "";
  if (institute.name)
    institute.nameNormalized += Sanitize.normalizeString(institute.name);
  if (institute.district)
    institute.nameNormalized += Sanitize.normalizeString(institute.district);
  if (institute.state)
    institute.state += Sanitize.normalizeString(institute.state);
  if (institute.address)
    institute.address += Sanitize.normalizeString(institute.address);
});
