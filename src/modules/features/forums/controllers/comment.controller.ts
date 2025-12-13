import { AppError } from "@shared/errors/app-error";
import { catchAsync } from "@shared/utils/catch-async";
import { Transform } from "@shared/utils/transform";
import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { CommentResponseSchema } from "../dtos/comment-response.dto";
import { ApiResponse } from "@shared/utils/response";
import { CommentCreateDto } from "../dtos/comment-create.dto";
import { CommentUpdateDto } from "../dtos/comment-update.dto";

export class CommentController {
  static getComments = catchAsync(async (req: Request, res: Response) => {
    const page = Transform.to.number(req.query.page, 1);
    const forumId = req.query.forumId?.toString();
    if (!forumId) throw new AppError("No Forum found.", 404);

    const comments = await CommentService.getCommentsByForumId(forumId, page);
    const parsedComments = comments.map((c) => CommentResponseSchema.parse(c));

    return ApiResponse.success(res, "Comments fetched.", {
      comments: parsedComments,
    });
  });

  static createComment = catchAsync(
    async (req: Request<{}, {}, CommentCreateDto>, res: Response) => {
      const profileId = req.user?.id;
      if (!profileId) throw new AppError("Invalid Request.", 401);

      const comment = await CommentService.createComment(req.body, profileId);
      const parsedComment = CommentResponseSchema.parse(comment);

      return ApiResponse.success(res, "Comment created.", {
        comment: parsedComment,
      });
    }
  );

  static updateComment = catchAsync(
    async (req: Request<{}, {}, CommentUpdateDto>, res: Response) => {
      const profileId = req.user?.id;
      if (!profileId) throw new AppError("Invalid Request.", 401);

      const comment = await CommentService.updateComment(req.body, profileId);
      const parsedComment = CommentResponseSchema.parse(comment);

      return ApiResponse.success(res, "Comment updated.", {
        comment: parsedComment,
      });
    }
  );

  static deleteComment = catchAsync(async (req: Request, res: Response) => {
    const commentId = req.query.commentId?.toString();
    if (!commentId) throw new AppError("Invalid Request.", 400);

    const profileId = req.user?.id;
    if (!profileId) throw new AppError("Invalid Request.", 401);

    const comment = await CommentService.deleteComment(commentId, profileId);
    const parsedComment = CommentResponseSchema.parse(comment);

    return ApiResponse.success(res, "Comment deleted.", {
      comment: parsedComment,
    });
  });
}
