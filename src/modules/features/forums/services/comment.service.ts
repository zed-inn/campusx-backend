import { Includeable } from "sequelize";
import {
  CommentFullAttributesDto,
  CommentFullAttributesSchema,
} from "../dtos/comment-full-attribute.dto";
import { Comment } from "../models/comment.model";
import { Profile } from "@modules/core/profile";
import { Forum } from "../models/forum.model";
import { CommentCreateDto } from "../dtos/comment-create.dto";
import db from "@config/database";
import { AppError } from "@shared/errors/app-error";
import { CommentUpdateDto } from "../dtos/comment-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { CommentAttributes } from "../interfaces/comment.interface";

export class CommentService {
  static COMMENTS_PER_PAGE = 45;
  static OFFSET = (page: number) => (page - 1) * this.COMMENTS_PER_PAGE;

  static getCommentsByForumId = async (
    id: string,
    page: number
  ): Promise<CommentFullAttributesDto[]> => {
    const forum = await Forum.findByPk(id);
    if (!forum) throw new AppError("Invalid Request.", 404);

    const comments = await Comment.findAll({
      where: { forumId: id },
      limit: this.COMMENTS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
      include: [CommentUtils.includeForumObj, CommentUtils.includeWriterObj],
    });

    return comments.map((c) =>
      CommentFullAttributesSchema.parse(c.get({ plain: true }))
    );
  };

  static createComment = async (
    data: CommentCreateDto,
    profileId: string
  ): Promise<CommentFullAttributesDto> => {
    return await db.transaction(async (t) => {
      const forum = await Forum.findByPk(data.forumId);
      if (!forum) throw new AppError("Invalid Request.", 404);

      const comment = await Comment.create(
        { ...data, profileId },
        {
          include: [
            CommentUtils.includeForumObj,
            CommentUtils.includeWriterObj,
          ],
        }
      );

      if (data.replyingTo) await forum.increment({ comments: 1 });

      return CommentFullAttributesSchema.parse(comment.get({ plain: true }));
    });
  };

  static updateComment = async (
    data: CommentUpdateDto,
    profileId: string
  ): Promise<CommentFullAttributesDto> => {
    return await db.transaction(async (t) => {
      const { id, ...updateData } = data;

      const comment = await Comment.findOne({
        where: { id, profileId },
        include: [CommentUtils.includeForumObj, CommentUtils.includeWriterObj],
      });
      if (!comment) throw new AppError("Invalid Request.", 406);

      const cleanData = removeUndefined(updateData);

      await comment.update(cleanData as Partial<CommentAttributes>);
      return CommentFullAttributesSchema.parse(comment.get({ plain: true }));
    });
  };

  static deleteComment = async (
    id: string,
    profileId: string
  ): Promise<CommentFullAttributesDto> => {
    return await db.transaction(async (t) => {
      const comment = await Comment.findOne({
        where: { id, profileId },
        include: [CommentUtils.includeForumObj, CommentUtils.includeWriterObj],
      });
      if (!comment) throw new AppError("Invalid Request.", 406);
      const commentData = comment.get({
        plain: true,
      });

      if (!comment.dataValues.replyingTo)
        await Forum.decrement(
          { comments: 1 },
          { where: { id: comment.dataValues.forumId } }
        );

      await comment.destroy();
      return CommentFullAttributesSchema.parse(commentData);
    });
  };
}

class CommentUtils {
  static includeWriterObj: Includeable = {
    model: Profile,
    as: "writer",
  };

  static includeForumObj: Includeable = {
    model: Forum,
    as: "forum",
  };
}
