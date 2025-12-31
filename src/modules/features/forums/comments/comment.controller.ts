import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { CommentService } from "./comment.service";
import { CommentCreateDto } from "./dtos/comment-create.dto";
import { CommentUpdateDto } from "./dtos/comment-update.dto";
import { ProfileUtils } from "@modules/core/user-profile";
import { CommentResponseSchema } from "./dtos/comment-response.dto";

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
      q.page
    );
    const profiles = [...services.map((s) => s.data.writer)];
    services.map((s) =>
      s.data.parentComment ? profiles.push(s.data.parentComment.writer) : null
    );
    const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
    const profileMap: Record<string, any> = {};
    joined.map((j) => (profileMap[j.id] = j));
    const joinedComments = services.map((s) => ({
      ...s.data,
      writer: profileMap[s.data.userId],
      parentComment: s.data.parentComment
        ? {
            ...s.data.parentComment,
            writer: profileMap[s.data.parentComment.userId],
          }
        : null,
    }));
    const comments = joinedComments.map((j) => CommentResponseSchema.parse(j));

    return ApiResponse.success(res, "Comments fetched.", { comments });
  });

  static createComment = catchAsync(
    async (req: Request<{}, {}, CommentCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await CommentService.create(req.body, user.id);
      const profiles = [service.data.writer];
      if (service.data.parentComment)
        profiles.push(service.data.parentComment.writer);
      const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
      const profileMap: Record<string, any> = {};
      joined.map((j) => (profileMap[j.id] = j));
      const comment = CommentResponseSchema.parse({
        ...service.data,
        writer: profileMap[service.data.userId],
        parentComment: service.data.parentComment
          ? {
              ...service.data.parentComment,
              writer: profileMap[service.data.parentComment.userId],
            }
          : null,
      });

      // TODO: notify user, include forum in comment service

      return ApiResponse.success(res, "Commented.", { comment });
    }
  );

  static updateComment = catchAsync(
    async (req: Request<{}, {}, CommentUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await CommentService.update(req.body, user.id);
      const profiles = [service.data.writer];
      if (service.data.parentComment)
        profiles.push(service.data.parentComment.writer);
      const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
      const profileMap: Record<string, any> = {};
      joined.map((j) => (profileMap[j.id] = j));
      const comment = CommentResponseSchema.parse({
        ...service.data,
        writer: profileMap[service.data.userId],
        parentComment: service.data.parentComment
          ? {
              ...service.data.parentComment,
              writer: profileMap[service.data.parentComment.userId],
            }
          : null,
      });

      return ApiResponse.success(res, "Comment updated.", { comment });
    }
  );

  static deleteComment = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    await CommentService.delete(q.id, user.id);

    return ApiResponse.success(res, "Comment deleted.");
  });
}
