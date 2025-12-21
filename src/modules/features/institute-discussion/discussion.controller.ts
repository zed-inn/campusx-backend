import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { DiscussionCreateDto } from "./dtos/discussion-create.dto";
import { DiscussionUpdateDto } from "./dtos/discussion-update.dto";
import { Parse } from "@shared/utils/parse-fields";
import { DiscussionService } from "./services/discussion.service";
import { DiscussionResponseSchema } from "./dtos/discussion-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { LikeService } from "./services/like.service";

export class DiscussionController {
  static getMessages = catchAsync(async (req: Request, res: Response) => {
    const page = Parse.pageNum(req.query.page);
    const instituteId = Parse.id(req.query.instituteId);

    const messages = await DiscussionService.getByInstituteId(
      instituteId,
      page,
      req.user?.id
    );
    const parsedMessages = messages.map((m) =>
      DiscussionResponseSchema.parse(m)
    );

    return ApiResponse.success(res, "Messages fetched.", {
      messages: parsedMessages,
    });
  });

  static createMessage = catchAsync(
    async (req: Request<{}, {}, DiscussionCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const message = await DiscussionService.create(req.body, user.id);
      const parsedMessage = DiscussionResponseSchema.parse(message);

      return ApiResponse.success(res, "Message created.", {
        message: parsedMessage,
      });
    }
  );

  static updateMessage = catchAsync(
    async (req: Request<{}, {}, DiscussionUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const message = await DiscussionService.update(req.body, user.id);
      const parsedMessage = DiscussionResponseSchema.parse(message);

      return ApiResponse.success(res, "Message updated.", {
        message: parsedMessage,
      });
    }
  );

  static deleteMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const id = Parse.id(req.query.id);

    const message = await DiscussionService.delete(id, user.id);
    const parsedMessage = DiscussionResponseSchema.parse(message);

    return ApiResponse.success(res, "Message deleted.", {
      message: parsedMessage,
    });
  });

  static likeMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const id = Parse.id(req.query.id);

    await LikeService.like(id, user.id);

    return ApiResponse.success(res, "Message liked.");
  });

  static unlikeMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const id = Parse.id(req.query.id);

    await LikeService.unlike(id, user.id);

    return ApiResponse.success(res, "Message unliked.");
  });
}
