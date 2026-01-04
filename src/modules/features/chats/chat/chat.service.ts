import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Chat, ChatInstance } from "../chat/chat.model";
import { Op } from "sequelize";
import { ChatErrors } from "../chat.errors";
import { ChatCreateDto } from "./dtos/chat-create.dto";
import { CHATS_PER_PAGE } from "@config/constants/items-per-page";

class _ChatService extends BaseService<ChatInstance> {
  protected OFFSET = createOffsetFn(CHATS_PER_PAGE);

  constructor() {
    super(Chat);
  }

  createNew = async (data: ChatCreateDto) => {
    try {
      return await this.getByMembers(data.userOne, data.userTwo);
    } catch {
      return await this.create(data);
    }
  };

  getByMembers = async (userOne: string, userTwo: string) => {
    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { userOne, userTwo },
          { userOne: userTwo, userTwo: userOne },
        ],
      },
    });
    if (!chat) throw ChatErrors.noChatFound;

    return chat;
  };

  getActiveChatsOfUser = async (userId: string, page: number) => {
    const chats = await Chat.findAll({
      where: { [Op.or]: [{ userOne: userId }, { userTwo: userId }] },
      offset: this.OFFSET(page),
      limit: CHATS_PER_PAGE,
      order: [["updateDate", "desc"]],
    });

    return chats.map((c) => c.plain);
  };

  getAllChatsOfUser = async (userId: string) => {
    const chats = await Chat.findAll({
      where: { [Op.or]: [{ userOne: userId }, { userTwo: userId }] },
    });

    return chats.map((c) => c.plain);
  };

  makeActiveById = async (id: string) => {
    await Chat.update(
      { randomUpdate: Date.now().toString() },
      { where: { id } }
    );
  };
}

export const ChatService = new _ChatService();
