import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { MessageService } from "./message.service";
import { MessageResponseSchema } from "./dtos/message-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class MessageController {
  static getInitialMessages = catchAsync(
    async (req: Request, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = s.create({ page: s.fields.page }).parse(req.query);

      const services = await MessageService.getLatest(user.id, q.page);
      const messages = services.map((s) =>
        MessageResponseSchema.parse({
          ...s.data,
          isDeletedByMe:
            user.id === s.data.senderId
              ? s.data.deletedBySender
              : s.data.deletedByReceiver,
        })
      );

      return ApiResponse.success(res, "Messages.", { messages });
    }
  );

  static getMessages = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s
      .create({ id: s.fields.string, page: s.fields.page })
      .parse(req.query);

    const services = await MessageService.getByChatId(q.id, q.page, user.id);
    const messages = services.map((s) =>
      MessageResponseSchema.parse({
        ...s.data,
        isDeletedByMe:
          user.id === s.data.senderId
            ? s.data.deletedBySender
            : s.data.deletedByReceiver,
      })
    );

    return ApiResponse.success(res, "Messages.", { messages });
  });
}
