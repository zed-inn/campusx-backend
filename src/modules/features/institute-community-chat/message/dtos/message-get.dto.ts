import { MessageModel } from "../message.model";
import { z } from "zod";

export const MessageGetPageSchema = z.object({
  instituteId: MessageModel.fields.instituteId,
});

export type MessageGetPageDto = z.infer<typeof MessageGetPageSchema>;
