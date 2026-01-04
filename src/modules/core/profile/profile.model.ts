import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { User } from "@modules/core/user";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { PROFILE } from "./profile.constants";

export const ProfileModel = modelSchema({
  id: z.uuidv4("Invalid User Id"),
  username: z
    .string("Invalid Username")
    .min(PROFILE.USERNAME.LENGTH.MIN, { error: "Username is too short" })
    .max(PROFILE.USERNAME.LENGTH.MAX, { error: "Username is too long" })
    .nullable(),
  fullName: z
    .string("Invalid Fullname")
    .min(PROFILE.FULLNAME.LENGTH.MIN, { error: "Fullname is too short" })
    .max(PROFILE.FULLNAME.LENGTH.MAX, { error: "Fullname is too long" }),
  about: z.string("Invalid About").nullable(),
  avatarUrl: z.url("Invalid Avatar Url").nullable(),
  gender: z.enum(PROFILE.GENDER._, { error: "Invalid Gender" }).nullable(),
  dob: z.number("Invalid Dob").nonnegative("Dob cannot be negative").nullable(),
});

export type ProfileAttributes = z.infer<typeof ProfileModel.dbSchema>;
export type ProfileCreationAttributes = Omit<
  z.infer<typeof ProfileModel.dbFields>,
  never
>;

export const Profile = defineModel<
  ProfileAttributes,
  ProfileCreationAttributes
>(db, "Profile", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    references: { model: User, key: "id" },
  },
  username: {
    type: DataTypes.STRING(PROFILE.USERNAME.LENGTH.MAX),
    allowNull: true,
    unique: true,
    validate: {
      len: {
        args: [PROFILE.USERNAME.LENGTH.MIN, PROFILE.USERNAME.LENGTH.MAX],
        msg: `Username should be within length of ${PROFILE.USERNAME.LENGTH.MIN}-${PROFILE.USERNAME.LENGTH.MAX} characters.`,
      },
    },
  },
  fullName: {
    type: DataTypes.STRING(PROFILE.FULLNAME.LENGTH.MAX),
    allowNull: false,
    validate: {
      len: {
        args: [PROFILE.FULLNAME.LENGTH.MIN, PROFILE.FULLNAME.LENGTH.MAX],
        msg: `Full Name should be within length of ${PROFILE.FULLNAME.LENGTH.MIN}-${PROFILE.FULLNAME.LENGTH.MAX} characters.`,
      },
    },
  },
  about: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: { isUrl: true },
  },
  gender: {
    type: DataTypes.STRING,
    values: PROFILE.GENDER._,
    allowNull: true,
    defaultValue: null,
  },
  dob: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
    get() {
      const rawValue = this.getDataValue("dob");
      return rawValue ? parseInt(rawValue as string, 10) : null;
    },
    validate: { min: 0, max: Infinity },
  },
});

// Associations
User.hasOne(Profile, { foreignKey: "id", onDelete: "CASCADE", as: "profile" });
Profile.belongsTo(User, { foreignKey: "id", as: "user" });

export type ProfileInstance = InstanceType<typeof Profile>;
