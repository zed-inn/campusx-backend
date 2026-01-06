import { MessageSchema } from "./dtos/message-response.dto";
import { MessageAttributes } from "./message.model";

export type IncompleteMessage = MessageAttributes & {
  chat?: { localId: unknown };
};

export class MessageAggregator {
  static addChat = async (messages: IncompleteMessage[]) => {
    return messages;
  };

  static transform = async (messages: IncompleteMessage[]) => {
    const withChat = await MessageAggregator.addChat(messages);

    return withChat.map((m) => MessageSchema.parse(m));
  };
}
