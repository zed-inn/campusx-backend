import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { MessageGetPageDto } from "./dtos/message-get.dto";
import { MessageService } from "./message.service";
import { MessageAggregator } from "./message.aggregator";
import { MessageSchema } from "./dtos/discussion-response.dto";
import { ApiResponse } from "@shared/utils/api-response";
import {
  MessageCreateDto,
  MessageDeleteDto,
  MessageUpdateDto,
} from "./dtos/message-actions.dto";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

export class MessageController {
  static getMessages = catchAsync(
    async (req: Request<{}, {}, {}, MessageGetPageDto>, res: Response) => {
      const q = req.query;

      const iMessages = await MessageService.getByInstituteId(
        q.instituteId,
        q.page
      );
      const tMessages = await MessageAggregator.transform(
        iMessages,
        req.user?.id
      );
      const pMessages = tMessages.map((m) => MessageSchema.parse(m));

      return ApiResponse.success(res, "Messages fetched.", {
        messages: pMessages,
      });
    }
  );

  static createMessage = catchAsync(
    async (req: Request<{}, {}, MessageCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iMessage = await MessageService.createNew(req.body, user.id);
      const tMessage = await MessageAggregator.transform([iMessage.plain]);
      const pMessage = MessageSchema.parse(tMessage);

      return ApiResponse.success(res, "Messaged.", { message: pMessage });
    }
  );

  static updateMessage = catchAsync(
    async (req: Request<{}, {}, MessageUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iMessage = await MessageService.update(req.body, user.id);
      const tMessage = await MessageAggregator.transform([iMessage.plain]);
      const pMessage = MessageSchema.parse(tMessage);

      return ApiResponse.success(res, "Message updated.", {
        message: pMessage,
      });
    }
  );

  static deleteMessage = catchAsync(
    async (req: Request<{}, {}, {}, MessageDeleteDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const message = await MessageService.deleteByOwnerById(q.id, user.id);
      const responseData = GlobalDeleteSchema.parse(message);

      return ApiResponse.success(res, "Message deleted.", responseData);
    }
  );
}
