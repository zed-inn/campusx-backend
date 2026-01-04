import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { s } from "@shared/utils/create-schema";
import { ChatService } from "./chat.service";
import { ProfileUtils } from "@modules/core/profile";
import { ChatResponseSchema } from "./dtos/chat-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class ChatController {
  static getActiveChats = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s.create({ page: s.fields.page }).parse(req.query);

    const services = await ChatService.getActive(user.id, q.page);
    const chats = services.map(async (s) => {
      const t: any = s.data;
      if (t.userOne === user.id) t.friendProfile = t.userTwoProfile;
      else t.friendProfile = t.userOneProfile;
      t.friendProfile = await ProfileUtils.joinAll([t.friendProfile], user.id);
      return ChatResponseSchema.parse(t);
    });

    return ApiResponse.success(res, "Chats.", { chats });
  });
}
