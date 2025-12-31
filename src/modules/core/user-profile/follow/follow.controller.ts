import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { FollowService } from "./follow.service";
import { ResponseFullSchema } from "../profile/dtos/profile-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { ProfileUtils } from "../profile/profile.utils";
import { AppError } from "@shared/errors/app-error";

export class FollowController {
  static getFollowers = catchAsync(async (req: Request, res: Response) => {
    const q = s
      .create({ id: s.fields.id, page: s.fields.page })
      .parse(req.query);

    const services = await FollowService.getFollowersById(q.id, q.page);
    const joined = await ProfileUtils.joinAll(
      services.map((s) => s.data),
      req.user?.id
    );
    const followers = joined.map((j) => ResponseFullSchema.parse(j));

    return ApiResponse.success(res, "User's followers.", { followers });
  });

  static getMyFollowers = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await FollowService.getFollowersById(user.id, q.page);
    const joined = await ProfileUtils.joinAll(
      services.map((s) => s.data),
      req.user?.id
    );
    const followers = joined.map((j) => ResponseFullSchema.parse(j));

    return ApiResponse.success(res, "Your followers.", { followers });
  });

  static getFollowing = catchAsync(async (req: Request, res: Response) => {
    const q = s
      .create({ id: s.fields.id, page: s.fields.page })
      .parse(req.query);

    const services = await FollowService.getFollowingsById(q.id, q.page);
    const followings = services.map((s) =>
      ResponseFullSchema.parse({ ...s, isFollowed: true })
    );

    return ApiResponse.success(res, "User's following.", { followings });
  });

  static getMyFollowing = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await FollowService.getFollowingsById(user.id, q.page);
    const followings = services.map((s) =>
      ResponseFullSchema.parse({ ...s, isFollowed: true })
    );

    return ApiResponse.success(res, "Your following.", { followings });
  });

  static followUser = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.body);

    if (user.id === q.id) throw new AppError("Invalid Request", 400);

    await FollowService.follow(q.id, user.id);

    return ApiResponse.success(res, "Followed.");
  });

  static unfollowUser = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.body);

    if (user.id === q.id) throw new AppError("Invalid Request", 400);

    await FollowService.unfollow(q.id, user.id);

    return ApiResponse.success(res, "Unfollowed.");
  });
}
