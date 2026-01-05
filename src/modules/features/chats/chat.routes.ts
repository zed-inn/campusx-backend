import { MessageRouter } from "./message/message.route";
import { ChatRouter } from "./chat/chat.route";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Chats");

router.use("/", ChatRouter);

router.use("/message", MessageRouter);

export const ChatsRouter = router;
