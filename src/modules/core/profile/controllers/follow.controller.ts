import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { FollowService } from "../services/follow.service";
import { ApiResponse } from "@shared/utils/api-response";
import { Parse } from "@shared/utils/parse-fields";
import { FollowResponseSchema } from "../dtos/follow-response.dto";

export class FollowController {
  static getFollowers = catchAsync(async (req: Request, res: Response) => {
    const id = Parse.id(req.query.id);
    const page = Parse.pageNum(req.query.page);

    const followers = await FollowService.getFollowersById(id, page);
    const parsedFollowers = followers.map((f) =>
      FollowResponseSchema.parse(f.followerProfile)
    );

    return ApiResponse.success(res, "Followers fetched.", {
      followers: parsedFollowers,
    });
  });

  static getMyFollowers = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const page = Parse.pageNum(req.query.page);

    const followers = await FollowService.getFollowersById(user.id, page);
    const parsedFollowers = followers.map((f) =>
      FollowResponseSchema.parse(f.followerProfile)
    );

    return ApiResponse.success(res, "Your Followers.", {
      followers: parsedFollowers,
    });
  });

  static getFollowing = catchAsync(async (req: Request, res: Response) => {
    const id = Parse.id(req.query.id);
    const page = Parse.pageNum(req.query.page);

    const following = await FollowService.getFollowingById(id, page);
    const parsedFollowing = following.map((f) =>
      FollowResponseSchema.parse(f.followeeProfile)
    );

    return ApiResponse.success(res, "Following fetched.", {
      following: parsedFollowing,
    });
  });

  static getMyFollowing = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const page = Parse.pageNum(req.query.page);

    const following = await FollowService.getFollowingById(user.id, page);
    const parsedFollowing = following.map((f) =>
      FollowResponseSchema.parse(f.followeeProfile)
    );

    return ApiResponse.success(res, "Your Following.", {
      following: parsedFollowing,
    });
  });

  static followUser = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const id = Parse.id(req.body.userId);

    await FollowService.follow(id, user.id);

    return ApiResponse.success(res, "Followed");
  });

  static unfollowUser = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const id = Parse.id(req.body.userId);

    await FollowService.unfollow(id, user.id);

    return ApiResponse.success(res, "Unfollowed");
  });
}
