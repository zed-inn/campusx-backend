import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import {
  Message,
  MessageAttributes,
  MessageInstance,
} from "./message.model";
import { ChatErrors } from "../chat.errors";
import db from "@config/database";
import { MESSAGES_PER_PAGE } from "@config/constants/items-per-page";
import { MESSAGE_STATUS } from "./message.constants";
import { AppError } from "@shared/errors/app-error";
import { ChatService } from "../chat/chat.service";

export class MessageService extends BaseService<
  MessageInstance,
  MessageAttributes
> {
  static OFFSET = createOffsetFn(MESSAGES_PER_PAGE);

  static create = async (
    localId: string,
    message: string,
    user: { sender: string; reciever: string | null },
    chatId: string | null
  ) => {
    if (!user && !chatId) throw new AppError("Chat or user are required", 400);

    return await db.transaction(async () => {
      let chat: ChatService | null = null;
      if (chatId) {
        chat = await ChatService.getById(chatId);
        if (
          chat.data.userOne !== user.sender &&
          chat.data.userTwo !== user.sender
        )
          throw new AppError("Invalid Request", 400);
      } else if (user.reciever)
        chat = await ChatService.create({
          localId: null,
          userOne: user.sender,
          userTwo: user.reciever,
        });
      if (!chat) throw new AppError("Invalid Chat Id", 400);

      await chat.makeActive();

      const m = await Message.create({
        senderId: user.sender,
        message,
        localId,
        chatId: chat.data.id,
        status: MESSAGE_STATUS.Sent,
      });

      return new MessageService(m);
    });
  };

  static getById = async (id: string) => {
    const message = await Message.findByPk(id);
    if (!message) throw ChatErrors.noMessageFound;

    return new MessageService(message);
  };

  static getByChatId = async (id: string, page: number, userId: string) => {
    const service = await ChatService.getById(id);
    service.checkOwnership(userId, ["userOne", "userTwo"]);

    const messages = await Message.findAll({
      where: { chatId: id },
      offset: this.OFFSET(page),
      limit: MESSAGES_PER_PAGE,
      order: [["updateDate", "desc"]],
    });

    return messages.map((m) => new MessageService(m));
  };

  static getLatest = async (userId: string, page: number) => {
    const services = await ChatService.getAllRelated(userId);
    const chatIds = services.map((s) => s.data.id);

    const messages = await Message.findAll({
      where: { chatId: chatIds },
      limit: MESSAGES_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["updateDate", "desc"]],
    });

    return messages.map((m) => new MessageService(m));
  };

  static deleteByUser = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const service = await this.getById(id);
      const chatService = await ChatService.getById(service.data.chatId);
      chatService.checkOwnership(userId, ["userOne", "userTwo"]);

      const message = service.model;
      const key =
        userId === service.data.senderId
          ? "deletedBySender"
          : "deletedByReceiver";
      await message.update({ [key]: true });
    });
  };
}
