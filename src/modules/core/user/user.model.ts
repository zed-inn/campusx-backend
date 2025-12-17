import db from "@config/database";
import { DataTypes } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "./user.interface";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { env } from "@config/env";
import { generateReferralCode } from "@shared/utils/generate-code";

export const User = defineModel<UserAttributes, UserCreationAttributes>(
  db,
  "User",
  {
    id: { ...PRIMARY_ID },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: { type: DataTypes.STRING, allowNull: true },
    fcmToken: { type: DataTypes.STRING, allowNull: true },
    referralCode: {
      type: DataTypes.CHAR(env.REFERRAL_CODE_LENGTH),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [env.REFERRAL_CODE_LENGTH, env.REFERRAL_CODE_LENGTH],
          msg: `Referral code has to be of ${env.REFERRAL_CODE_LENGTH} length.`,
        },
      },
    },
  }
);

// Hooks
User.beforeValidate(async (user: any) => {
  if (user.referralCode) return;

  let referralCode = generateReferralCode(env.REFERRAL_CODE_LENGTH);
  while (await User.count({ where: { referralCode } }))
    referralCode = generateReferralCode(env.REFERRAL_CODE_LENGTH);

  user.referralCode = referralCode;
});
