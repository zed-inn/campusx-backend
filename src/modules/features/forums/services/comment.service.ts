import { Includeable } from "sequelize";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { Profile, ProfileInclude, ProfileService } from "@modules/core/profile";
import { Comment, CommentInstance } from "../models/comment.model";
import { Forum } from "../models/forum.model";
import { CommentAttributes } from "../interfaces/comment.interface";
import { CommentCreateDto } from "../dtos/service/comment-create.dto";
import { CommentUpdateDto } from "../dtos/service/comment-update.dto";
import { ForumService } from "./forum.service";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Rui } from "@shared/dtos/req-user.dto";
import { CommentErrors } from "../errors/comment.errros";
import { CommentSchema } from "../dtos/service/comment-schema.dto";

export class CommentService extends BaseService<CommentInstance> {
  static COMMENTS_PER_PAGE = 200;
  static OFFSET = createOffsetFn(this.COMMENTS_PER_PAGE);

  override get data() {
    const comment = super.data;
    comment.parentComment = CommentSchema.parse(comment.parentComment);
    comment.writer = ProfileService.parse(comment.writer);

    return CommentSchema.parse(comment);
  }

  static create = async (data: CommentCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const service = await ForumService.getById(data.forumId);

      const forum = service.model;
      const c = await Comment.create({ ...data, userId });

      if (!data.replyingTo) await forum.increment({ commentsCount: 1 });
      else {
        const service = await CommentService.getById(data.replyingTo);
        const comment = service.model;
        if (service.data.forumId !== data.forumId)
          throw CommentErrors.replyingDifferentNotAllowed;

        await comment.increment({ repliesCount: 1 });
      }

      return this.getById(c.dataValues.id);
    });
  };

  static getById = async (id: string, reqUserId?: Rui) => {
    const comment = await Comment.findByPk(id, {
      include: [
        CommentInclude.writer(reqUserId),
        CommentInclude.parentComment(reqUserId),
      ],
    });
    if (!comment) throw CommentErrors.noCommentFound;

    return new CommentService(comment);
  };

  static getByForumId = async (
    id: string,
    commentId: Rui,
    page: number,
    reqUserId?: Rui
  ) => {
    const service = await ForumService.getById(id);
    const commentsCount = await Comment.findAll({
      where: { forumId: service.data.id, replyingTo: commentId },
      limit: this.COMMENTS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
      include: [
        CommentInclude.writer(reqUserId),
        CommentInclude.parentComment(reqUserId),
      ],
    });

    return commentsCount.map((c) => new CommentService(c));
  };

  static update = async (data: CommentUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const { id, ...updateData } = data;

      const service = await this.getById(id);
      service.checkOwnership(userId);

      const comment = service.model;
      const cleanData = removeUndefined(updateData);
      if (Object.keys(cleanData).length)
        await comment.update(cleanData as Partial<CommentAttributes>);

      return new CommentService(comment);
    });
  };

  static delete = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const service = await this.getById(id);
      service.checkOwnership(userId);

      const comment = service.model;
      if (!service.data.replyingTo)
        await Forum.decrement(
          { commentsCount: 1 },
          { where: { id: service.data.forumId } }
        );
      else
        await Comment.decrement(
          { repliesCount: 1 },
          { where: { id: service.data.replyingTo } }
        );

      await comment.destroy();

      return new CommentService(comment);
    });
  };
}

export class CommentInclude {
  static writer(userId?: Rui): Includeable {
    return {
      model: Profile,
      as: "writer",
      include: [ProfileInclude.followedBy(userId)],
    };
  }

  static parentComment(userId?: Rui): Includeable {
    return {
      model: Comment,
      as: "parentComment",
      include: [this.writer(userId)],
    };
  }
}
