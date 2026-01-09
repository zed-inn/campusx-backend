import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Chat } from "../chat/chat.model";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";
import { MESSAGE } from "./message.constants";
import { Profile } from "@modules/core/profile/profile.model";

export const MessageModel = modelSchema({
  id: z.uuidv4("Invalid Message Id"),
  localId: z.string("Invalid Local Id").nullable(),
  senderId: z.uuidv4("Invalid Sender Id"),
  chatId: z.uuidv4("Invalid Chat Id"),
  body: z
    .string("Invalid Message")
    .min(MESSAGE.BODY.LENGTH.MIN, { error: "Message is too short" })
    .max(MESSAGE.BODY.LENGTH.MAX, { error: "Message is too long" }),
  status: z.enum(MESSAGE.STATUS._),
  createDateLocal: z.int().positive().nullable(),
});

export type MessageAttributes = z.infer<typeof MessageModel.dbSchema>;
export type MessageCreationAttributes = Omit<
  z.infer<typeof MessageModel.dbFields>,
  "id"
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
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [MESSAGE.BODY.LENGTH.MIN, MESSAGE.BODY.LENGTH.MAX],
        msg: `Message should be in between ${MESSAGE.BODY.LENGTH.MIN}-${MESSAGE.BODY.LENGTH.MAX} characters.`,
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    values: MESSAGE.STATUS._,
    defaultValue: MESSAGE.STATUS.Sent,
    allowNull: false,
  },
  createDateLocal: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
    get() {
      const rawValue = this.getDataValue("createDateLocal");
      return rawValue ? parseInt(rawValue as string, 10) : null;
    },
  },
});

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
Message.belongsTo(Profile, { foreignKey: "senderId", as: "sender" });

export type MessageInstance = InstanceType<typeof Message>;
