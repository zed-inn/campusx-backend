import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Chat, ChatCreationAttributes, ChatInstance } from "../chat/chat.model";
import { Op } from "sequelize";
import { CHATS_PER_PAGE } from "@config/constants/items-per-page";
import { ChatCreateDto } from "./dtos/chat-action.dto";
import { DB_Errors } from "@shared/errors/db-errors";
import { ExtendedModel } from "@shared/utils/define-model";

class _ChatService extends BaseService<ChatInstance> {
  protected OFFSET = createOffsetFn(CHATS_PER_PAGE);

  constructor() {
    super(Chat);
  }

  getOrCreate = async (
    data: ChatCreateDto | Omit<ChatCreateDto, "localId">
  ) => {
    try {
      return await this.getByMembers(data.userOneId, data.userTwoId);
    } catch {
      return await this.create(data);
    }
  };

  getByMembers = async (userOneId: string, userTwoId: string) => {
    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { userOneId, userTwoId },
          { userOneId: userTwoId, userTwoId: userOneId },
        ],
      },
    });
    if (!chat) throw DB_Errors.notFound;

    return chat;
  };

  getActiveChatsOfUser = async (userId: string, timestamp: number | null) => {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ userOneId: userId }, { userTwoId: userId }],
        updateDate: { [Op.gt]: timestamp ?? 0 },
      },
      limit: CHATS_PER_PAGE,
      order: [["updateDate", "asc"]],
    });

    return chats.map((c) => c.plain);
  };

  getIdsByUser = async (userId: string) => {
    const chats = await Chat.findAll({
      where: { [Op.or]: [{ userOneId: userId }, { userTwoId: userId }] },
    });

    return chats.map((c) => c.dataValues.id);
  };

  belongsTo = (
    obj: ChatInstance | Record<string, any>,
    value: any,
    keys: string | string[] = ["userOneId", "userTwoId"]
  ) => {
    this.checkOwnership(obj, value, keys);
  };
}

export const ChatService = new _ChatService();
