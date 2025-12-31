import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Chat, ChatAttributes, ChatInstance } from "../chat/chat.model";
import { Includeable, Op } from "sequelize";
import { ChatErrors } from "../chat.errors";
import { Profile, ProfileAttributes } from "@modules/core/user-profile";
import { uuidv4 } from "zod";
import { ChatCreateDto } from "./dtos/chat-create.dto";

export class ChatService extends BaseService<ChatInstance, ChatAttributes> {
  static CHATS_PER_PAGE = 30;
  static OFFSET = createOffsetFn(this.CHATS_PER_PAGE);

  override get data() {
    return super.data as ChatAttributes & {
      userOneProfile: ProfileAttributes;
      userTwoProfile: ProfileAttributes;
    };
  }

  static create = async (data: ChatCreateDto) => {
    try {
      return this.getByUsers(data.userOne, data.userTwo);
    } catch {
      const c = await Chat.create({ ...data });
      return this.getById(c.dataValues.id);
    }
  };

  static getById = async (id: string) => {
    const chat = await Chat.findByPk(id, {
      include: [ChatInclude.userOne, ChatInclude.userTwo],
    });
    if (!chat) throw ChatErrors.noChatFound;

    return new ChatService(chat);
  };

  static getByUsers = async (userOne: string, userTwo: string) => {
    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { userOne, userTwo },
          { userOne: userTwo, userTwo: userOne },
        ],
      },
      include: [ChatInclude.userOne, ChatInclude.userTwo],
    });
    if (!chat) throw ChatErrors.noChatFound;

    return new ChatService(chat);
  };

  static getActive = async (userId: string, page: number) => {
    const chats = await Chat.findAll({
      where: { [Op.or]: [{ userOne: userId }, { userTwo: userId }] },
      offset: this.OFFSET(page),
      limit: this.CHATS_PER_PAGE,
      include: [ChatInclude.userOne, ChatInclude.userTwo],
      order: [["updateDate", "desc"]],
    });

    return chats.map((c) => new ChatService(c));
  };

  static getAllRelated = async (userId: string) => {
    const chats = await Chat.findAll({
      where: { [Op.or]: [{ userOne: userId }, { userTwo: userId }] },
      include: [ChatInclude.userOne, ChatInclude.userTwo],
    });

    return chats.map((c) => new ChatService(c));
  };

  makeActive = async () => {
    await this.model.update({ randomUpdate: uuidv4() });
  };
}

class ChatInclude {
  static get userOne(): Includeable {
    return { model: Profile, as: "userOneProfile" };
  }

  static get userTwo(): Includeable {
    return { model: Profile, as: "userTwoProfile" };
  }
}
