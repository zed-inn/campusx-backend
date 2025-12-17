import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { Parse } from "@shared/utils/parse-fields";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { ForumService } from "../services/forum.service";
import { ForumResponseSchema } from "../dtos/forum-response.dto";
import { ForumCreateDto } from "../dtos/forum-create.dto";
import { ForumUpdateDto } from "../dtos/forum-update.dto";

export class ForumController {
  static getForums = catchAsync(async (req: Request, res: Response) => {
    const page = Parse.pageNum(req.query.page);

    const forums = await ForumService.getLatest(page, req.user?.id);
    const parsedForums = forums.map((f) => ForumResponseSchema.parse(f));

    return ApiResponse.success(res, "Forums fetched.", {
      forums: parsedForums,
    });
  });

  static getUserForums = catchAsync(async (req: Request, res: Response) => {
    const page = Parse.pageNum(req.query.page);
    const userId = Parse.id(req.query.userId);

    const forums = await ForumService.getByUserId(userId, page, req.user?.id);
    const parsedForums = forums.map((f) => ForumResponseSchema.parse(f));

    return ApiResponse.success(res, "Forums fetched.", {
      forums: parsedForums,
    });
  });

  static getMyForums = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const page = Parse.pageNum(req.query.page);

    const forums = await ForumService.getByUserId(user.id, page, user.id);
    const parsedForums = forums.map((f) => ForumResponseSchema.parse(f));

    return ApiResponse.success(res, "Forums fetched.", {
      forums: parsedForums,
    });
  });

  static createForum = catchAsync(
    async (req: Request<{}, {}, ForumCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const forum = await ForumService.create(req.body, user.id);
      const parsedForum = ForumResponseSchema.parse(forum);

      return ApiResponse.success(res, "Forum created.", { forum: parsedForum });
    }
  );

  static updateForum = catchAsync(
    async (req: Request<{}, {}, ForumUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const forum = await ForumService.update(req.body, user.id);
      const parsedForum = ForumResponseSchema.parse(forum);

      return ApiResponse.success(res, "Forum updated.", { forum: parsedForum });
    }
  );

  static deleteForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const forumId = Parse.id(req.query.id);

    const forum = await ForumService.delete(forumId, user.id);
    const parsedForum = ForumResponseSchema.parse(forum);

    return ApiResponse.success(res, "Forum deleted.", { forum: parsedForum });
  });
}
