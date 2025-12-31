import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";

import { Sanitize } from "@shared/utils/sanitize";

import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const InstituteModel = modelSchema({
  id: z.uuidv4("Invalid Institute Id"),
  aisheCode: z.string("Invalid Aishe Code").nullable().default(null),
  name: z.string("Invalid Institute Name"),
  nameNormalized: z.string("Invalid Normalized Name"),
  shortName: z.string("Invalid Short Name").nullable().default(null),
  about: z.string("Invalid About").nullable().default(null),
  district: z.string("Invalid District").nullable().default(null),
  state: z.string("Invalid State").nullable().default(null),
  country: z.string("Invalid Country").nullable().default(null),
  address: z.string("Invalid Address").nullable().default(null),
  pinCode: z.int("Invalid Pin Code").nullable().default(null),
  yearOfEstablishment: z
    .int("Invalid Year Of Establishment")
    .nullable()
    .default(null),
  website: z.url("Invalid Website").nullable().default(null),
  location: z.string("Invalid Location").nullable().default(null),
  category: z.string("Invalid Category").nullable().default(null),
  administrativeMinistry: z
    .string("Invalid Administry Ministry")
    .nullable()
    .default(null),
  standaloneType: z.string("Invalid Standalone Type").nullable().default(null),
  management: z.string("Invalid Management").nullable().default(null),
  collegeType: z.string("Invalid College Type").nullable().default(null),
  universityName: z.string("Invalid University Name").nullable().default(null),
  universityType: z.string("Invalid University Type").nullable().default(null),
  phone: z.string("Invalid Phone").nullable().default(null),
  landline: z.string("Invalid Landline").nullable().default(null),
  imageUrl: z.url("Invalid Image Url").nullable().default(null),
  rating: z
    .number("Invalid Rating")
    .nonnegative("Rating cannot be negative")
    .default(0),
  reviewsCount: z.number("Invalid Review Count").nonnegative().default(0),
});

export type InstituteAttributes = z.infer<typeof InstituteModel.dbSchema>;

export type InstituteCreationAttributes = Omit<
  z.infer<typeof InstituteModel.dbFields>,
  "id" | "nameNormalized" | "rating" | "ratingsCount" | "reviewsCount"
>;

export const Institute = defineModel<
  InstituteAttributes,
  InstituteCreationAttributes
>(db, "Institute", {
  id: { ...PRIMARY_ID },
  aisheCode: {
    type: DataTypes.STRING,
    allowNull: true,

    unique: "institute",
  },
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

export type InstituteInstance = InstanceType<typeof Institute>;
