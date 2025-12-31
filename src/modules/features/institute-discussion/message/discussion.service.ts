import { Includeable } from "sequelize";
import {
  Discussion,
  DiscussionAttributes,
  DiscussionInstance,
} from "./discussion.model";
import { Profile, ProfileAttributes } from "@modules/core/user-profile";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { DiscussionErrors } from "../discussion.errors";
import { MESSAGES_PER_PAGE } from "@config/constants/items-per-page";
import { DiscussionCreateDto } from "./dtos/discussion-create.dto";
import { DiscussionUpdateDto } from "./dtos/discussion-update.dto";

export class DiscussionService extends BaseService<
  DiscussionInstance,
  DiscussionAttributes
> {
  static OFFSET = createOffsetFn(MESSAGES_PER_PAGE);

  override get data() {
    return super.data as DiscussionAttributes & {
      writer: ProfileAttributes;
      parentMessage:
        | null
        | (DiscussionAttributes & { writer: ProfileAttributes });
    };
  }

  static create = async (data: DiscussionCreateDto, userId: string) => {
    const d = await Discussion.create({ ...data, userId });

    return this.getById(d.dataValues.id);
  };

  static getById = async (id: string) => {
    const discussion = await Discussion.findByPk(id, {
      include: [DiscussionInclude.writer, DiscussionInclude.parentMessage],
    });
    if (!discussion) throw DiscussionErrors.noDiscussionFound;

    return new DiscussionService(discussion);
  };

  static getByInstituteId = async (id: string, page: number) => {
    const discussions = await Discussion.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: MESSAGES_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [DiscussionInclude.writer, DiscussionInclude.parentMessage],
    });

    return discussions.map((d) => new DiscussionService(d));
  };

  static update = async (data: DiscussionUpdateDto, userId: string) => {
    const service = await this.getById(data.id);
    service.checkOwnership(userId);

    const discussion = service.model;
    await discussion.update({ message: data.message });

    return new DiscussionService(discussion);
  };

  static delete = async (id: string, userId: string) => {
    const service = await this.getById(id);
    service.checkOwnership(userId);

    const discussion = service.model;
    await discussion.destroy();
  };
}

class DiscussionInclude {
  static get writer(): Includeable {
    return { model: Profile, as: "writer" };
  }

  static get parentMessage(): Includeable {
    return { model: Discussion, as: "parentMessage", include: [this.writer] };
  }
}
