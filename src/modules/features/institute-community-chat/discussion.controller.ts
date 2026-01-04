import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { s } from "@shared/utils/create-schema";
import { DiscussionService } from "./message/message.service";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { LikeService } from "./reactions/like.service";
import { ProfileUtils } from "@modules/core/profile";
import { DiscussionResponseSchema } from "./message/dtos/discussion-response.dto";
import { DiscussionCreateDto } from "./message/dtos/discussion-create.dto";
import { DiscussionUpdateDto } from "./message/dtos/discussion-update.dto";

export class DiscussionController {
  static getMessages = catchAsync(async (req: Request, res: Response) => {
    const q = s
      .create({ id: s.fields.id, page: s.fields.page })
      .parse(req.query);

    const services = await DiscussionService.getByInstituteId(q.id, q.page);
    const profiles = [...services.map((s) => s.data.writer)];
    services.map((s) =>
      s.data.parentMessage ? profiles.push(s.data.parentMessage.writer) : null
    );
    const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
    const profileMap: Record<string, any> = {};
    joined.map((j) => (profileMap[j.id] = j));
    const joinedMessages = services.map((s) => ({
      ...s.data,
      writer: profileMap[s.data.userId],
      parentMessage: s.data.parentMessage
        ? {
            ...s.data.parentMessage,
            writer: profileMap[s.data.parentMessage.userId],
          }
        : null,
    }));
    const messages = joinedMessages.map((s) =>
      DiscussionResponseSchema.parse(s)
    );

    return ApiResponse.success(res, "Messages fetched.", { messages });
  });

  static createMessage = catchAsync(
    async (req: Request<{}, {}, DiscussionCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await DiscussionService.create(req.body, user.id);
      const profiles = [service.data.writer];
      if (service.data.parentMessage)
        profiles.push(service.data.parentMessage.writer);
      const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
      const profileMap: Record<string, any> = {};
      joined.map((j) => (profileMap[j.id] = j));
      const message = DiscussionResponseSchema.parse({
        ...service.data,
        writer: profileMap[service.data.userId],
        parentMessage: service.data.parentMessage
          ? {
              ...service.data.parentMessage,
              writer: profileMap[service.data.parentMessage.userId],
            }
          : null,
      });

      return ApiResponse.success(res, "Messaged.", { message });
    }
  );

  static updateMessage = catchAsync(
    async (req: Request<{}, {}, DiscussionUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const service = await DiscussionService.update(req.body, user.id);
      const profiles = [service.data.writer];
      if (service.data.parentMessage)
        profiles.push(service.data.parentMessage.writer);
      const joined = await ProfileUtils.joinAll(profiles, req.user?.id);
      const profileMap: Record<string, any> = {};
      joined.map((j) => (profileMap[j.id] = j));
      const message = DiscussionResponseSchema.parse({
        ...service.data,
        writer: profileMap[service.data.userId],
        parentMessage: service.data.parentMessage
          ? {
              ...service.data.parentMessage,
              writer: profileMap[service.data.parentMessage.userId],
            }
          : null,
      });

      return ApiResponse.success(res, "Message updated.", { message });
    }
  );

  static deleteMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    await DiscussionService.delete(q.id, user.id);

    return ApiResponse.success(res, "Message deleted.");
  });

  static likeMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    await LikeService.like(q.id, user.id);

    // TODO: notify about like by someone

    return ApiResponse.success(res, "Message liked.");
  });

  static unlikeMessage = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ id: s.fields.id }).parse(req.query);

    await LikeService.unlike(q.id, user.id);

    return ApiResponse.success(res, "Message unliked.");
  });
}
