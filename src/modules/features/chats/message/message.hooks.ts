import { ProfileService } from "@modules/core/profile";
import { ChatService } from "../chat/chat.service";
import { Message } from "./message.model";
import { NotificationService } from "@modules/core/notifications";
import { limitText } from "@shared/utils/limit-text";

export const MessageHooks = () => {
  // Hooks
  Message.afterCreate(async (message) => {
    const m = message.plain;
    const c = (await ChatService.getById(m.chatId)).plain;
    const nu = (
      await ProfileService.getById(
        c.userOneId === m.senderId ? c.userTwoId : c.userOneId
      )
    ).plain;

    await NotificationService.createNew(
      {
        type: "MESSAGE",
        title: `New Message by ${nu.fullName}${
          nu.username ? ` (@${nu.username})` : ""
        }`,
        body: `${nu.fullName}: ${limitText(m.body)}`,
      },
      nu.id
    );
  });
};
