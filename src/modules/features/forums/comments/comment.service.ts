import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { Comment, CommentAttributes, CommentInstance } from "./comment.model";
import { Forum } from "../posts/posts.model";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { CommentErrors } from "./comment.errros";
import { COMMENTS_PER_PAGE } from "@config/constants/items-per-page";
import { ForumService } from "../posts/posts.service";
import { CommentCreateDto } from "./dtos/comment-create.dto";
import { CommentUpdateDto } from "./dtos/comment-update.dto";
import { hasKeys } from "@shared/utils/object-length";
import { Profile, ProfileAttributes } from "@modules/core/user-profile";
import { Includeable } from "sequelize";

export class CommentService extends BaseService<
  CommentInstance,
  CommentAttributes
> {
  static OFFSET = createOffsetFn(COMMENTS_PER_PAGE);

  override get data() {
    const data = super.data as CommentAttributes & {
      writer: ProfileAttributes;
      parentComment: null | (CommentAttributes & { writer: ProfileAttributes });
    };
    return data;
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

  static getById = async (id: string) => {
    const comment = await Comment.findByPk(id, {
      include: [CommentInclude.writer, CommentInclude.parentComment],
    });
    if (!comment) throw CommentErrors.noCommentFound;

    return new CommentService(comment);
  };

  static getByIds = async (ids: string[]) => {
    const comments = await Comment.findAll({
      where: { id: ids },
      include: [CommentInclude.writer, CommentInclude.parentComment],
    });

    return comments.map((c) => new CommentService(c));
  };

  static getByForumId = async (
    id: string,
    commentId: string | null,
    page: number
  ) => {
    const commentsCount = await Comment.findAll({
      where: { forumId: id, replyingTo: commentId },
      limit: COMMENTS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
      include: [CommentInclude.writer, CommentInclude.parentComment],
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
      if (hasKeys(cleanData))
        await comment.update(cleanData as Partial<CommentAttributes>);

      return this.getById(service.data.id);
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
    });
  };
}

class CommentInclude {
  static get writer() {
    return { model: Profile, as: "writer" };
  }

  static get parentComment(): Includeable {
    return {
      model: Comment,
      as: "parentComment",
      include: [this.writer],
    };
  }
}
