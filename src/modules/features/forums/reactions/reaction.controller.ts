import { Request, Response } from "express";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { ReactActionDto } from "./dtos/reaction.dto";
import { ReactionService } from "./reaction.service";

export class ReactionController {
  static likePost = catchAsync(
    async (req: Request<{}, {}, ReactActionDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.body;

      await ReactionService.like(q.forumId, user.id);

      // TODO: notify user, include forum in like service

      return ApiResponse.success(res, "Liked");
    }
  );

  static unlikePost = catchAsync(
    async (req: Request<{}, {}, {}, ReactActionDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      await ReactionService.unlike(q.forumId, user.id);

      return ApiResponse.success(res, "Unliked");
    }
  );
}
