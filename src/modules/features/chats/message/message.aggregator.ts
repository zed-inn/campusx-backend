import { ChatAggregator } from "../chat/chat.aggregator";
import { ChatService } from "../chat/chat.service";
import { MessageChatSchema } from "./dtos/message-response.dto";
import { MessageAttributes } from "./message.model";

export type IncompleteMessage = MessageAttributes & {
  chat?: Record<string, unknown>;
};

export class MessageAggregator {
  static addChat = async (messages: IncompleteMessage[], reqUserId: string) => {
    const chatIds = messages.map((m) => m.chatId);

    const iChats = await ChatService.getByIds(chatIds);
    const tChats = await ChatAggregator.transform(iChats, reqUserId);
    const chatMap: Record<string, any> = {};
    tChats.map((c) => (chatMap[c.id] = c));

    return messages.map((m) => ({ ...m, chat: chatMap[m.chatId] }));
  };

  static transform = async (
    messages: IncompleteMessage[],
    reqUserId: string
  ) => {
    const withChat = await MessageAggregator.addChat(messages, reqUserId);

    return withChat.map((m) => MessageChatSchema.parse(m));
  };
}
