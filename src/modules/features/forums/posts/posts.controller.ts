import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { ForumService } from "./posts.service";
import { ProfileUtils } from "@modules/core/user-profile";
import { ApiResponse } from "@shared/utils/api-response";
import { LikeService } from "../reactions/like.service";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ForumCreateDto } from "./dtos/forum-create.dto";
import { ForumUpdateDto } from "./dtos/forum-update.dto";
import { ForumResponseSchema } from "./dtos/forum-response.dto";

export class ForumController {
  static getForums = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await ForumService.getLatest(q.page);
    const profiles = services.map((s) => s.data.writer);
    const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
    const profileMap: Record<string, any> = {};
    joined.map((j) => (profileMap[j.id] = j));
    const joinedForums = services.map((s) => ({
      ...s.data,
      writer: profileMap[s.data.userId],
    }));
    const liked = await LikeService.liked(
      joinedForums.map((s) => s.id),
      req.user?.id
    );
    const forums = joinedForums.map((j) =>
      ForumResponseSchema.parse({ ...j, isLiked: liked(j.id) })
    );

    return ApiResponse.success(res, "Forums fetched.", { forums });
  });

  static getUserForums = catchAsync(async (req: Request, res: Response) => {
    const q = s
      .create({ id: s.fields.id, page: s.fields.page })
      .parse(req.query);

    const services = await ForumService.getByUserId(q.id, q.page);
    const profiles = services.map((s) => s.data.writer);
    const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
    const profileMap: Record<string, any> = {};
    joined.map((j) => (profileMap[j.id] = j));
    const joinedForums = services.map((s) => ({
      ...s.data,
      writer: profileMap[s.data.userId],
    }));
    const liked = await LikeService.liked(
      joinedForums.map((s) => s.id),
      req.user?.id
    );
    const forums = joinedForums.map((j) =>
      ForumResponseSchema.parse({ ...j, isLiked: liked(j.id) })
    );

    return ApiResponse.success(res, "Forums fetched.", { forums });
  });

  static getMyForums = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await ForumService.getByUserId(user.id, q.page);
    const profiles = services.map((s) => s.data.writer);
    const joined = await ProfileUtils.joinAll(profiles, user.id);
    const profileMap: Record<string, any> = {};
    joined.map((j) => (profileMap[j.id] = j));
    const joinedForums = services.map((s) => ({
      ...s.data,
      writer: profileMap[s.data.userId],
    }));
    const liked = await LikeService.liked(
      joinedForums.map((s) => s.id),
      req.user?.id
    );
    const forums = joinedForums.map((j) =>
      ForumResponseSchema.parse({ ...j, isLiked: liked(j.id) })
    );

    return ApiResponse.success(res, "Forums fetched.", { forums });
  });

  static createForum = catchAsync(
    async (req: Request<{}, {}, ForumCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ForumService.create(req.body, user.id);
      const profile = service.data.writer;
      const [joined] = await ProfileUtils.joinAll([profile], user.id);
      const forum = ForumResponseSchema.parse({
        ...service.data,
        writer: joined,
      });

      return ApiResponse.success(res, "Forum created.", { forum });
    }
  );

  static updateForum = catchAsync(
    async (req: Request<{}, {}, ForumUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ForumService.update(req.body, user.id);
      const profile = service.data.writer;
      const [joined] = await ProfileUtils.joinAll([profile], user.id);
      const forum = ForumResponseSchema.parse({
        ...service.data,
        writer: joined,
      });

      return ApiResponse.success(res, "Forum updated.", { forum });
    }
  );

  static deleteForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    await ForumService.delete(q.id, user.id);

    return ApiResponse.success(res, "Forum deleted.");
  });
}
