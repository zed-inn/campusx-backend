import { Includeable } from "sequelize";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { AppError } from "@shared/errors/app-error";
import { Profile, ProfileService } from "@modules/core/profile";
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

  static getByForumId = async (
    forumId: string,
    commentId: string | null = null,
    page: number
  ) => {
    const forum = await Forum.findByPk(forumId);
    if (!forum) throw new AppError("No Forum Found.", 404);

    const commentsCount = await Comment.findAll({
      where: { forumId, replyingTo: commentId },
      limit: this.COMMENTS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
      include: [CommentInclude.writer, CommentInclude.forum],
    });

    return commentsCount.map((c) => CommentFS.parse(c.get({ plain: true })));
  };

  static create = async (data: CommentCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const forum = await Forum.findByPk(data.forumId, {
        include: [ForumInclude.writer],
      });
      if (!forum) throw new AppError("No Forum Found.", 404);

      const comment = await Comment.create({ ...data, userId });

      if (data.replyingTo) {
        await forum.increment({ commentsCount: 1 });
        await Comment.increment(
          { repliesCount: 1 },
          { where: { id: data.replyingTo } }
        );
      }

      const writer = await ProfileService.getById(userId);

      return CommentFS.parse({
        writer,
        forum: forum.get({ plain: true }),
        ...comment.get({ plain: true }),
      });
    });
  };

  static update = async (data: CommentUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const { id, ...updateData } = data;

      const comment = await Comment.findOne({
        where: { id, userId },
        include: [CommentInclude.writer, CommentInclude.forum],
      });
      if (!comment) throw new AppError("No Comment Found.", 404);

      const cleanData = removeUndefined(updateData);
      if (Object.keys(cleanData).length)
        await comment.update(cleanData as Partial<CommentAttributes>);

      return CommentFS.parse(comment.get({ plain: true }));
    });
  };

  static delete = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const comment = await Comment.findOne({
        where: { id, userId },
        include: [CommentInclude.writer, CommentInclude.forum],
      });
      if (!comment) throw new AppError("No Comment Found.", 404);

      const commentData = comment.get({ plain: true });

      if (!comment.dataValues.replyingTo)
        await Forum.decrement(
          { commentsCount: 1 },
          { where: { id: comment.dataValues.forumId } }
        );

      if (comment.dataValues.replyingTo)
        await Comment.decrement(
          { repliesCount: 1 },
          { where: { id: comment.dataValues.replyingTo } }
        );

      await comment.destroy();

      return CommentFS.parse(commentData);
    });
  };
}

export class CommentInclude {
  static writer: Includeable = { model: Profile, as: "writer" };

  static forum: Includeable = {
    model: Forum,
    as: "forum",
    include: [ForumInclude.writer],
  };
}
