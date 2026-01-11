import { Socket } from "socket.io";
import {
  MessageCreateDto,
  MessageCreateSchema,
  MessageReceivedDto,
  MessageReceivedSchema,
  MessageUpdateSchema,
} from "./dtos/message-action.dto";
import { MessageService } from "./message.service";
import { MessageAggregator } from "./message.aggregator";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { MessageChatSchema, MessageSchema } from "./dtos/message-response.dto";
import { SocketService } from "@shared/services/socket.service";
import { catchAsyncSocket } from "@shared/utils/catch-async";
import { ChatService } from "../chat/chat.service";
import { SockRes } from "@shared/utils/api-response";

export const MessageSocketController = (socket: Socket) => {
  socket.on(
    "chat:message-to",
    catchAsyncSocket(socket, async (payload: any, callback: any) => {
      const data: MessageCreateDto = MessageCreateSchema.parse(payload);
      const user = AuthPayloadSchema.parse(socket.data.user);

      if (data.userId) {
        const iMessage = await MessageService.createByReceiverId(data, user.id);

        const [tMessage1] = await MessageAggregator.transform(
          [iMessage.plain],
          user.id
        );
        const pMessage = MessageSchema.parse(tMessage1);

        const pMessage1 = MessageChatSchema.parse(tMessage1);
        const userId = await ChatService.getOtherUser(pMessage1.chat, user.id);
        const [tMessage2] = await MessageAggregator.transform(
          [iMessage.plain],
          userId
        );
        const pMessage2 = MessageChatSchema.parse(tMessage2);

        callback(
          SockRes.data("Message received on server", {
            message: pMessage,
            chat: pMessage1.chat,
          })
        );
        SocketService.u.sendTo(
          userId,
          "chat:message-from",
          SockRes.data("Someone sent you a message", {
            message: pMessage,
            chat: pMessage2.chat,
          })
        );
      } else if (data.chatId) {
        const iMessage = await MessageService.createByChatId(data, user.id);
        const [tMessage] = await MessageAggregator.transform(
          [iMessage.plain],
          user.id
        );
        const pMessage = MessageSchema.parse(iMessage.plain);

        const pMessageWChat = MessageChatSchema.parse(tMessage);
        const userId = await ChatService.getOtherUser(
          pMessageWChat.chat,
          user.id
        );

        callback(
          SockRes.data("Message received on server", {
            message: pMessage,
          })
        );
        SocketService.u.sendTo(
          userId,
          "chat:message-from",
          SockRes.data("Someone sent you a message", { message: pMessage })
        );
      } else throw new Error("No userId or chatId given");
    })
  );

  socket.on(
    "chat:message-received",
    catchAsyncSocket(socket, async (payload: any, callback: any) => {
      const data: MessageReceivedDto = MessageReceivedSchema.parse(payload);
      const user = AuthPayloadSchema.parse(socket.data.user);

      const iMessages = await MessageService.updateStatusByIds(
        data.ids,
        "Received"
      );
      const tMessages = await MessageAggregator.transform(iMessages, user.id);
      const pMessages = tMessages.map((m) => MessageSchema.parse(m));

      callback(
        SockRes.data("Messages received on server", {
          messages: pMessages,
        })
      );

      const pMessagesWChat = tMessages.map((m) => MessageChatSchema.parse(m));
      for (const x of pMessagesWChat) {
        const userId = await ChatService.getOtherUser(x.chat, user.id);

        SocketService.u.sendTo(
          userId,
          "chat:message-received",
          SockRes.data("Message has been received by the other user", {
            messages: [x],
          })
        );
      }
    })
  );

  socket.on(
    "chat:message-update-to",
    catchAsyncSocket(socket, async (payload: any, callback: any) => {
      const data = MessageUpdateSchema.parse(payload);
      const user = AuthPayloadSchema.parse(socket.data.user);

      const iMessage = await MessageService.update(data, user.id);
      const pMessage = MessageSchema.parse(iMessage.plain);

      const userId = await ChatService.getOtherUser(pMessage.chatId, user.id);

      callback(SockRes.data("Message updated", { message: pMessage }));
      SocketService.u.sendTo(
        userId,
        "chat:message-update-from",
        SockRes.data("Message update from someone", { message: pMessage })
      );
    })
  );
};
