import { defineModel } from "@shared/utils/define-model";

import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/user-profile";
import { STATUS } from "./feedback.constants";

import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const FeedbackModel = modelSchema({
  id: z.uuidv4("Invalid Feedback Id"),
  userId: z.uuidv4("Invalid User Id").nullable().default(null),
  message: z.string("Invalid Message"),
  status: z
    .enum(STATUS._, {
      error: "Invalid Status",
    })
    .default(STATUS.PENDING),
});

export type FeedbackAttributes = z.infer<typeof FeedbackModel.dbSchema>;
export type FeedbackCreationAttributes = Omit<
  z.infer<typeof FeedbackModel.dbFields>,
  "id"
>;

export const Feedback = defineModel<
  FeedbackAttributes,
  FeedbackCreationAttributes
>(db, "Feedback", {
  id: { ...PRIMARY_ID },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Profile, key: "id" },
  },
  message: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.STRING,
    values: STATUS._,
    defaultValue: STATUS.PENDING,
    allowNull: false,
  },
});

// Associations
Profile.hasMany(Feedback, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  as: "feedbacks",
});
Feedback.belongsTo(Profile, { foreignKey: "userId", as: "writer" });

export type FeedbackInstance = InstanceType<typeof Feedback>;
