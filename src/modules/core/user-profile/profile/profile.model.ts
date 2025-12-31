import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { User } from "@modules/core/user";
import { STATS } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { DOB, FULLNAME, GENDER, USERNAME } from "./profile.constants";

export const ProfileModel = modelSchema({
  id: z.uuidv4("Invalid Profile Id"),
  username: z
    .string("Invalid Username")
    .min(USERNAME.MIN, { error: "Username is too short" })
    .max(USERNAME.MAX, { error: "Username is too long" })
    .nullable(),
  fullName: z
    .string("Invalid Fullname")
    .min(FULLNAME.MIN, { error: "Fullname is too short" })
    .max(FULLNAME.MAX, { error: "Fullname is too long" }),
  about: z.string("Invalid About").nullable(),
  avatarUrl: z.url("Invalid Avatar Url").nullable(),
  gender: z.enum(GENDER._, { error: "Invalid Gender" }).nullable(),
  dob: z
    .number("Invalid Dob")
    .nonnegative("Dob cannot be negative")
    .min(DOB.MIN, { error: "You haven't lived that long!!" })
    .max(DOB.MAX, { error: "You are from future!!" })
    .nullable(),
  followersCount: z
    .number("Invalid Followers")
    .nonnegative("Invalid Followers")
    .default(0),
  followingCount: z
    .number("Invalid Following")
    .nonnegative("Invalid Following")
    .default(0),
});

export type ProfileAttributes = z.infer<typeof ProfileModel.dbSchema>;
export type ProfileCreationAttributes = Omit<
  z.infer<typeof ProfileModel.dbFields>,
  "referralCode" | "followersCount" | "followingCount"
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
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: {
        args: [USERNAME.MIN, USERNAME.MAX],
        msg: `Username should be within length of ${USERNAME.MIN}-${USERNAME.MAX} characters.`,
      },
    },
  },
  fullName: {
    type: DataTypes.STRING(FULLNAME.MAX),
    allowNull: false,
    validate: {
      len: {
        args: [FULLNAME.MIN, FULLNAME.MAX],
        msg: `Full Name should be within length of ${FULLNAME.MIN}-${FULLNAME.MAX} characters.`,
      },
    },
  },
  about: { type: DataTypes.STRING, allowNull: true },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isUrl: true },
  },
  gender: { type: DataTypes.STRING, values: GENDER._, allowNull: true },
  dob: {
    type: DataTypes.BIGINT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("dob");
      return rawValue ? parseInt(rawValue as string, 10) : null;
    },
    validate: { min: DOB.MIN, max: DOB.MAX },
  },
  followersCount: { ...STATS },
  followingCount: { ...STATS },
});

// Associations
User.hasOne(Profile, { foreignKey: "id", onDelete: "CASCADE", as: "profile" });
Profile.belongsTo(User, { foreignKey: "id", as: "user" });

export type ProfileInstance = InstanceType<typeof Profile>;
