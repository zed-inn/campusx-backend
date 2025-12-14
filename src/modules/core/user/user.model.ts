import db from "@config/database";
import { DataTypes, Model, ModelStatic } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "./user.interface";
import { PRIMARY_ID } from "@shared/utils/db-types";

const UserModel = db.define("User", {
  id: { ...PRIMARY_ID },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  passwordHash: { type: DataTypes.STRING, allowNull: true },
  fcmToken: { type: DataTypes.STRING, allowNull: true },
});

export const User = UserModel as ModelStatic<
  Model<UserAttributes, UserCreationAttributes>
>;
