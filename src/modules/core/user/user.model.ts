import db from "@config/database";
import { DataTypes, Model, ModelStatic } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "./user.interface";
import { PRIMARY_ID } from "@shared/utils/primary-id";

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
  profiled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

export const User = UserModel as ModelStatic<
  Model<UserAttributes, UserCreationAttributes>
>;
