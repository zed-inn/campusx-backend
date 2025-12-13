import { catchAsync } from "@shared/utils/catch-async";
import { Transform } from "@shared/utils/transform";
import { Request, Response } from "express";
import { ForumService } from "../services/forum.service";
import { ForumResponseSchema } from "../dtos/forum-response.dto";
import { ApiResponse } from "@shared/utils/response";
import { ForumCreateDto } from "../dtos/forum-create.dto";
import { AppError } from "@shared/errors/app-error";
import { ForumUpdateDto } from "../dtos/forum-update.dto";

export class ForumController {
  static getForums = catchAsync(async (req: Request, res: Response) => {
    const profileId = req.user?.id ?? null
    const page = Transform.to.number(req.query.page, 1);

    const forums = await ForumService.getLatestForums(page, profileId);
    const parsedForums = forums.map((f) => ForumResponseSchema.parse(f));

    return ApiResponse.success(res, "Forums fetched.", {
      forums: parsedForums,
    });
  });

  static getProfileForums = catchAsync(async (req: Request, res: Response) => {
    const page = Transform.to.number(req.query.page, 1);
    const profileId = req.query.profileId?.toString();
    if (!profileId) throw new AppError("No profileId given.", 400);

    const forums = await ForumService.getForumsByProfileID(profileId, page);
    const parsedForums = forums.map((f) => ForumResponseSchema.parse(f));

    return ApiResponse.success(res, "Forums fetched.", {
      forums: parsedForums,
    });
  });

  static getMyForums = catchAsync(async (req: Request, res: Response) => {
    const page = Transform.to.number(req.query.page, 1);
    const profileId = req.user?.id;
    if (!profileId) throw new AppError("Invalid Request.", 401);

    const forums = await ForumService.getForumsByProfileID(profileId, page);
    const parsedForums = forums.map((f) => ForumResponseSchema.parse(f));

    return ApiResponse.success(res, "Forums fetched.", {
      forums: parsedForums,
    });
  });

  static createForum = catchAsync(
    async (req: Request<{}, {}, ForumCreateDto>, res: Response) => {
      const profileId = req.user?.id;
      if (!profileId) throw new AppError("Invalid Request.", 401);

      const forum = await ForumService.createForum(req.body, profileId);
      const parsedForum = ForumResponseSchema.parse(forum);

      return ApiResponse.success(res, "Forum created.", { forum: parsedForum });
    }
  );

  static updateForum = catchAsync(
    async (req: Request<{}, {}, ForumUpdateDto>, res: Response) => {
      const profileId = req.user?.id;
      if (!profileId) throw new AppError("Invalid Request.", 401);

      const forum = await ForumService.updateForum(req.body, profileId);
      const parsedForum = ForumResponseSchema.parse(forum);

      return ApiResponse.success(res, "Forum updated.", { forum: parsedForum });
    }
  );

  static deleteForum = catchAsync(async (req: Request, res: Response) => {
    const profileId = req.user?.id;
    if (!profileId) throw new AppError("Invalid Request.", 401);

    const forumId = req.query.id?.toString();
    if (!forumId) throw new AppError("No forumId given.", 400);

    const forum = await ForumService.deleteForum(forumId, profileId);
    const parsedForum = ForumResponseSchema.parse(forum);

    return ApiResponse.success(res, "Forum deleted.", { forum: parsedForum });
  });
}
