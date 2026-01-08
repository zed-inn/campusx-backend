import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { MessageService } from "./message.service";
import { ApiResponse } from "@shared/utils/api-response";
import { MessageGetChatDto, MessageGetLatestDto } from "./dtos/message-get.dto";
import { MessageChatSchema, MessageSchema } from "./dtos/message-response.dto";
import {
  MessageCreateChatDto,
  MessageCreateUserDto,
} from "./dtos/message-action.dto";
import { MessageAggregator } from "./message.aggregator";

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

  static sendMessageInChat = catchAsync(
    async (req: Request<{}, {}, MessageCreateChatDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iMessage = await MessageService.createByChatId(req.body, user.id);
      const pMessage = MessageSchema.parse(iMessage.plain);

      return ApiResponse.success(res, "Messaged.", { message: pMessage });
    }
  );

  static sendMessageToUser = catchAsync(
    async (req: Request<{}, {}, MessageCreateUserDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iMessage = await MessageService.createByReceiverId(
        req.body,
        user.id
      );
      const [tMessage] = await MessageAggregator.transform(
        [iMessage.plain],
        user.id
      );
      const pMessage = MessageChatSchema.parse(tMessage);

      return ApiResponse.success(res, "Messaged.", { message: pMessage });
    }
  );
}
