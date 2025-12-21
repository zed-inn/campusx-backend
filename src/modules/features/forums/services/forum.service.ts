import { Includeable } from "sequelize";
import db from "@config/database";
import { AppError } from "@shared/errors/app-error";
import { removeUndefined } from "@shared/utils/clean-object";
import { Profile, ProfileService } from "@modules/core/profile";
import { Forum } from "../models/forum.model";
import { Like } from "../models/like.model";
import { ForumCreateDto } from "../dtos/forum-create.dto";
import { ForumUpdateDto } from "../dtos/forum-update.dto";
import { ForumAttributes } from "../interfaces/forum.interface";
import { ForumFullSchema as ForumFS } from "../dtos/forum-full.dto";

export class ForumService {
  static FORUMS_PER_PAGE = 20;
  static OFFSET = (page: number) => (page - 1) * this.FORUMS_PER_PAGE;

  static getById = async (id: string, reqUserId: string | null = null) => {
    const forum = await Forum.findByPk(id, {
      include: [ForumInclude.writer, ForumInclude.liked(reqUserId)],
    });
    if (!forum) throw new AppError("No Forum Found.", 404);

    return ForumUtils.parseFull(forum.get({ plain: true }));
  };

  static getByUserId = async (
    id: string,
    page: number,
    reqUserId: string | null = null
  ) => {
    const forums = await Forum.findAll({
      where: { userId: id },
      include: [ForumInclude.writer, ForumInclude.liked(reqUserId)],
      limit: this.FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
    });

    return forums.map((f) => ForumUtils.parseFull(f.get({ plain: true })));
  };

  static getLatest = async (page: number, reqUserId: string | null = null) => {
    const forums = await Forum.findAll({
      include: [ForumInclude.writer, ForumInclude.liked(reqUserId)],
      limit: this.FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
    });

    return forums.map((f) => ForumUtils.parseFull(f.get({ plain: true })));
  };

  static create = async (data: ForumCreateDto, userId: string) => {
    const forum = await Forum.create({ ...data, userId });

    const writer = await ProfileService.getById(userId);

    return ForumUtils.parseFull({ writer, ...forum.get({ plain: true }) });
  };

  static update = async (data: ForumUpdateDto, userId: string) => {
    return await db.transaction(async (t) => {
      const { id, ...updateData } = data;

      const forum = await Forum.findOne({
        where: { id, userId },
        include: [ForumInclude.writer, ForumInclude.liked(userId)],
      });
      if (!forum) throw new AppError("No Forum Found.", 404);

      const cleanData = removeUndefined(updateData);
      if (Object.keys(cleanData).length)
        await forum.update(cleanData as Partial<ForumAttributes>);

      return ForumUtils.parseFull(forum.get({ plain: true }));
    });
  };

  static delete = async (id: string, userId: string) => {
    const forum = await Forum.findOne({
      where: { id, userId },
      include: [ForumInclude.writer, ForumInclude.liked(userId)],
    });
    if (!forum) throw new AppError("No Forum Found.", 404);

    const forumData = forum.get({ plain: true });

    await forum.destroy();

    return ForumUtils.parseFull(forumData);
  };
}

export class ForumInclude {
  static get writer(): Includeable {
    return { model: Profile, as: "writer" };
  }

  static liked(userId: string | null): Includeable {
    return {
      model: Like,
      as: "likes",
      where: { userId },
      required: false,
    };
  }
}

export class ForumUtils {
  static parseFull = (forum: Record<string, unknown>) => {
    if (Array.isArray(forum.likes) && forum.likes.length) forum.isLiked = true;

    return ForumFS.parse(forum);
  };
}
