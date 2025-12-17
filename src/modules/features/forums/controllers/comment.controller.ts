import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { Parse } from "@shared/utils/parse-fields";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { CommentService } from "../services/comment.service";
import { CommentResponseSchema } from "../dtos/comment-response.dto";
import { CommentCreateDto } from "../dtos/comment-create.dto";
import { CommentUpdateDto } from "../dtos/comment-update.dto";

export class CommentController {
  static getForumComments = catchAsync(async (req: Request, res: Response) => {
    const page = Parse.pageNum(req.query.page);
    const forumId = Parse.id(req.query.forumId);

    const comments = await CommentService.getByForumId(forumId, page);
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
