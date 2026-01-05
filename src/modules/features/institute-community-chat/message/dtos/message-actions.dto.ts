import { z } from "zod";
import { MessageModel } from "../message.model";

export const MessageCreateSchema = z.object({
  instituteId: MessageModel.fields.instituteId,
  body: MessageModel.fields.body,
  localId: MessageModel.fields.localId.default(null),
  replyingTo: MessageModel.fields.replyingTo.default(null),
});

export type MessageCreateDto = z.infer<typeof MessageCreateSchema>;

export const MessageUpdateSchema = MessageModel.dbSchema
  .pick({ body: true, localId: true })
  .partial()
  .extend({ id: MessageModel.fields.id });

export type MessageUpdateDto = z.infer<typeof MessageUpdateSchema>;

export const MessageDeleteSchema = z.object({
  id: MessageModel.fields.id,
});

export type MessageDeleteDto = z.infer<typeof MessageDeleteSchema>;
