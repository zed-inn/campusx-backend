import db from "@config/database";
import { DataTypes } from "sequelize";
import {
  ProfileAttributes,
  ProfileCreationAttributes,
} from "../interfaces/profile.interface";
import { User } from "@modules/core/user";
import { PROFILE_CONFIG } from "../profile.config";
import { defineModel } from "@shared/utils/define-model";
import { STATS } from "@shared/utils/db-types";

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
    type: DataTypes.STRING(PROFILE_CONFIG.USERNAME.MAX),
    allowNull: true,
    unique: true,
    validate: {
      len: {
        args: [PROFILE_CONFIG.USERNAME.MIN, PROFILE_CONFIG.USERNAME.MAX],
        msg: `Username should be within length of ${PROFILE_CONFIG.USERNAME.MIN}-${PROFILE_CONFIG.USERNAME.MAX} characters.`,
      },
    },
  },
  fullName: {
    type: DataTypes.STRING(PROFILE_CONFIG.FULLNAME.MAX),
    allowNull: false,
    validate: {
      len: {
        args: [PROFILE_CONFIG.FULLNAME.MIN, PROFILE_CONFIG.FULLNAME.MAX],
        msg: `Full Name should be within length of ${PROFILE_CONFIG.FULLNAME.MIN}-${PROFILE_CONFIG.FULLNAME.MAX} characters.`,
      },
    },
  },
  about: { type: DataTypes.STRING, allowNull: true },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    validate: { isUrl: true },
  },
  gender: {
    type: DataTypes.STRING,
    values: PROFILE_CONFIG.GENDER,
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
    validate: { min: PROFILE_CONFIG.DOB.MIN, max: PROFILE_CONFIG.DOB.MAX },
  },
  followersCount: { ...STATS },
  followingCount: { ...STATS },
});

export type ProfileInstance = InstanceType<typeof Profile>;

// Associations
User.hasOne(Profile, { foreignKey: "id", onDelete: "CASCADE", as: "profile" });
Profile.belongsTo(User, { foreignKey: "id", as: "user" });
