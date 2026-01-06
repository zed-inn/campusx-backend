import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";
import { User, UserModel } from "../user.model";
import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { DataTypes } from "sequelize";

export const ReferralUseModel = modelSchema({
  deviceId: z.string("Invalid Device Id"),
  userId: UserModel.fields.id,
  referralCodeUsed: UserModel.fields.referralCode,
  referrerId: UserModel.fields.id,
});

export type ReferralUseAttributes = z.infer<typeof ReferralUseModel.dbSchema>;
export type ReferralUseCreationAttributes = Omit<
  z.infer<typeof ReferralUseModel.dbFields>,
  never
>;

export const ReferralUse = defineModel<
  ReferralUseAttributes,
  ReferralUseCreationAttributes
>(
  db,
  "ReferralUse",
  {
    deviceId: { type: DataTypes.STRING, unique: true, allowNull: false },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      unique: true,
    },
    referralCodeUsed: { type: DataTypes.STRING, allowNull: false },
    referrerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
    },
  },
  {
    indexes: [
      { unique: true, fields: ["deviceId"], name: "one_referral_per_device" },
      { unique: true, fields: ["userId"], name: "one_referral_per_user" },
    ],
  }
);

// Associations
User.hasOne(ReferralUse, { foreignKey: "userId" });
ReferralUse.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(ReferralUse, { foreignKey: "referrerId", as: "referrals" });
ReferralUse.belongsTo(User, { foreignKey: "referrerId", as: "referrer" });

export type ReferralUseInstance = InstanceType<typeof ReferralUse>;
