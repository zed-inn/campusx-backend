import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { FollowService } from "../services/follow.service";
import { ApiResponse } from "@shared/utils/api-response";
import { createSchema } from "@shared/utils/create-schema";
import { ProfileResponseMinSchema as ResMin } from "../dtos/controller/profile-response.dto";

export class FollowController {
  static getFollowers = catchAsync(async (req: Request, res: Response) => {
    const q = createSchema({ userId: "id", page: "page" }).parse(req.query);

    const services = await FollowService.getFollowersById(
      q.userId,
      q.page,
      req.user?.id
    );
    const followers = services.map((s) => ResMin.parse(s.data.followerProfile));

    return ApiResponse.success(res, "User's followers.", { followers });
  });

  static getMyFollowers = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ page: "page" }).parse(req.query);

    const services = await FollowService.getFollowersById(user.id, q.page);
    const followers = services.map((s) => ResMin.parse(s.data.followerProfile));

    return ApiResponse.success(res, "Your followers.", { followers });
  });

  static getFollowing = catchAsync(async (req: Request, res: Response) => {
    const q = createSchema({ id: "id", page: "page" }).parse(req.query);

    const services = await FollowService.getFollowingsById(
      q.id,
      q.page,
      req.user?.id
    );
    const followings = services.map((s) =>
      ResMin.parse(s.data.followeeProfile)
    );

    return ApiResponse.success(res, "User's following.", { followings });
  });

  static getMyFollowing = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ page: "page" }).parse(req.query);

    const services = await FollowService.getFollowingsById(user.id, q.page);
    const followings = services.map((s) =>
      ResMin.parse(s.data.followeeProfile)
    );

    return ApiResponse.success(res, "Your following.", { followings });
  });

  static followUser = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ id: "id" }).parse(req.body);

    await FollowService.follow(q.id, user.id);

    return ApiResponse.success(res, "Followed.");
  });

  static unfollowUser = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ id: "id" }).parse(req.body);

    await FollowService.unfollow(q.id, user.id);

    return ApiResponse.success(res, "Unfollowed.");
  });
}
