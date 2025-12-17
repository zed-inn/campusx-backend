import { Request, Response } from "express";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { Parse } from "@shared/utils/parse-fields";
import { LikeService } from "../services/like.service";

export class LikeController {
  static likeForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const forumId = Parse.id(req.query.forumId);

    await LikeService.likeForum(forumId, user.id);

    return ApiResponse.success(res, "Liked");
  });

  static unlikeForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const forumId = Parse.id(req.query.forumId);

    await LikeService.unlikeForum(forumId, user.id);

    return ApiResponse.success(res, "Unliked");
  });
}
