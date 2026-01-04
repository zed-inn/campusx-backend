import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { CommentService } from "./comment.service";
import { CommentGetPostDto } from "./dtos/comment-get.dto";
import { CommentAggregator } from "./comment.aggregator";
import { CommentSchema } from "./dtos/comment-response.dto";
import {
  CommentCreateDto,
  CommentDeleteDto,
  CommentUpdateDto,
} from "./dtos/comment-action.dto";

export class CommentController {
  static getPostComments = catchAsync(
    async (req: Request<{}, {}, {}, CommentGetPostDto>, res: Response) => {
      const iComments = await CommentService.getByForumId(req.query);
      const tComments = await CommentAggregator.transform(iComments);
      const pComments = tComments.map((c) => CommentSchema.parse(tComments));

      return ApiResponse.success(res, "Comments fetched.", {
        comments: pComments,
      });
    }
  );

  static createComment = catchAsync(
    async (req: Request<{}, {}, CommentCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iComment = await CommentService.createCommentOrReply(
        req.body,
        user.id
      );
      const tComment = await CommentAggregator.transform([iComment.plain]);
      const pComment = CommentSchema.parse(tComment);

      // TODO: notify user, include forum in comment service

      return ApiResponse.success(res, "Commented.", { comment: pComment });
    }
  );

  static updateComment = catchAsync(
    async (req: Request<{}, {}, CommentUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iComment = await CommentService.update(req.body, user.id);
      const tComment = await CommentAggregator.transform([iComment.plain]);
      const pComment = CommentSchema.parse(tComment);

      return ApiResponse.success(res, "Comment updated.", {
        comment: pComment,
      });
    }
  );

  static deleteComment = catchAsync(
    async (req: Request<{}, {}, {}, CommentDeleteDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const comment = await CommentService.deleteCommentOrReply(
        q.commentId,
        user.id
      );

      return ApiResponse.success(res, "Comment deleted.", { id: comment.id });
    }
  );
}
