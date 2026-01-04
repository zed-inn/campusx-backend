import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ApiResponse } from "@shared/utils/api-response";
import { FollowGetDto, FollowGetMineDto } from "./dtos/follow-get.dto";
import { FollowService } from "./follow.service";
import { ProfileAggregator, ShortUserSchema } from "@modules/core/profile";
import { FollowActionDto } from "./dtos/follow-create.dto";

export class FollowController {
  static getFollowers = catchAsync(
    async (req: Request<{}, {}, {}, FollowGetDto>, res: Response) => {
      const iUsers = await FollowService.getFollowersById(req.query);
      const tUsers = await ProfileAggregator.transform(iUsers, req.user?.id);
      const pUsers = tUsers.map((u) => ShortUserSchema.parse(u));

      return ApiResponse.success(res, "User's followers.", {
        followers: pUsers,
      });
    }
  );

  static getMyFollowers = catchAsync(
    async (req: Request<{}, {}, {}, FollowGetMineDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iUsers = await FollowService.getFollowersById({
        ...q,
        userId: user.id,
      });
      const tUsers = await ProfileAggregator.transform(iUsers, user.id);
      const pUsers = tUsers.map((u) => ShortUserSchema.parse(u));

      return ApiResponse.success(res, "Your followers.", { followers: pUsers });
    }
  );

  static getFollowing = catchAsync(
    async (req: Request<{}, {}, {}, FollowGetDto>, res: Response) => {
      const iUsers = await FollowService.getFollowersById(req.query);
      const tUsers = await ProfileAggregator.transform(iUsers, req.user?.id);
      const pUsers = tUsers.map((u) => ShortUserSchema.parse(u));

      return ApiResponse.success(res, "User's following.", {
        following: pUsers,
      });
    }
  );

  static getMyFollowing = catchAsync(
    async (req: Request<{}, {}, {}, FollowGetMineDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iUsers = await FollowService.getFollowersById({
        ...q,
        userId: user.id,
      });
      const tUsers = await ProfileAggregator.transform(iUsers, user.id);
      const pUsers = tUsers.map((u) => ShortUserSchema.parse(u));

      return ApiResponse.success(res, "Your following.", { following: pUsers });
    }
  );

  static followUser = catchAsync(
    async (req: Request<{}, {}, FollowActionDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.body;

      await FollowService.follow(q.userId, user.id);

      return ApiResponse.success(res, "Followed.");
    }
  );

  static unfollowUser = catchAsync(
    async (req: Request<{}, {}, {}, FollowActionDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      await FollowService.unfollow(q.userId, user.id);

      return ApiResponse.success(res, "Unfollowed.");
    }
  );
}
