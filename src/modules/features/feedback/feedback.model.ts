import { defineModel } from "@shared/utils/define-model";
import {
  FeedbackAttributes,
  FeedbackCreationAttributes,
} from "./feedback.interface";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile";
import { FEEDBACK_CONFIG } from "./feedback.config";

export const Feedback = defineModel<
  FeedbackAttributes,
  FeedbackCreationAttributes
>(db, "Feedback", {
  id: { ...PRIMARY_ID },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: null,
    references: { model: Profile, key: "id" },
  },
  message: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.STRING,
    defaultValue: FEEDBACK_CONFIG.STATUS.PENDING,
    allowNull: false,
  },
});

export type FeedbackInstance = InstanceType<typeof Feedback>;

// Associations
Profile.hasMany(Feedback, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  as: "feedbacks",
});
Feedback.belongsTo(Profile, { foreignKey: "userId", as: "writer" });
