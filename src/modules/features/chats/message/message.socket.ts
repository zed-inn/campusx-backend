import { Socket } from "socket.io";
import {
  MessageCreateChatDto,
  MessageCreateChatSchema,
  MessageCreateUserDto,
  MessageCreateUserSchema,
  MessageReceivedDto,
  MessageReceivedSchema,
} from "./dtos/message-action.dto";
import { MessageService } from "./message.service";
import { MessageAggregator } from "./message.aggregator";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { MessageChatSchema, MessageSchema } from "./dtos/message-response.dto";
import { socketService } from "@shared/services/socket.service";
import { catchAsyncSocket } from "@shared/utils/catch-async";

export const MessageSocketController = (socket: Socket) => {
  socket.on(
    "chat:message-to",
    catchAsyncSocket(socket, async (payload: any) => {
      const _data: MessageCreateChatDto | MessageCreateUserDto =
        JSON.parse(payload);
      const user = AuthPayloadSchema.parse(socket.data.user);

      const isChatContaining = MessageCreateChatSchema.safeParse(_data);

      if (!isChatContaining.success) {
        const data = MessageCreateUserSchema.parse(_data);

        const iMessage = await MessageService.createByReceiverId(data, user.id);

        const [tMessage1] = await MessageAggregator.transform(
          [iMessage.plain],
          user.id
        );
        const pMessage1 = MessageChatSchema.parse(tMessage1);

        const userId =
          pMessage1.chat.userOneId === user.id
            ? pMessage1.chat.userTwoId
            : pMessage1.chat.userOneId;

        const [tMessage2] = await MessageAggregator.transform(
          [iMessage.plain],
          userId
        );
        const pMessage2 = MessageChatSchema.parse(tMessage2);

        socket.emit(
          "chat:message-received-by-server",
          JSON.stringify({ message: pMessage1 })
        );
        socketService.io
          .to(`user:${userId}`)
          .emit("chat:message-from", JSON.stringify({ message: pMessage2 }));
      } else {
        const data = MessageCreateChatSchema.parse(_data);

        const iMessage = await MessageService.createByChatId(data, user.id);
        const [tMessage] = await MessageAggregator.transform(
          [iMessage.plain],
          user.id
        );
        const pMessage = MessageSchema.parse(iMessage.plain);
        const pMessageWChat = MessageChatSchema.parse(tMessage);

        const userId =
          pMessageWChat.chat.userOneId === user.id
            ? pMessageWChat.chat.userTwoId
            : pMessageWChat.chat.userOneId;
        socket.emit(
          "chat:message-received-by-server",
          JSON.stringify({ message: pMessage })
        );
        socketService.io
          .to(`user:${userId}`)
          .emit("chat:message-from", JSON.stringify({ message: pMessage }));
      }
    })
  );

  socket.on(
    "chat:message-received",
    catchAsyncSocket(socket, async (payload: any) => {
      const data: MessageReceivedDto = MessageReceivedSchema.parse(
        JSON.parse(payload)
      );
      const user = AuthPayloadSchema.parse(socket.data.user);

      const iMessages = await MessageService.updateStatusByIds(
        [data.id],
        "Received"
      );
      const [tMessage] = await MessageAggregator.transform(iMessages, user.id);
      const pMessage = MessageSchema.parse(tMessage);
      const pMessageWChat = MessageChatSchema.parse(tMessage);

      const userId =
        pMessageWChat.chat.userOneId === user.id
          ? pMessageWChat.chat.userTwoId
          : pMessageWChat.chat.userOneId;

      socket.emit(
        "chat:message-received-by-server",
        JSON.stringify({ message: pMessage })
      );
      socketService.io
        .to(`user:${userId}`)
        .emit("chat:message-received", JSON.stringify({ message: pMessage }));
    })
  );
};
