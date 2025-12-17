import { Includeable } from "sequelize";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { AppError } from "@shared/errors/app-error";
import { Profile } from "@modules/core/profile";
import { Comment } from "../models/comment.model";
import { Forum } from "../models/forum.model";
import { CommentAttributes } from "../interfaces/comment.interface";
import { CommentCreateDto } from "../dtos/comment-create.dto";
import { CommentUpdateDto } from "../dtos/comment-update.dto";
import { CommentFullSchema as CommentFS } from "../dtos/comment-full.dto";

export class CommentService {
  static COMMENTS_PER_PAGE = 200;
  static OFFSET = (page: number) => (page - 1) * this.COMMENTS_PER_PAGE;

  static getByForumId = async (id: string, page: number) => {
    const forum = await Forum.findByPk(id);
    if (!forum) throw new AppError("Invalid Request.", 404);

    const commentsCount = await Comment.findAll({
      where: { forumId: id },
      limit: this.COMMENTS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
      include: [CommentInclude.writer],
    });

    return commentsCount.map((c) => CommentFS.parse(c.get({ plain: true })));
  };

  static create = async (data: CommentCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const forum = await Forum.findByPk(data.forumId);
      if (!forum) throw new AppError("Forum not found.", 404);

      const comment = await Comment.create(
        { ...data, userId },
        { include: [CommentInclude.writer] }
      );

      if (data.replyingTo) await forum.increment({ commentsCount: 1 });

      return CommentFS.parse(comment.get({ plain: true }));
    });
  };

  static update = async (data: CommentUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const { id, ...updateData } = data;

      const comment = await Comment.findOne({
        where: { id, userId },
        include: [CommentInclude.writer],
      });
      if (!comment) throw new AppError("Comment not found.", 404);

      const cleanData = removeUndefined(updateData);
      await comment.update(cleanData as Partial<CommentAttributes>);

      return CommentFS.parse(comment.get({ plain: true }));
    });
  };

  static delete = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const comment = await Comment.findOne({
        where: { id, userId },
        include: [CommentInclude.writer],
      });
      if (!comment) throw new AppError("Comment not found.", 404);

      const commentData = comment.get({ plain: true });

      if (!comment.dataValues.replyingTo)
        await Forum.decrement(
          { commentsCount: 1 },
          { where: { id: comment.dataValues.forumId } }
        );

      await comment.destroy();

      return CommentFS.parse(commentData);
    });
  };
}

class CommentInclude {
  static writer: Includeable = { model: Profile, as: "writer" };
}
