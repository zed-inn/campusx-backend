import { Includeable } from "sequelize";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { AppError } from "@shared/errors/app-error";
import {
  Profile,
  ProfileInclude,
  ProfileService,
  ProfileUtils,
} from "@modules/core/profile";
import { Comment } from "../models/comment.model";
import { Forum } from "../models/forum.model";
import { CommentAttributes } from "../interfaces/comment.interface";
import { CommentCreateDto } from "../dtos/comment-create.dto";
import { CommentUpdateDto } from "../dtos/comment-update.dto";
import { CommentFullSchema as CommentFS } from "../dtos/comment-full.dto";
import { ForumInclude } from "./forum.service";

export class CommentService {
  static COMMENTS_PER_PAGE = 200;
  static OFFSET = (page: number) => (page - 1) * this.COMMENTS_PER_PAGE;

  static parse = (comment: any) =>
    CommentUtils.process(comment?.get({ plain: true }));

  static getById = async (id: string, reqUserId: string | null = null) => {
    const comment = await Comment.findByPk(id, {
      include: [
        CommentInclude.writer(reqUserId),
        CommentInclude.forum(reqUserId),
        CommentInclude.parentComment(reqUserId),
      ],
    });
    if (!comment) throw new AppError("No Comment Found.", 404);

    return this.parse(comment);
  };

  static getByForumId = async (
    forumId: string,
    commentId: string | null = null,
    page: number,
    reqUserId: string | null = null
  ) => {
    const forum = await Forum.findByPk(forumId);
    if (!forum) throw new AppError("No Forum Found.", 404);

    const commentsCount = await Comment.findAll({
      where: { forumId, replyingTo: commentId },
      limit: this.COMMENTS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
      include: [
        CommentInclude.writer(reqUserId),
        CommentInclude.forum(reqUserId),
        CommentInclude.parentComment(reqUserId),
      ],
    });

    return commentsCount.map((c) => this.parse(c));
  };

  static create = async (data: CommentCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const forum = await Forum.findByPk(data.forumId, {
        include: [ForumInclude.writer(userId)],
      });
      if (!forum) throw new AppError("No Forum Found.", 404);

      const comment = await Comment.create({ ...data, userId });

      let parentComment = null;
      if (!data.replyingTo) await forum.increment({ commentsCount: 1 });
      else {
        const pc = await Comment.findByPk(data.replyingTo, {
          include: [CommentInclude.writer(userId)],
        });
        if (!pc) throw new AppError("No Comment Found.", 404);

        if (pc.dataValues.forumId !== data.forumId)
          throw new AppError(
            "Replying on Comment of different Forum is not allowed.",
            406
          );

        parentComment = await this.getById(data.replyingTo);
        await Comment.increment(
          { repliesCount: 1 },
          { where: { id: data.replyingTo } }
        );
      }

      const writer = await ProfileService.getById(userId);

      return this.parse({
        writer,
        forum: forum.get({ plain: true }),
        ...comment.get({ plain: true }),
        parentComment,
      });
    });
  };

  static update = async (data: CommentUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const { id, ...updateData } = data;

      const comment = await Comment.findOne({
        where: { id, userId },
        include: [
          CommentInclude.writer(),
          CommentInclude.forum(userId),
          CommentInclude.parentComment(userId),
        ],
      });
      if (!comment) throw new AppError("No Comment Found.", 404);

      const cleanData = removeUndefined(updateData);
      if (Object.keys(cleanData).length)
        await comment.update(cleanData as Partial<CommentAttributes>);

      return this.parse(comment);
    });
  };

  static delete = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const comment = await Comment.findOne({
        where: { id, userId },
        include: [
          CommentInclude.writer(),
          CommentInclude.forum(userId),
          CommentInclude.parentComment(userId),
        ],
      });
      if (!comment) throw new AppError("No Comment Found.", 404);

      if (!comment.dataValues.replyingTo)
        await Forum.decrement(
          { commentsCount: 1 },
          { where: { id: comment.dataValues.forumId } }
        );
      else
        await Comment.decrement(
          { repliesCount: 1 },
          { where: { id: comment.dataValues.replyingTo } }
        );

      await comment.destroy();

      return this.parse(comment);
    });
  };
}

export class CommentInclude {
  static writer(userId: string | null = null): Includeable {
    return {
      model: Profile,
      as: "writer",
      include: [ProfileInclude.isFollowing(userId)],
    };
  }

  static forum(userId: string | null = null): Includeable {
    return {
      model: Forum,
      as: "forum",
      include: [ForumInclude.writer(userId)],
    };
  }

  static parentComment(userId: string | null = null): Includeable {
    return {
      model: Comment,
      as: "parentComment",
      include: [this.writer(userId), this.forum(userId)],
    };
  }
}

class CommentUtils {
  static process = (comment: any) => {
    comment.writer = ProfileUtils.process(comment.writer);
    comment.forum.writer = ProfileUtils.process(comment.forum.writer);
    if (comment.parentComment) {
      comment.parentComment.writer = ProfileUtils.process(
        comment.parentComment.writer
      );
      comment.parentComment.forum.writer = ProfileUtils.process(
        comment.parentComment.forum.writer
      );
    }

    return CommentFS.parse(comment);
  };
}
