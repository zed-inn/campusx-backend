import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { MessageGetPageSchema } from "./dtos/message-get.dto";
import { MessageController } from "./message.controller";
import {
  MessageCreateSchema,
  MessageDeleteSchema,
  MessageUpdateSchema,
} from "./dtos/message-actions.dto";
import { array } from "zod";
import { MessageSchema } from "./dtos/discussion-response.dto";

const router = new DetailedRouter("Institute Community Chat Messages");

router
  .describe("Get Messages", "Retrieve a paginated list of messages.")
  .query(MessageGetPageSchema)
  .output("messages", array(MessageSchema), "Messages fetched.")
  .get("/", MessageController.getMessages);

router
  .describe("Send Message", "Create and send a new message.")
  .userProfiled()
  .body(MessageCreateSchema)
  .output("message", MessageSchema, "Messaged.")
  .post("/", MessageController.createMessage);

router
  .describe("Update Message", "Edit the content of an existing message.")
  .userProfiled()
  .body(MessageUpdateSchema)
  .output("message", MessageSchema, "Message updated.")
  .patch("/", MessageController.updateMessage);

router
  .describe("Delete Message", "Remove a message.")
  .userProfiled()
  .query(MessageDeleteSchema)
  .output("message", MessageSchema, "Message deleted.")
  .delete("/", MessageController.deleteMessage);

export const MessageRouter = router;
