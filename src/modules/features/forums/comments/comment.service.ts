import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { COMMENTS_PER_PAGE } from "@config/constants/items-per-page";
import { hasKeys } from "@shared/utils/object-length";
import { Comment, CommentAttributes, CommentInstance } from "./comment.model";
import { CommentCreateDto, CommentUpdateDto } from "./dtos/comment-action.dto";
import { PostService } from "../post/post.service";
import { CommentStatService } from "./stat/stat.service";
import { CommentGetPostDto } from "./dtos/comment-get.dto";
import { AppError } from "@shared/errors/app-error";

class _CommentService extends BaseService<CommentInstance> {
  protected OFFSET = createOffsetFn(COMMENTS_PER_PAGE);

  constructor() {
    super(Comment);
  }

  createCommentOrReply = async (data: CommentCreateDto, userId: string) => {
    const { forumId: postId, ...createData } = data;

    return await db.transaction(async () => {
      const post = await PostService.getById(postId);

      const c = await Comment.create({ ...createData, postId, userId });

      if (!data.replyingTo)
        await CommentStatService.updateCounts(
          post.dataValues.id,
          "comments",
          1
        );
      else {
        const parentComment = await this.getById(data.replyingTo);
        if (parentComment.dataValues.postId !== post.dataValues.id)
          throw new AppError("Invalid Request", 406);

        await parentComment.increment({ repliesCount: 1 });
      }

      return c;
    });
  };

  getByForumId = async (data: CommentGetPostDto) => {
    const commentsCount = await Comment.findAll({
      where: { postId: data.forumId, replyingTo: data.parentCommentId },
      limit: COMMENTS_PER_PAGE,
      offset: this.OFFSET(data.page),
      order: [["createDate", "desc"]],
    });

    return commentsCount.map((c) => c.plain);
  };

  update = async (data: CommentUpdateDto, userId: string) => {
    const { commentId: id, ...updateData } = data;

    return await db.transaction(async () => {
      const comment = await this.getById(id);
      this.checkOwnership(comment, userId);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await comment.update(cleanData as Partial<CommentAttributes>);

      return comment;
    });
  };

  deleteCommentOrReply = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const comment = await this.getById(id);
      this.checkOwnership(comment, userId);

      const commentData = comment.plain;
      if (!commentData.replyingTo)
        await CommentStatService.updateCounts(
          commentData.postId,
          "comments",
          -1
        );
      else
        await Comment.decrement(
          { repliesCount: 1 },
          { where: { id: commentData.replyingTo } }
        );

      await comment.destroy();

      return comment.plain;
    });
  };
}

export const CommentService = new _CommentService();
