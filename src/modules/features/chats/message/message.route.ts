import {
  MessageGetChatSchema,
  MessageGetLatestSchema,
} from "./dtos/message-get.dto";
import { MessageController } from "./message.controller";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { array } from "zod";
import { MessageSchema } from "./dtos/message-response.dto";

const router = new DetailedRouter("Chat Messages");

router
  .describe("Get chat messages", "Get messages of a chat")
  .userProfiled()
  .query(MessageGetChatSchema)
  .output("messages", array(MessageSchema), "Messages.")
  .get("/", MessageController.getMessages);

router
  .describe("Get initial messages", "Get messages of a chat")
  .userProfiled()
  .query(MessageGetLatestSchema)
  .output("messages", array(MessageSchema), "Messages.")
  .get("/latest", MessageController.getLatestMessages);

export const MessageRouter = router;
