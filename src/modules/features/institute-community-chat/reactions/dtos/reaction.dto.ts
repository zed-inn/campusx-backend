import { z } from "zod";
import { MessageModel } from "../../message/message.model";

export const ReactActionSchema = z.object({
  messageId: MessageModel.fields.id,
});

export type ReactActionDto = z.infer<typeof ReactActionSchema>;
