import { Request, Response } from "express";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { s } from "@shared/utils/create-schema";
import { LikeService } from "./like.service";

export class LikeController {
  static likeForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    await LikeService.likeForum(q.id, user.id);

    // TODO: notify user, include forum in like service

    return ApiResponse.success(res, "Liked");
  });

  static unlikeForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    await LikeService.unlikeForum(q.id, user.id);

    return ApiResponse.success(res, "Unliked");
  });
}
