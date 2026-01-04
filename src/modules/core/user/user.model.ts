import z from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { generateReferralCode } from "@shared/utils/generate-code";
import { USER } from "./user.constants";

export const UserModel = modelSchema({
  id: z.uuidv4("Invalid User Id"),
  email: z.email("Invalid Email"),
  passwordHash: z.string("Invalid Password Hash").nullable(),
  fcmToken: z.string("Invalid Fcm Token").nullable(),
  referralCode: z
    .string("Invalid Referral Code")
    .min(USER.REFERRAL_CODE.LENGTH.MIN, { error: "Referral Code is too short" })
    .max(USER.REFERRAL_CODE.LENGTH.MAX, { error: "Referral Code is too long" }),
  role: z.enum(USER.ROLES._, { error: "Invalid user role" }),
});

export type UserAttributes = z.infer<typeof UserModel.dbSchema>;
export type UserCreationAttributes = Omit<
  z.infer<typeof UserModel.dbFields>,
  "id" | "referralCode"
>;

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
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    fcmToken: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [USER.REFERRAL_CODE.LENGTH.MIN, USER.REFERRAL_CODE.LENGTH.MAX],
          msg: "Referral code is not of valid length.",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      values: USER.ROLES._,
      defaultValue: USER.ROLES.STUDENT,
    },
  }
);

// Hooks
User.beforeValidate(async (user: any) => {
  if (user.referralCode) return;

  let attempts = 0;
  let referralCode = "";

  do {
    if (attempts++ > 10)
      throw new Error("Could not generate unique referral code");
    referralCode = generateReferralCode(USER.REFERRAL_CODE.LENGTH.MAX);
  } while (await User.count({ where: { referralCode } }));

  user.referralCode = referralCode;
});

export type UserInstance = InstanceType<typeof User>;
