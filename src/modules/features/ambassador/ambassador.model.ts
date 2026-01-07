import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Institute } from "@modules/core/institutes/institute.model";
import { modelSchema } from "@shared/utils/model-schema";
import { defineModel } from "@shared/utils/define-model";
import { Profile } from "@modules/core/profile/profile.model";

export const AmbassadorModel = modelSchema({
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
});

export type AmbassadorAttributes = z.infer<typeof AmbassadorModel.dbSchema>;
export type AmbassadorCreationAttributes = Omit<
  z.infer<typeof AmbassadorModel.dbFields>,
  never
>;

export const Ambassador = defineModel<
  AmbassadorAttributes,
  AmbassadorCreationAttributes
>(
  db,
  "Ambassador",
  {
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
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "instituteId"],
        name: "ambassador_one_user_per_institute",
      },
      {
        unique: true,
        fields: ["userId"],
        name: "ambassador_user_only_one",
      },
    ],
  }
);

// Associations
Profile.hasOne(Ambassador, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "ambassador",
});
Ambassador.belongsTo(Profile, { foreignKey: "userId", as: "user" });

Institute.hasMany(Ambassador, {
  foreignKey: "instituteId",
  onDelete: "CASCADE",
  as: "ambassadors",
});
Ambassador.belongsTo(Institute, { foreignKey: "instituteId", as: "institute" });

export type AmbassadorInstance = InstanceType<typeof Ambassador>;
