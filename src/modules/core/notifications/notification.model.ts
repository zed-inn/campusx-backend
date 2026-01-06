import { DataTypes } from "sequelize";
import {
  NotificationAttributes,
  NotificationCreationAttributes,
} from "./notification.interface";
import { NOTIFICATION_CONFIG } from "./notification.config";

export const Notification = defineModel<
  NotificationAttributes,
  NotificationCreationAttributes
>(db, "Notification", {
  id: { ...PRIMARY_ID },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: true },
  type: {
    type: DataTypes.STRING,
    values: Object.values(NOTIFICATION_CONFIG.TYPES),
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
