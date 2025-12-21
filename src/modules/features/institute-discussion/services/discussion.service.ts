import { Includeable } from "sequelize";
import { Discussion } from "../models/discussion.model";
import { Profile, ProfileService } from "@modules/core/profile";
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

  static getById = async (id: string, reqUserId: string | null = null) => {
    const discussion = await Discussion.findByPk(id, {
      include: [
        DiscussionInclude.writer,
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage,
        DiscussionInclude.liked(reqUserId),
      ],
    });
    if (!discussion) throw new AppError("No Discussion Found.", 404);

    return DiscussionUtils.parseFull(discussion.get({ plain: true }));
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
        DiscussionInclude.writer,
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage,
        DiscussionInclude.liked(reqUserId),
      ],
    });

    return discussions.map((d) =>
      DiscussionUtils.parseFull(d.get({ plain: true }))
    );
  };

  static create = async (data: DiscussionCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const institute = await InstituteService.getById(data.instituteId);

      let parentMessage = null;
      if (data.replyingTo) parentMessage = await this.getById(data.replyingTo);

      const writer = await ProfileService.getById(userId);

      const discussion = await Discussion.create({ ...data, userId });

      return DiscussionUtils.parseFull({
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
        DiscussionInclude.writer,
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage,
        DiscussionInclude.liked(userId),
      ],
    });
    if (!discussion) throw new AppError("No Discussion Found.", 404);

    await discussion.update({ message: data.message });

    return DiscussionUtils.parseFull(discussion.get({ plain: true }));
  };

  static delete = async (id: string, userId: string) => {
    const discussion = await Discussion.findOne({
      where: { id: id, userId },
      include: [
        DiscussionInclude.writer,
        DiscussionInclude.institute,
        DiscussionInclude.parentMessage,
        DiscussionInclude.liked(userId),
      ],
    });
    if (!discussion) throw new AppError("No Discussion Found.", 404);

    const discussionData = DiscussionUtils.parseFull(
      discussion.get({ plain: true })
    );

    await discussion.destroy();

    return discussionData;
  };
}

class DiscussionInclude {
  static get writer(): Includeable {
    return { model: Profile, as: "writer" };
  }

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }

  static get parentMessage(): Includeable {
    return {
      model: Discussion,
      as: "parentMessage",
      include: [this.writer, this.institute],
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
  static parseFull = (discussion: Record<string, unknown>) => {
    if (Array.isArray(discussion.likes) && discussion.likes.length)
      discussion.isLiked = true;

    return DiscussionFS.parse(discussion);
  };
}
