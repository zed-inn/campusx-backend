import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { MessageService } from "./message.service";
import { ApiResponse } from "@shared/utils/api-response";
import { MessageGetChatDto, MessageGetLatestDto } from "./dtos/message-get.dto";
import { MessageSchema } from "./dtos/message-response.dto";

export class MessageController {
  static getLatestMessages = catchAsync(
    async (req: Request<{}, {}, {}, MessageGetLatestDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iMessages = await MessageService.getLatest(user.id, q.page);
      const pMessages = iMessages.map((m) => MessageSchema.parse(m));

      return ApiResponse.success(res, "Messages.", { messages: pMessages });
    }
  );

  static getMessages = catchAsync(
    async (req: Request<{}, {}, {}, MessageGetChatDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iMessages = await MessageService.getChatMessages(
        q.chatId,
        q.timestamp,
        user.id
      );
      const pMessages = iMessages.map((m) => MessageSchema.parse(m));

      return ApiResponse.success(res, "Messages.", { messages: pMessages });
    }
  );
}
