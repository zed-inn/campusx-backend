import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Message, MessageInstance } from "./message.model";
import { MESSAGES_PER_PAGE } from "@config/constants/items-per-page";
import { ChatService } from "../chat/chat.service";
import {
  MessageCreateChatDto,
  MessageCreateUserDto,
} from "./dtos/message-action.dto";
import { Op } from "sequelize";
import { NotificationService } from "@modules/core/notifications";
import { ProfileService } from "@modules/core/profile";
import { limitText } from "@shared/utils/limit-text";
import { ChatInstance } from "../chat/chat.model";

class _MessageService extends BaseService<MessageInstance> {
  protected OFFSET = createOffsetFn(MESSAGES_PER_PAGE);

  constructor() {
    super(Message);
  }

  createByChatId = async (data: MessageCreateChatDto, userId: string) => {
    const { chatId, ...createData } = data;
    const chat = await ChatService.getById(chatId);
    ChatService.belongsTo(chat, userId);

    await MessageUtils.notifyOtherUser(chat, userId, createData.body);
    return await this.create({ ...createData, userId });
  };

  createByReceiverId = async (data: MessageCreateUserDto, userId: string) => {
    const { userId: receiverId, ...createData } = data;
    const chat = await ChatService.getByMembers(userId, receiverId);

    await MessageUtils.notifyOtherUser(chat, userId, createData.body);
    return await this.create({ ...createData, userId, chatId: chat.plain.id });
  };

  getChatMessages = async (
    chatId: string,
    timestamp: number | null,
    userId: string
  ) => {
    const chat = await ChatService.getById(chatId);
    ChatService.belongsTo(chat, userId);

    const messages = await Message.findAll({
      where: { chatId, updateDate: { [Op.gt]: timestamp ?? 0 } },
      limit: MESSAGES_PER_PAGE,
      order: [["updateDate", "desc"]],
    });

    return messages.map((m) => m.plain);
  };

  getLatest = async (userId: string, page: number) => {
    const chatIds = await ChatService.getIdsByUser(userId);

    const messages = await Message.findAll({
      where: { chatId: { [Op.in]: chatIds } },
      limit: MESSAGES_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["updateDate", "desc"]],
    });

    return messages.map((m) => m.plain);
  };
}

class MessageUtils {
  static notifyOtherUser = async (
    chat: ChatInstance,
    senderId: string,
    body: string
  ) => {
    const chatData = chat.plain;
    const notifiedUser = (
      await ProfileService.getById(
        chatData.userOneId === senderId
          ? chatData.userTwoId
          : chatData.userOneId
      )
    ).plain;
    await NotificationService.createNew(
      {
        type: "MESSAGE",
        title: `New Message by ${notifiedUser.fullName}${
          notifiedUser.username ? ` @${notifiedUser.username}` : ""
        }`,
        body: `${notifiedUser.fullName}: ${limitText(body)}`,
      },
      notifiedUser.id
    );
  };
}

export const MessageService = new _MessageService();
