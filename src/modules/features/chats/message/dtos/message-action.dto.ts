import { z } from "zod";
import { MessageModel } from "../message.model";
import { UserModel } from "@modules/core/user";

export const MessageCreateSchema = z.object({
  localId: MessageModel.fields.localId.default(null),
  chatId: MessageModel.fields.chatId.nullable().optional(),
  userId: UserModel.fields.id.nullable().optional(),
  body: MessageModel.fields.body,
  createDateLocal: MessageModel.fields.createDateLocal.default(null),
});

export type MessageCreateDto = z.infer<typeof MessageCreateSchema>;

export const MessageReceivedSchema = z.object({
  ids: z.array(MessageModel.fields.id),
});

export type MessageReceivedDto = z.infer<typeof MessageReceivedSchema>;

export const MessageUpdateSchema = MessageModel.dbSchema
  .pick({ localId: true, body: true })
  .partial()
  .extend({ id: MessageModel.fields.id });

export type MessageUpdateDto = z.infer<typeof MessageUpdateSchema>;

export const MessageDeleteSchema = z.object({
  id: MessageModel.fields.id,
});

export type MessageDeleteDto = z.infer<typeof MessageDeleteSchema>;
