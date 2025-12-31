import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Chat } from "../chat/chat.model";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";
import { MESSAGE_STATUS } from "./message.constants";
import { Profile } from "@modules/core/user-profile";

export const MessageModel = modelSchema({
  id: z.uuidv4("Invalid Message Id"),
  localId: z.string("Invalid Local Id").nullable().default(null),
  chatId: z.uuidv4("Invalid Chat Id"),
  senderId: z.uuidv4("Invalid Sender Id"),
  message: z
    .string("Invalid Message")
    .min(1, { error: "Message is too short" }),
  status: z.enum(MESSAGE_STATUS._).default(MESSAGE_STATUS.Sending),
  deletedBySender: z.boolean().default(false),
  deletedByReceiver: z.boolean().default(false),
});

export type MessageAttributes = z.infer<typeof MessageModel.dbSchema>;
export type MessageCreationAttributes = Omit<
  z.infer<typeof MessageModel.dbFields>,
  "id" | "deletedBySender" | "deletedByReceiver"
>;

export const Message = defineModel<
  MessageAttributes,
  MessageCreationAttributes
>(db, "ChatMessage", {
  id: { ...PRIMARY_ID },
  localId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Chat, key: "id" },
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Profile, key: "id" },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [1, Infinity],
        msg: "Message is too short",
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    values: MESSAGE_STATUS._,
    defaultValue: MESSAGE_STATUS.Sent,
    allowNull: false,
  },
  deletedBySender: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deletedByReceiver: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export type MessageInstance = InstanceType<typeof Message>;

// Associations
Chat.hasMany(Message, {
  foreignKey: "chatId",
  onDelete: "CASCADE",
  as: "messages",
});
Message.belongsTo(Chat, { foreignKey: "chatId", as: "chat" });

Profile.hasMany(Message, {
  foreignKey: "senderId",
  onDelete: "CASCADE",
  as: "messages",
});
Message.belongsTo(Profile, { foreignKey: "senderId", as: "writer" });
