import { Includeable } from "sequelize";
import { Discussion } from "../models/discussion.model";
import {
  Profile,
  ProfileInclude,
  ProfileService,
  ProfileUtils,
} from "@modules/core/profile";
import { Institute, InstituteService } from "@modules/core/institutes";
import { DiscussionFullSchema as DiscussionFS } from "../dtos/discussion-full.dto";
import { AppError } from "@shared/errors/app-error";
import { DiscussionCreateDto } from "../dtos/discussion-create.dto";
import db from "@config/database";
import { DiscussionUpdateDto } from "../dtos/discussion-update.dto";
import { Like } from "../models/like.model";

export class DiscussionService {
  static DISCUSSIONS_PER_PAGE = 200;
  static OFFSET = (page: number) => (page - 1) * this.DISCUSSIONS_PER_PAGE;

  static parse = (disc: any) =>
    DiscussionUtils.process(disc?.get({ plain: true }));

  static getById = async (id: string, reqUserId: string | null = null) => {
    const discussion = await Discussion.findByPk(id, {
      include: [
        DiscussionInclude.writer(reqUserId),
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage(reqUserId),
        DiscussionInclude.liked(reqUserId),
      ],
    });
    if (!discussion) throw new AppError("No Discussion Found.", 404);

    return this.parse(discussion);
  };

  static getByInstituteId = async (
    id: string,
    page: number,
    reqUserId: string | null = null
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

    return discussions.map((d) => this.parse(d));
  };

  static create = async (data: DiscussionCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const institute = await InstituteService.getById(data.instituteId);

      let parentMessage = null;
      if (data.replyingTo) parentMessage = await this.getById(data.replyingTo);

      const writer = await ProfileService.getById(userId);

      const discussion = await Discussion.create({ ...data, userId });

      return this.parse({
        ...discussion.get({ plain: true }),
        writer,
        institute,
        parentMessage,
      });
    });
  };

  static update = async (data: DiscussionUpdateDto, userId: string) => {
    const discussion = await Discussion.findOne({
      where: { id: data.id, userId },
      include: [
        DiscussionInclude.writer(),
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage(userId),
        DiscussionInclude.liked(userId),
      ],
    });
    if (!discussion) throw new AppError("No Discussion Found.", 404);

    await discussion.update({ message: data.message });

    return this.parse(discussion);
  };

  static delete = async (id: string, userId: string) => {
    const discussion = await Discussion.findOne({
      where: { id: id, userId },
      include: [
        DiscussionInclude.writer(),
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage(userId),
        DiscussionInclude.liked(userId),
      ],
    });
    if (!discussion) throw new AppError("No Discussion Found.", 404);

    await discussion.destroy();

    return this.parse(discussion);
  };
}

class DiscussionInclude {
  static writer(userId: string | null = null): Includeable {
    return {
      model: Profile,
      as: "writer",
      include: [ProfileInclude.isFollowing(userId)],
    };
  }

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }

  static parentMessage(userId: string | null = null): Includeable {
    return {
      model: Discussion,
      as: "parentMessage",
      include: [this.writer(userId), this.institute],
    };
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

class DiscussionUtils {
  static process = (discussion: any) => {
    if (Array.isArray(discussion.likes) && discussion.likes.length)
      discussion.isLiked = true;
    discussion.writer = ProfileUtils.process(discussion.writer);
    if (discussion.parentMessage)
      discussion.parentMessage.writer = ProfileUtils.process(
        discussion.parentMessage.writer
      );

    return DiscussionFS.parse(discussion);
  };
}
