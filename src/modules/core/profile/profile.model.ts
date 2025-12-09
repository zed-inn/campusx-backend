import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/primary-id";
import {
  DataTypes,
  Model,
  ModelAttributeColumnOptions,
  ModelStatic,
} from "sequelize";
import {
  ProfileAttributes,
  ProfileCreationAttributes,
} from "./profile.interface";
import { User } from "@modules/core/user";
import { PROFILE } from "./profile.config";

const STATS: ModelAttributeColumnOptions = {
  type: DataTypes.INTEGER,
  allowNull: true,
  validate: { min: 0 },
  defaultValue: 0,
};

const ProfileModel = db.define("Profile", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    references: { model: User, key: "id" },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: { len: [PROFILE.USERNAME_MIN_LENGTH, 20] },
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [PROFILE.FULLNAME_MIN_LENGTH, 100] },
  },
  about: { type: DataTypes.STRING, allowNull: true },
  profileImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isUrl: true },
  },
  gender: {
    type: DataTypes.STRING,
    values: PROFILE.GENDER_OPTIONS,
    allowNull: true,
  },
  dob: { type: DataTypes.INTEGER, allowNull: true },
  referralCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [PROFILE.REFERRAL_CODE_LENGTH, PROFILE.REFERRAL_CODE_LENGTH],
    },
  },
  followers: { ...STATS },
  followings: { ...STATS },
  forums: { ...STATS },
  reviews: { ...STATS },
});

export const Profile = ProfileModel as ModelStatic<
  Model<ProfileAttributes, ProfileCreationAttributes>
>;

// Association
User.hasOne(Profile, { foreignKey: "id", onDelete: "CASCADE", as: "profile" });
Profile.belongsTo(User, { foreignKey: "id", as: "user" });
