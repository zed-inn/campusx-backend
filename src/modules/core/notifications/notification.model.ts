import { DataTypes } from "sequelize";
import { NOTIFICATION } from "./notification.constants";
import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { User } from "../user";
import { PRIMARY_ID } from "@shared/utils/db-types";

export const NotificationModel = modelSchema({
  id: z.uuidv4("Invalid Id"),
  userId: z.uuidv4("Invalid User Id"),
  title: z.string("Invalid Notification Title"),
  body: z.string("Invalid Notification Body").nullable(),
  type: z.enum(Object.values(NOTIFICATION.TYPES._), {
    error: "Invalid Notification Type",
  }),
});

export type NotificationAttributes = z.infer<typeof NotificationModel.dbSchema>;
export type NotificationCreationAttributes = Omit<
  z.infer<typeof NotificationModel.dbFields>,
  "id"
>;

export const Notification = defineModel<
  NotificationAttributes,
  NotificationCreationAttributes
>(db, "UserNotification", {
  id: { ...PRIMARY_ID },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  title: { type: DataTypes.TEXT, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  type: {
    type: DataTypes.STRING,
    values: Object.values(NOTIFICATION.TYPES._),
    allowNull: false,
  },
});

// Associations
User.hasMany(Notification, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "notifications",
});
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

export type NotificationInstance = InstanceType<typeof Notification>;
