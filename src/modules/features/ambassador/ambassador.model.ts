import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Institute } from "@modules/core/institutes";
import { REQUEST_STATUS } from "./ambassador.constants";
import { modelSchema } from "@shared/utils/model-schema";
import { defineModel } from "@shared/utils/define-model";
import { Profile } from "@modules/core/user-profile";

export const AmbassadorModel = modelSchema({
  id: z.uuidv4("Invalid Ambassador Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  reason: z.string("Invalid Reason").nullable().default(null),
  status: z.enum(REQUEST_STATUS._).default(REQUEST_STATUS.PENDING),
});

export type AmbassadorAttributes = z.infer<typeof AmbassadorModel.dbSchema>;
export type AmbassadorCreationAttributes = Omit<
  z.infer<typeof AmbassadorModel.dbFields>,
  "status"
>;

export const Ambassador = defineModel<
  AmbassadorAttributes,
  AmbassadorCreationAttributes
>(
  db,
  "Ambassador",
  {
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
    reason: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.STRING,
      values: REQUEST_STATUS._,
      allowNull: false,
      defaultValue: REQUEST_STATUS.PENDING,
    },
  },
  {
    indexes: [{ unique: true, fields: ["id"], name: "one_user" }],
  }
);

// Associations
Profile.hasOne(Ambassador, {
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

export type AmbassadorInstance = InstanceType<typeof Ambassador>;
