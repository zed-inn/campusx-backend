import { MessageModel } from "../message.model";
import { z } from "zod";

export const MessageSchema = MessageModel.dbSchema;

export type MessageDto = z.infer<typeof MessageSchema>;
