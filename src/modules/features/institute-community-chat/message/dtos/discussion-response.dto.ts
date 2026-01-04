import { z } from "zod";
import { ShortUserSchema } from "@modules/core/profile";
import { MessageModel } from "../message.model";

export const MessageSchema = MessageModel.dbSchema.extend({
  writer: ShortUserSchema,
  stats: z
    .object({ likes: z.number().nonnegative().default(0) })
    .default({ likes: 0 }),
  isLiked: z.boolean().default(false),
});

export type MessageDto = z.infer<typeof MessageSchema>;
