import db from "@config/database";
import { DataTypes } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "./user.interface";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";

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
  }
);
