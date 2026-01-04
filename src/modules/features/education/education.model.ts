import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile";
import { Institute } from "@modules/core/institutes";
import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const EducationModel = modelSchema({
  id: z.uuidv4("Invalid Education Id"),
  localId: z.string("Invalid LocalId").nullable(),
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  description: z.string("Invalid Description").nullable(),
  startYear: z.int("Invalid Start Year").positive("Invalid Start Year"),
  startMonth: z
    .int("Invalid Start Month")
    .min(1, { error: "Invalid Start Month" })
    .max(12, { error: "Invalid Start Month" })
    .nullable(),
  endYear: z.int("Invalid End Year").positive("Invalid End Year").nullable(),
  endMonth: z
    .int("Invalid End Month")
    .min(1, { error: "Invalid End Month" })
    .max(12, { error: "Invalid End Month" })
    .nullable(),
});

export type EducationAttributes = z.infer<typeof EducationModel.dbSchema>;
export type EducationCreationAttributes = Omit<
  z.infer<typeof EducationModel.dbFields>,
  "id"
>;

export const Education = defineModel<
  EducationAttributes,
  EducationCreationAttributes
>(db, "UserEducation", {
  id: { ...PRIMARY_ID },
  localId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
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
  description: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  startYear: { type: DataTypes.INTEGER, allowNull: false },
  startMonth: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: 1, max: 12 },
  },
  endYear: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  endMonth: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: 1, max: 12 },
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

export type EducationInstance = InstanceType<typeof Education>;
