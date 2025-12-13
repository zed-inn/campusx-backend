import { AppError } from "@shared/errors/app-error";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { LikeService } from "../services/like.service";
import { ApiResponse } from "@shared/utils/response";

export class LikeController {
  static likeForum = catchAsync(async (req: Request, res: Response) => {
    const profileId = req.user?.id ?? null;
    if (!profileId) throw new AppError("Invalid Request", 401);
    const forumId = req.query.forumId?.toString();
    if (!forumId) throw new AppError("Invalid Request", 406);

    await LikeService.likeForum(forumId, profileId);

    return ApiResponse.success(res, "Liked");
  });

  static unlikeForum = catchAsync(async (req: Request, res: Response) => {
    const profileId = req.user?.id ?? null;
    if (!profileId) throw new AppError("Invalid Request", 401);
    const forumId = req.query.forumId?.toString();
    if (!forumId) throw new AppError("Invalid Request", 406);

    await LikeService.unlikeForum(forumId, profileId);

    return ApiResponse.success(res, "Unliked");
  });
}
