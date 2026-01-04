import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile";
import { Institute } from "@modules/core/institutes";

import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { MESSAGE } from "./message.constants";

export const MessageModel = modelSchema({
  id: z.uuidv4("Invalid Message Id"),
  localId: z.string("Invalid Local Id").nullable(),
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  body: z
    .string("Invalid Message")
    .min(MESSAGE.BODY.LENGTH.MIN, {
      error: "Message must contain one letter atleast",
    })
    .min(MESSAGE.BODY.LENGTH.MAX, { error: "Message is too long" }),
  replyingTo: z.uuidv4("Invalid Message Id To Reply").nullable(),
});

export type MessageAttributes = z.infer<typeof MessageModel.dbSchema>;
export type MessageCreationAttributes = Omit<
  z.infer<typeof MessageModel.dbFields>,
  "id"
>;

export const Message = defineModel<
  MessageAttributes,
  MessageCreationAttributes
>(db, "InstituteMessage", {
  id: { ...PRIMARY_ID },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Profile, key: "id" },
  },
  instituteId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Institute, key: "id" },
  },
  message: { type: DataTypes.STRING, allowNull: false },
  replyingTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: "InstituteMessages", key: "id" },
  },
});

// Associations
Institute.hasMany(Message, {
  foreignKey: "instituteId",
  onDelete: "CASCADE",
  as: "messages",
});
Message.belongsTo(Institute, { foreignKey: "instituteId", as: "institute" });

Profile.hasMany(Message, { foreignKey: "userId", onDelete: "CASCADE" });
Message.belongsTo(Profile, { foreignKey: "userId", as: "writer" });

Message.hasMany(Message, {
  foreignKey: "replyingTo",
  onDelete: "CASCADE",
  as: "replies",
});
Message.belongsTo(Message, {
  foreignKey: "replyingTo",
  as: "parentMessage",
});

export type MessageInstance = InstanceType<typeof Message>;
