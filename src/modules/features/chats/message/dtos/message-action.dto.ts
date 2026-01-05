import { z } from "zod";
import { MessageModel } from "../message.model";
import { ProfileModel } from "@modules/core/profile";

export const MessageCreateChatSchema = z.object({
  localId: MessageModel.fields.localId.default(null),
  chatId: MessageModel.fields.chatId,
  body: MessageModel.fields.body,
});

export type MessageCreateChatDto = z.infer<typeof MessageCreateChatSchema>;

export const MessageCreateUserSchema = MessageCreateChatSchema.omit({
  chatId: true,
}).extend({ userId: ProfileModel.fields.id });

export type MessageCreateUserDto = z.infer<typeof MessageCreateUserSchema>;

export const MessageUpdateSchema = MessageModel.dbSchema
  .pick({ localId: true, body: true })
  .partial()
  .extend({ id: MessageModel.fields.id });

export type MessageUpdateDto = z.infer<typeof MessageUpdateSchema>;

export const MessageDeleteSchema = z.object({
  id: MessageModel.fields.id,
});

export type MessageDeleteDto = z.infer<typeof MessageDeleteSchema>;
