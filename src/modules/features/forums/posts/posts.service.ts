import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { Forum, ForumAttributes, ForumInstance } from "./posts.model";
import { ForumCreateDto } from "./dtos/forum-create.dto";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { ForumErrors } from "./posts.errors";
import { FORUMS_PER_PAGE } from "@config/constants/items-per-page";
import { hasKeys } from "@shared/utils/object-length";
import { Profile, ProfileAttributes } from "@modules/core/user-profile";
import { Includeable } from "sequelize";
import { ForumUpdateDto } from "./dtos/forum-update.dto";

export class ForumService extends BaseService<ForumInstance, ForumAttributes> {
  static OFFSET = createOffsetFn(FORUMS_PER_PAGE);

  override get data() {
    const forum = super.data as ForumAttributes & { writer: ProfileAttributes };
    return forum;
  }

  static create = async (data: ForumCreateDto, userId: string) => {
    const forum = await Forum.create({ ...data, userId });

    return this.getById(forum.dataValues.id);
  };

  static getById = async (id: string) => {
    const forum = await Forum.findByPk(id, { include: [ForumInclude.writer] });
    if (!forum) throw ForumErrors.noForumFound;

    return new ForumService(forum);
  };

  static getByUserId = async (id: string, page: number) => {
    const forums = await Forum.findAll({
      where: { userId: id },
      limit: FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
      include: [ForumInclude.writer],
    });

    return forums.map((f) => new ForumService(f));
  };

  static getLatest = async (page: number) => {
    const forums = await Forum.findAll({
      limit: FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
      include: [ForumInclude.writer],
    });

    return forums.map((f) => new ForumService(f));
  };

  static update = async (data: ForumUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const { id, ...updateData } = data;

      const service = await this.getById(id);
      service.checkOwnership(userId);

      const forum = service.model;
      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await forum.update(cleanData as Partial<ForumAttributes>);

      return this.getById(service.data.id);
    });
  };

  static delete = async (id: string, userId: string) => {
    const service = await this.getById(id);
    service.checkOwnership(userId);

    const forum = service.model;
    await forum.destroy();
  };
}

class ForumInclude {
  static get writer(): Includeable {
    return { model: Profile, as: "writer" };
  }
}
