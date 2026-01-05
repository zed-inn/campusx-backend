import { GlobalSchema } from "@shared/dtos/global.dto";
import { MessageModel } from "../message.model";
import { z } from "zod";

export const MessageGetPageSchema = z.object({
  instituteId: MessageModel.fields.instituteId,
  page: GlobalSchema.fields.page,
});

export type MessageGetPageDto = z.infer<typeof MessageGetPageSchema>;
