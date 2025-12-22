import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { Parse } from "@shared/utils/parse-fields";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { NotificationService } from "@modules/core/notifications";
import { NOTIFICATION_CONFIG } from "@modules/core/notifications/notification.config";
import { CommentService } from "../services/comment.service";
import { CommentResponseSchema } from "../dtos/comment-response.dto";
import { CommentCreateDto } from "../dtos/comment-create.dto";
import { CommentUpdateDto } from "../dtos/comment-update.dto";

export class CommentController {
  static getForumComments = catchAsync(async (req: Request, res: Response) => {
    const page = Parse.pageNum(req.query.page);
    const forumId = Parse.id(req.query.forumId);
    const commentId = Parse.idNullable(req.query.replyingTo);

    const comments = await CommentService.getByForumId(
      forumId,
      commentId,
      page,
      req.user?.id
    );
    const parsedComments = comments.map((c) => CommentResponseSchema.parse(c));

    return ApiResponse.success(res, "Comments fetched.", {
      comments: parsedComments,
    });
  });

  static createComment = catchAsync(
    async (req: Request<{}, {}, CommentCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const comment = await CommentService.create(req.body, user.id);
      const parsedComment = CommentResponseSchema.parse(comment);

      NotificationService.notify(comment.forum.writer.id, {
        title: `${comment.forum.title}`,
        body: `${comment.writer.fullName}: ${comment.body}`,
        type: NOTIFICATION_CONFIG.TYPES.COMMENTED,
      });

      return ApiResponse.success(res, "Comment created.", {
        comment: parsedComment,
      });
    }
  );

  static updateComment = catchAsync(
    async (req: Request<{}, {}, CommentUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const comment = await CommentService.update(req.body, user.id);
      const parsedComment = CommentResponseSchema.parse(comment);

      return ApiResponse.success(res, "Comment updated.", {
        comment: parsedComment,
      });
    }
  );

  static deleteComment = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const commentId = Parse.id(req.query.id);

    const comment = await CommentService.delete(commentId, user.id);
    const parsedComment = CommentResponseSchema.parse(comment);

    return ApiResponse.success(res, "Comment deleted.", {
      comment: parsedComment,
    });
  });
}
