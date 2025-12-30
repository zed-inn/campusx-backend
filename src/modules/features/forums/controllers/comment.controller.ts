import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { CommentService } from "../services/comment.service";
import { CommentResponseSchema } from "../dtos/controller/comment-response.dto";
import { CommentCreateDto } from "../dtos/service/comment-create.dto";
import { CommentUpdateDto } from "../dtos/service/comment-update.dto";

export class CommentController {
  static getForumComments = catchAsync(async (req: Request, res: Response) => {
    const q = s
      .create({
        forumId: s.fields.id,
        commentId: s.fields.idNull,
        page: s.fields.page,
      })
      .parse(req.query);

    const services = await CommentService.getByForumId(
      q.forumId,
      q.commentId,
      q.page,
      req.user?.id
    );
    const comments = services.map((s) => CommentResponseSchema.parse(s));

    return ApiResponse.success(res, "Comments fetched.", { comments });
  });

  static createComment = catchAsync(
    async (req: Request<{}, {}, CommentCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await CommentService.create(req.body, user.id);
      const comment = CommentResponseSchema.parse(service.data);

      // TODO: notify user, include forum in comment service

      return ApiResponse.success(res, "Commented.", { comment });
    }
  );

  static updateComment = catchAsync(
    async (req: Request<{}, {}, CommentUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await CommentService.update(req.body, user.id);
      const comment = CommentResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Comment updated.", { comment });
    }
  );

  static deleteComment = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    const service = await CommentService.delete(q.id, user.id);
    const comment = CommentResponseSchema.parse(service.data);

    return ApiResponse.success(res, "Comment deleted.", { comment });
  });
}
