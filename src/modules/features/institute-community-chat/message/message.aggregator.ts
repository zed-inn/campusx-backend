import { ProfileAggregator, ProfileService } from "@modules/core/profile";
import { MessageAttributes } from "./message.model";
import { MessageSchema } from "./dtos/discussion-response.dto";
import { ReactionService } from "../reactions/reaction.service";
import { ReactionStatService } from "../reactions/stat/stat.service";

export type IncompleteMessage = MessageAttributes & {
  isLiked?: boolean;
  stats?: { likes: number };
  writer?: Record<string, unknown>;
};

export class MessageAggregator {
  static addIsLiked = async (
    messages: IncompleteMessage[],
    reqUserId: string | null = null
  ) => {
    if (!reqUserId) return messages;

    const likes = await ReactionService.getReactionStatus(
      messages.map((p) => p.id),
      [reqUserId]
    );

    return messages.map((p) => ({ ...p, isLiked: likes(reqUserId, p.id) }));
  };

  static addStats = async (messages: IncompleteMessage[]) => {
    const messageIds = messages.map((m) => m.id);

    const rStats = await ReactionStatService.getByIds(messageIds);
    const rStatsMap: Record<string, any> = {};
    rStats.map((r) => (rStatsMap[r.id] = r));

    return messages.map((p) => ({
      ...p,
      stats: { likes: rStatsMap[p.id] },
    }));
  };

  static addWriter = async (
    messages: IncompleteMessage[],
    reqUserId?: string | null
  ) => {
    const userIds = messages.map((r) => r.userId);

    const iUsers = await ProfileService.getByIds(userIds);
    const tUsers = await ProfileAggregator.transform(iUsers, reqUserId);
    const userMap: Record<string, any> = {};
    tUsers.map((u) => (userMap[u.id] = u));

    return messages.map((r) => ({ ...r, writer: userMap[r.userId] }));
  };

  static transform = async (
    messages: IncompleteMessage[],
    reqUserId?: string | null
  ) => {
    const withIsLiked = await MessageAggregator.addIsLiked(messages);
    const withStats = await MessageAggregator.addStats(withIsLiked);
    const withWriter = await MessageAggregator.addWriter(withStats, reqUserId);

    return withWriter.map((m) => MessageSchema.parse(m));
  };
}
