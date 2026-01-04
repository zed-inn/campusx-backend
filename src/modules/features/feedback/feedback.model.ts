import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { User } from "@modules/core/user";
import { FEEDBACK } from "./feedback.constants";
import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const FeedbackModel = modelSchema({
  id: z.uuidv4("Invalid Feedback Id"),
  userId: z.uuidv4("Invalid User Id").nullable(),
  message: z
    .string("Invalid Message")
    .min(FEEDBACK.MESSAGE.LENGTH.MIN, { error: "Message is too short" })
    .max(FEEDBACK.MESSAGE.LENGTH.MAX, { error: "Message is too long" }),
  platformUsed: z.enum(FEEDBACK.PLATFORMS._, { error: "Invalid platform" }),
  status: z.enum(FEEDBACK.STATUS._, { error: "Invalid Status" }),
});

export type FeedbackAttributes = z.infer<typeof FeedbackModel.dbSchema>;
export type FeedbackCreationAttributes = Omit<
  z.infer<typeof FeedbackModel.dbFields>,
  "id" | "status"
>;

export const Feedback = defineModel<
  FeedbackAttributes,
  FeedbackCreationAttributes
>(db, "Feedback", {
  id: { ...PRIMARY_ID },
  userId: {
    type: DataTypes.UUID,
    references: { model: User, key: "id" },
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [FEEDBACK.MESSAGE.LENGTH.MIN, FEEDBACK.MESSAGE.LENGTH.MAX],
        msg: "Invalid Message",
      },
    },
  },
  platformUsed: {
    type: DataTypes.STRING,
    allowNull: false,
    values: FEEDBACK.PLATFORMS._,
    defaultValue: FEEDBACK.PLATFORMS.MOBILE_APP,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    values: FEEDBACK.STATUS._,
    defaultValue: FEEDBACK.STATUS.PENDING,
  },
});

// Associations
User.hasMany(Feedback, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  as: "feedbacks",
});
Feedback.belongsTo(User, { foreignKey: "userId", as: "user" });

export type FeedbackInstance = InstanceType<typeof Feedback>;
