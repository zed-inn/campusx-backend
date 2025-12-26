import { Includeable } from "sequelize";
import db from "@config/database";
import { AppError } from "@shared/errors/app-error";
import { removeUndefined } from "@shared/utils/clean-object";
import { Profile, ProfileInclude, ProfileService } from "@modules/core/profile";
import { Forum } from "../models/forum.model";
import { Like } from "../models/like.model";
import { ForumCreateDto } from "../dtos/service/forum-create.dto";
import { ForumUpdateDto } from "../dtos/service/forum-update.dto";
import { ForumAttributes } from "../interfaces/forum.interface";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { ForumSchema } from "../dtos/service/forum-schema.dto";
import { Rui } from "@shared/dtos/req-user.dto";
import { ForumErrors } from "../errors/forum.errors";

export class ForumService extends BaseService<InstanceType<typeof Forum>> {
  static FORUMS_PER_PAGE = 20;
  static OFFSET = createOffsetFn(this.FORUMS_PER_PAGE);

  override get data() {
    const forum = super.data;
    forum.isLiked = Array.isArray(forum.likes) && forum.likes.length;
    forum.writer = ProfileService.parse(forum.writer);

    return ForumSchema.parse(forum);
  }

  static create = async (data: ForumCreateDto, userId: string) => {
    const f = await Forum.create({ ...data, userId });

    return this.getById(f.dataValues.id);
  };

  static getById = async (id: string, reqUserId?: Rui) => {
    const forum = await Forum.findByPk(id, {
      include: [ForumInclude.writer(reqUserId), ForumInclude.liked(reqUserId)],
    });
    if (!forum) throw ForumErrors.noForumFound;

    return new ForumService(forum);
  };

  static getByUserId = async (id: string, page: number, reqUserId?: Rui) => {
    const forums = await Forum.findAll({
      where: { userId: id },
      include: [ForumInclude.writer(reqUserId), ForumInclude.liked(reqUserId)],
      limit: this.FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
    });

    return forums.map((f) => new ForumService(f));
  };

  static getLatest = async (page: number, reqUserId?: Rui) => {
    const forums = await Forum.findAll({
      include: [ForumInclude.writer(reqUserId), ForumInclude.liked(reqUserId)],
      limit: this.FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
    });

    return forums.map((f) => new ForumService(f));
  };

  static update = async (data: ForumUpdateDto, userId: string) => {
    return await db.transaction(async (t) => {
      const { id, ...updateData } = data;

      const service = await this.getById(id);
      service.checkOwnership(userId);

      const forum = service.model;
      const cleanData = removeUndefined(updateData);
      if (Object.keys(cleanData).length)
        await forum.update(cleanData as Partial<ForumAttributes>);

      return new ForumService(forum);
    });
  };

  static delete = async (id: string, userId: string) => {
    const service = await this.getById(id);
    service.checkOwnership(userId);

    const forum = service.model;
    await forum.destroy();

    return new ForumService(forum);
  };
}

export class ForumInclude {
  static writer(userId?: Rui): Includeable {
    return {
      model: Profile,
      as: "writer",
      include: [ProfileInclude.followedBy(userId)],
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
