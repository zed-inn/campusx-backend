import { modelSchema } from "@shared/utils/model-schema";
import { User, UserModel } from "../user/user.model";
import { z } from "zod";
import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { DataTypes } from "sequelize";

export const WalletModel = modelSchema({
  id: UserModel.fields.id,
  balance: z.int("Invalid Balance").nonnegative("Invalid Balance"),
});

export type WalletAttributes = z.infer<typeof WalletModel.dbSchema>;
export type WalletCreationAttributes = Omit<
  z.infer<typeof WalletModel.dbFields>,
  never
>;

export const Wallet = defineModel<WalletAttributes, WalletCreationAttributes>(
  db,
  "User Wallet",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      primaryKey: true,
      unique: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
      defaultValue: 0,
    },
  }
);

// Associations
User.hasOne(Wallet, { foreignKey: "id", as: "wallet", onDelete: "CASCADE" });
Wallet.belongsTo(User, { foreignKey: "id", as: "user" });

export type WalletInstance = InstanceType<typeof Wallet>;
