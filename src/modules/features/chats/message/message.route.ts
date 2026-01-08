import {
  MessageGetChatSchema,
  MessageGetLatestSchema,
} from "./dtos/message-get.dto";
import { MessageController } from "./message.controller";
import {
  MessageCreateChatSchema,
  MessageCreateUserSchema,
} from "./dtos/message-action.dto";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { array } from "zod";
import { MessageChatSchema, MessageSchema } from "./dtos/message-response.dto";

const router = new DetailedRouter("Chat Messages");

router
  .describe("Get chat messages", "Get messages of a chat")
  .userProfiled()
  .query(MessageGetChatSchema)
  .output("messages", array(MessageSchema), "Messages.")
  .get("/", MessageController.getMessages);

router
  .describe("Send Message: Chat", "Send message in a chat")
  .userProfiled()
  .body(MessageCreateChatSchema)
  .output("message", MessageSchema, "Messaged.")
  .post("/", MessageController.sendMessageInChat);

router
  .describe("Send Message: User", "Send message to a user if not knowing chat")
  .userProfiled()
  .body(MessageCreateUserSchema)
  .output("message", MessageChatSchema, "Messaged.")
  .post("/user", MessageController.sendMessageToUser);

router
  .describe("Get chat messages", "Get messages of a chat")
  .userProfiled()
  .query(MessageGetLatestSchema)
  .output("messages", array(MessageSchema), "Messages.")
  .get("/latest", MessageController.getLatestMessages);

export const MessageRouter = router;
