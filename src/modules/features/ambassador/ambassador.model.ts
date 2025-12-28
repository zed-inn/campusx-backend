import { defineModel } from "@shared/utils/define-model";
import {
  AmbassadorAttributes,
  AmbassadorCreationAttributes,
} from "./ambassador.interface";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile";
import { Institute } from "@modules/core/institutes";
import { AMBASSADOR_CONFIG } from "./ambassador.config";

export const Ambassador = defineModel<
  AmbassadorAttributes,
  AmbassadorCreationAttributes
>(db, "Ambassador", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    references: { model: Profile, key: "id" },
  },
  instituteId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Institute, key: "id" },
  },
  reasonToBecome: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: DataTypes.STRING,
    values: Object.values(AMBASSADOR_CONFIG.STATUS),
    allowNull: false,
    defaultValue: AMBASSADOR_CONFIG.STATUS.PENDING,
  },
});

export type AmbassadorInstance = InstanceType<typeof Ambassador>;

// Associations
Profile.hasMany(Ambassador, {
  foreignKey: "id",
  onDelete: "CASCADE",
  as: "ambassador",
});
Ambassador.belongsTo(Profile, { foreignKey: "id", as: "user" });

Institute.hasMany(Ambassador, {
  foreignKey: "instituteId",
  onDelete: "CASCADE",
  as: "ambassadors",
});
Ambassador.belongsTo(Institute, { foreignKey: "instituteId", as: "institute" });
