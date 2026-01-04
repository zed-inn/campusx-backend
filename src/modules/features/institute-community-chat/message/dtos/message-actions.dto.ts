import { MessageModel } from "../message.model";
import { z } from "zod";

export const MessageCreateSchema = MessageModel.dbSchema
  .pick({ body: true, replyingTo: true, instituteId: true })
  .extend({ localId: MessageModel.fields.localId.default(null) });

export type MessageCreateDto = z.infer<typeof MessageCreateSchema>;

export const MessageUpdateSchema = MessageModel.dbSchema
  .pick({ body: true, replyingTo: true })
  .partial()
  .extend(MessageModel.dbSchema.pick({ id: true }).shape);

export type MessageUpdateDto = z.infer<typeof MessageUpdateSchema>;

export const MessageDeleteSchema = z.object({
  messageId: MessageModel.fields.id,
});

export type MessageDeleteDto = z.infer<typeof MessageDeleteSchema>;
