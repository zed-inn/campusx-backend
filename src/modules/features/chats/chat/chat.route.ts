import { ChatGetActiveSchema } from "./dtos/chat-get.dto";
import { ChatController } from "./chat.controller";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { array } from "zod";
import { ChatSchema } from "./dtos/chat-response.dto";

const router = new DetailedRouter("Chat/DM");

router
  .describe("Get active chats", "Get chats in order of latest activity")
  .userProfiled()
  .query(ChatGetActiveSchema)
  .output("chats", array(ChatSchema), "Chats.I")
  .get("/active", ChatController.getActiveChats);

export const ChatRouter = router;
