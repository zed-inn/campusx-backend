import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Message, MessageAttributes, MessageInstance } from "./message.model";
import { MESSAGES_PER_PAGE } from "@config/constants/items-per-page";
import { ChatService } from "../chat/chat.service";
import { MessageCreateDto, MessageUpdateDto } from "./dtos/message-action.dto";
import { Op } from "sequelize";
import { MESSAGE } from "./message.constants";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";
import { AppError } from "@shared/errors/app-error";

class _MessageService extends BaseService<MessageInstance> {
  protected OFFSET = createOffsetFn(MESSAGES_PER_PAGE);

  constructor() {
    super(Message);
  }

  createByChatId = async (data: MessageCreateDto, userId: string) => {
    if (!data.chatId) throw new AppError("No chatId given", 400);

    const { chatId, ...createData } = data;
    const chat = await ChatService.getById(chatId);
    ChatService.belongsTo(chat, userId);

    return await this.create({ ...createData, senderId: userId, chatId });
  };

  createByReceiverId = async (data: MessageCreateDto, userId: string) => {
    if (!data.userId) throw new AppError("No userId given", 400);

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

  getLatest = async (userId: string, timestamp: number | null) => {
    const chatIds = await ChatService.getIdsByUser(userId);

    const messages = await Message.findAll({
      where: {
        chatId: {
          [Op.in]: chatIds,
          ...(timestamp ? { updateDate: { [Op.gt]: timestamp } } : {}),
        },
      },
      limit: MESSAGES_PER_PAGE,
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

  update = async (data: MessageUpdateDto, userId: string) => {
    const { id, ...updateDate } = data;

    return await db.transaction(async () => {
      const message = await this.getById(id);
      this.checkOwnership(message, userId, "senderId");

      const cleanData = removeUndefined(updateDate);
      if (hasKeys(cleanData))
        await message.update({
          ...updateDate,
          status: "Sent",
        } as Partial<MessageAttributes>);

      return message;
    });
  };
}

export const MessageService = new _MessageService();
