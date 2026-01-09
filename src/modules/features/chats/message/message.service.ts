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
import { MESSAGE } from "./message.constants";
import db from "@config/database";

class _MessageService extends BaseService<MessageInstance> {
  protected OFFSET = createOffsetFn(MESSAGES_PER_PAGE);

  constructor() {
    super(Message);
  }

  createByChatId = async (data: MessageCreateChatDto, userId: string) => {
    const { chatId, ...createData } = data;
    const chat = await ChatService.getById(chatId);
    ChatService.belongsTo(chat, userId);

    return await this.create({ ...createData, senderId: userId, chatId });
  };

  createByReceiverId = async (data: MessageCreateUserDto, userId: string) => {
    const { userId: receiverId, ...createData } = data;
    const chat = await ChatService.getOrCreate({
      userOneId: userId,
      userTwoId: data.userId,
    });

    return await this.create({
      ...createData,
      senderId: userId,
      chatId: chat.plain.id,
    });
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

  updateStatusByIds = async (
    ids: string[],
    status: (typeof MESSAGE.STATUS._)[number]
  ) => {
    return await db.transaction(async () => {
      await Message.update({ status }, { where: { id: { [Op.in]: ids } } });
      return await this.getByIds(ids);
    });
  };
}

export const MessageService = new _MessageService();
