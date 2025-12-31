import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { Router } from "express";
import { ChatController } from "./chat/chat.controller";
import { MessageController } from "./messages/message.controller";
import { mount } from "@shared/utils/mount-router";

const router = Router();

router.get(
  "/all",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ChatController.getActiveChats
);

router.get(
  "/messages",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  MessageController.getMessages
);

router.get(
  "/messages/initial",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  MessageController.getInitialMessages
);

export const ChatRouter = mount("/chat", router);
