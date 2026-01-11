import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ChatService } from "./chat.service";
import { ApiResponse } from "@shared/utils/api-response";
import { ChatGetActiveDto, ChatGetSingleDto } from "./dtos/chat-get.dto";
import { ChatAggregator } from "./chat.aggregator";
import { ChatSchema } from "./dtos/chat-response.dto";

export class ChatController {
  static getActiveChats = catchAsync(
    async (req: Request<{}, {}, {}, ChatGetActiveDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iChats = await ChatService.getActiveChatsOfUser(
        user.id,
        q.timestamp
      );
      const tChats = await ChatAggregator.transform(iChats, user.id);
      const pChats = tChats.map((c) => ChatSchema.parse(c));

      return ApiResponse.success(res, "Chats.", { chats: pChats });
    }
  );

  static getChat = catchAsync(
    async (req: Request<{}, {}, {}, ChatGetSingleDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iChat = await ChatService.getById(q.id);
      ChatService.belongsTo(iChat, user.id);
      const [tChat] = await ChatAggregator.transform([iChat.plain], user.id);
      const pChat = ChatSchema.parse(tChat);

      return ApiResponse.success(res, "Chat.", { chat: pChat });
    }
  );
}
