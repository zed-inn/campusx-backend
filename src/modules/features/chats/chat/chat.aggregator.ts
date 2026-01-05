import { ProfileAggregator, ProfileService } from "@modules/core/profile";
import { ChatAttributes } from "./chat.model";
import { ChatSchema } from "./dtos/chat-response.dto";

export type IncompleteChat = ChatAttributes & {
  friend?: Record<string, unknown>;
};

export class ChatAggregator {
  static addFriend = async (chats: IncompleteChat[], reqUserId: string) => {
    const friendIds = chats.map((c) =>
      c.userOneId === reqUserId ? c.userTwoId : c.userOneId
    );

    const iUsers = await ProfileService.getByIds(friendIds);
    const tUsers = await ProfileAggregator.transform(iUsers, reqUserId);
    const userMap: Record<string, any> = {};
    tUsers.map((u) => (userMap[u.id] = u));

    return chats.map((c) => ({
      ...c,
      friend: userMap[c.userOneId === reqUserId ? c.userTwoId : c.userOneId],
    }));
  };

  static transform = async (chats: IncompleteChat[], reqUserId: string) => {
    const withFriend = await ChatAggregator.addFriend(chats, reqUserId);

    return withFriend.map((c) => ChatSchema.parse(c));
  };
}
