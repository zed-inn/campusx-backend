import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { DiscussionCreateDto } from "./dtos/service/discussion-create.dto";
import { createSchema } from "@shared/utils/create-schema";
import { DiscussionService } from "./services/discussion.service";
import { DiscussionResponseSchema } from "./dtos/controller/discussion-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { LikeService } from "./services/like.service";
import { DiscussionUpdateDto } from "./dtos/service/discussion-update.dto";

export class DiscussionController {
  static getMessages = catchAsync(async (req: Request, res: Response) => {
    const q = createSchema({ page: "page", id: "id" }).parse(req.query);

    const services = await DiscussionService.getByInstituteId(
      q.id,
      q.page,
      req.user?.id
    );
    const messages = services.map((s) => DiscussionResponseSchema.parse(s));

    return ApiResponse.success(res, "Messages fetched.", {
      messages,
    });
  });

  static createMessage = catchAsync(
    async (req: Request<{}, {}, DiscussionCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await DiscussionService.create(req.body, user.id);
      const message = DiscussionResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Messaged.", { message });
    }
  );

  static updateMessage = catchAsync(
    async (req: Request<{}, {}, DiscussionUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await DiscussionService.update(req.body, user.id);
      const message = DiscussionResponseSchema.parse(service.data);

      return ApiResponse.success(res, "Message updated.", { message });
    }
  );

  static deleteMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ id: "id" }).parse(req.query);

    const service = await DiscussionService.delete(q.id, user.id);
    const message = DiscussionResponseSchema.parse(service.data);

    return ApiResponse.success(res, "Message deleted.", { message });
  });

  static likeMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ id: "id" }).parse(req.query);

    await LikeService.like(q.id, user.id);

    // TODO: notify about like by someone

    return ApiResponse.success(res, "Message liked.");
  });

  static unlikeMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ id: "id" }).parse(req.query);

    await LikeService.unlike(q.id, user.id);

    return ApiResponse.success(res, "Message unliked.");
  });
}
