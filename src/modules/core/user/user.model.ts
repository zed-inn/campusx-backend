import z from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { generateReferralCode } from "@shared/utils/generate-code";
import { REFERRAL_CODE_LENGTH, USER_ROLES } from "./user.constants";

export const UserModel = modelSchema(
  {
    id: z.uuidv4("Invalid User Id"),
    email: z.email("Invalid Email"),
    passwordHash: z.string("Invalid Password").nullable().default(null),
    fcmToken: z.string("Invalid Fcm Token").nullable().default(null),
    referralCode: z
      .string("Invalid Referral Code")
      .min(REFERRAL_CODE_LENGTH.MIN)
      .max(REFERRAL_CODE_LENGTH.MAX),
    role: z.enum(USER_ROLES._).default(USER_ROLES.STUDENT),
  },
  {
    password: z
      .string("Invalid Password")
      .min(8, { error: "Password cannot be shorter than 8 characters" }),
  }
);

export type UserAttributes = z.infer<typeof UserModel.dbSchema>;
export type UserCreationAttributes = Omit<
  z.infer<typeof UserModel.dbFields>,
  "id" | "referralCode" | "fcmToken"
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
    passwordHash: { type: DataTypes.STRING, allowNull: true },
    fcmToken: { type: DataTypes.STRING, allowNull: true },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [REFERRAL_CODE_LENGTH.MIN, REFERRAL_CODE_LENGTH.MAX],
          msg: `Referral code is not of valid length.`,
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      values: USER_ROLES._,
      defaultValue: USER_ROLES.STUDENT,
    },
  }
);

// Hooks
User.beforeValidate(async (user: any) => {
  if (user.referralCode) return;

  let referralCode = generateReferralCode(REFERRAL_CODE_LENGTH.MAX);
  while (await User.count({ where: { referralCode } }))
    referralCode = generateReferralCode(REFERRAL_CODE_LENGTH.MAX);

  user.referralCode = referralCode;
});

export type UserInstance = InstanceType<typeof User>;
