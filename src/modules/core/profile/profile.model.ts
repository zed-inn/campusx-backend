import db from "@config/database";
import { DataTypes } from "sequelize";
import {
  ProfileAttributes,
  ProfileCreationAttributes,
} from "./profile.interface";
import { User } from "@modules/core/user";
import { PROFILE_CONFIG } from "./profile.config";
import { defineModel } from "@shared/utils/define-model";

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
    validate: { isUrl: true },
  },
  gender: {
    type: DataTypes.STRING,
    values: PROFILE_CONFIG.GENDER,
    allowNull: true,
  },
  dob: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: PROFILE_CONFIG.DOB.MIN, max: PROFILE_CONFIG.DOB.MAX },
  },
});

// Association
User.hasOne(Profile, { foreignKey: "id", onDelete: "CASCADE", as: "profile" });
Profile.belongsTo(User, { foreignKey: "id", as: "user" });
