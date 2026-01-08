import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";
import { Sanitize } from "@shared/utils/sanitize";
import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const InstituteModel = modelSchema({
  id: z.uuidv4("Invalid Institute Id"),
  aisheCode: z.string("Invalid Aishe Code").nullable(),
  name: z.string("Invalid Institute Name"),
  nameNormalized: z.string("Invalid Normalized Name"),
  shortName: z.string("Invalid Short Name").nullable(),
  about: z.string("Invalid About").nullable(),
  district: z.string("Invalid District").nullable(),
  state: z.string("Invalid State").nullable(),
  country: z.string("Invalid Country").nullable(),
  address: z.string("Invalid Address").nullable(),
  pinCode: z.int("Invalid Pin Code").nullable(),
  yearOfEstablishment: z.int("Invalid Year Of Establishment").nullable(),
  website: z.url("Invalid Website").nullable(),
  location: z.string("Invalid Location").nullable(),
  category: z.string("Invalid Category").nullable(),
  administrativeMinistry: z.string("Invalid Administry Ministry").nullable(),
  standaloneType: z.string("Invalid Standalone Type").nullable(),
  management: z.string("Invalid Management").nullable(),
  collegeType: z.string("Invalid College Type").nullable(),
  universityName: z.string("Invalid University Name").nullable(),
  universityType: z.string("Invalid University Type").nullable(),
  phone: z.string("Invalid Phone").nullable(),
  landline: z.string("Invalid Landline").nullable(),
  imageUrl: z.url("Invalid Image Url").nullable(),
  rating: z.number("Invalid Rating").nonnegative("Rating cannot be negative"),
  reviewsCount: z.number("Invalid Review Count").nonnegative().default(0),
});

export type InstituteAttributes = z.infer<typeof InstituteModel.dbSchema>;
export type InstituteCreationAttributes = Omit<
  z.infer<typeof InstituteModel.dbFields>,
  "id" | "nameNormalized" | "rating" | "reviewsCount"
>;

export const Institute = defineModel<
  InstituteAttributes,
  InstituteCreationAttributes
>(
  db,
  "Institute",
  {
    id: { ...PRIMARY_ID },
    aisheCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    name: { type: DataTypes.STRING, allowNull: false },
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
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { isUrl: true },
    },
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
    collegeType: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { isUrl: true },
    },
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
  },
  {
    indexes: [
      { unique: true, fields: ["aisheCode", "name"], name: "one_aishe" },
    ],
  }
);

// Hooks
Institute.beforeValidate(async (institute: any) => {
  institute.nameNormalized = "";
  if (institute.name)
    institute.nameNormalized += Sanitize.normalizeString(institute.name);
  if (institute.district)
    institute.nameNormalized += Sanitize.normalizeString(institute.district);
  if (institute.state)
    institute.nameNormalized += Sanitize.normalizeString(institute.state);
  if (institute.address)
    institute.nameNormalized += Sanitize.normalizeString(institute.address);
});

export type InstituteInstance = InstanceType<typeof Institute>;
