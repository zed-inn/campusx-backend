import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { MESSAGES_PER_PAGE } from "@config/constants/items-per-page";
import { Message, MessageAttributes, MessageInstance } from "./message.model";
import { MessageCreateDto, MessageUpdateDto } from "./dtos/message-actions.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";

class _MessageService extends BaseService<MessageInstance> {
  protected OFFSET = createOffsetFn(MESSAGES_PER_PAGE);

  constructor() {
    super(Message);
  }

  createNew = async (data: MessageCreateDto, userId: string) => {
    return await this.create({ ...data, userId });
  };

  getByInstituteId = async (id: string, page: number) => {
    const messages = await Message.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: MESSAGES_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return messages.map((m) => m.plain);
  };

  update = async (data: MessageUpdateDto, userId: string) => {
    const { id, ...updateData } = data;
    const message = await this.getById(id);
    this.checkOwnership(message, userId);

    const cleanData = removeUndefined(updateData);
    if (hasKeys(cleanData))
      await message.update(cleanData as Partial<MessageAttributes>);

    return message;
  };
}

export const MessageService = new _MessageService();
