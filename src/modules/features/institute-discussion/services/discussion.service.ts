import { Includeable } from "sequelize";
import { Discussion, DiscussionInstance } from "../models/discussion.model";
import { Profile, ProfileInclude, ProfileService } from "@modules/core/profile";
import { Institute } from "@modules/core/institutes";
import { DiscussionCreateDto } from "../dtos/service/discussion-create.dto";
import { DiscussionUpdateDto } from "../dtos/service/discussion-update.dto";
import { Like } from "../models/like.model";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Rui } from "@shared/dtos/req-user.dto";
import { DiscussionSchema } from "../dtos/service/discussion-schema.dto";
import { DiscussionErrors } from "../discussion.errors";

export class DiscussionService extends BaseService<DiscussionInstance> {
  static DISCUSSIONS_PER_PAGE = 200;
  static OFFSET = createOffsetFn(this.DISCUSSIONS_PER_PAGE);

  override get data() {
    const disc = super.data;
    disc.writer = ProfileService.parse(disc.writer);
    disc.parentMessage = DiscussionSchema.parse(disc.parentMessage);
    disc.isLiked = Array.isArray(disc.likes) && disc.likes.length;

    return DiscussionSchema.parse(disc);
  }

  static create = async (data: DiscussionCreateDto, userId: string) => {
    const d = await Discussion.create({ ...data, userId });

    return this.getById(d.dataValues.id);
  };

  static getById = async (id: string, reqUserId?: Rui) => {
    const discussion = await Discussion.findByPk(id, {
      include: [
        DiscussionInclude.writer(reqUserId),
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage(reqUserId),
        DiscussionInclude.liked(reqUserId),
      ],
    });
    if (!discussion) throw DiscussionErrors.noDiscussionFound;

    return new DiscussionService(discussion);
  };

  static getByInstituteId = async (
    id: string,
    page: number,
    reqUserId?: Rui
  ) => {
    const discussions = await Discussion.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: this.DISCUSSIONS_PER_PAGE,
      order: [["createDate", "desc"]],
      include: [
        DiscussionInclude.writer(reqUserId),
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage(reqUserId),
        DiscussionInclude.liked(reqUserId),
      ],
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

    return new DiscussionService(discussion);
  };
}

class DiscussionInclude {
  static writer(userId?: Rui): Includeable {
    return {
      model: Profile,
      as: "writer",
      include: [ProfileInclude.followedBy(userId), ProfileInclude.ambassador],
    };
  }

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }

  static parentMessage(userId?: Rui): Includeable {
    return {
      model: Discussion,
      as: "parentMessage",
      include: [this.writer(userId), this.institute],
    };
  }

  static liked(userId: Rui = null): Includeable {
    return {
      model: Like,
      as: "likes",
      where: { userId },
      required: false,
    };
  }
}
