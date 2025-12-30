import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { ForumService } from "../services/forum.service";
import { ForumResponseSchema } from "../dtos/controller/forum-response.dto";
import { ForumCreateDto } from "../dtos/service/forum-create.dto";
import { ForumUpdateDto } from "../dtos/service/forum-update.dto";

export class ForumController {
  static getForums = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await ForumService.getLatest(q.page, req.user?.id);
    const forums = services.map((s) => ForumResponseSchema.parse(s.data));

    return ApiResponse.success(res, "Forums fetched.", { forums });
  });

  static getUserForums = catchAsync(async (req: Request, res: Response) => {
    const q = s
      .create({ id: s.fields.id, page: s.fields.page })
      .parse(req.query);

    const services = await ForumService.getByUserId(q.id, q.page, req.user?.id);
    const forums = services.map((s) => ForumResponseSchema.parse(s.data));

    return ApiResponse.success(res, "Forums fetched.", { forums });
  });

  static getMyForums = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await ForumService.getByUserId(user.id, q.page);
    const forums = services.map((s) => ForumResponseSchema.parse(s.data));

    return ApiResponse.success(res, "Forums fetched.", { forums });
  });

  static createForum = catchAsync(
    async (req: Request<{}, {}, ForumCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ForumService.create(req.body, user.id);
      const forum = ForumResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Forum created.", { forum });
    }
  );

  static updateForum = catchAsync(
    async (req: Request<{}, {}, ForumUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await ForumService.update(req.body, user.id);
      const forum = ForumResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Forum updated.", { forum });
    }
  );

  static deleteForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    const service = await ForumService.delete(q.id, user.id);
    const forum = ForumResponseSchema.parse(service.data);

    return ApiResponse.success(res, "Forum deleted.", { forum });
  });
}
