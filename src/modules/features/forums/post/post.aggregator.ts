import { ProfileAggregator, ProfileService } from "@modules/core/profile";
import { PostSchema } from "./dtos/post-response.dto";
import { PostAttributes } from "./post.model";
import { CommentStatService } from "../comments/stat/stat.service";
import { ReactionService } from "../reactions/reaction.service";
import { ReactionStatService } from "../reactions/stat/stat.service";

export type IncompletePost = PostAttributes & {
  isLiked?: boolean;
  stats?: { comments: number; likes: number };
  writer?: Record<string, unknown>;
};

export class PostAggregator {
  static addIsLiked = async (
    posts: IncompletePost[],
    reqUserId: string | null = null
  ) => {
    if (!reqUserId) return posts;

    const likes = await ReactionService.getReactionStatus(
      posts.map((p) => p.id),
      [reqUserId]
    );

    return posts.map((p) => ({ ...p, isLiked: likes(reqUserId, p.id) }));
  };

  static addStats = async (posts: IncompletePost[]) => {
    const postIds = posts.map((c) => c.id);

    const cStats = await CommentStatService.getByIds(postIds);
    const cStatsMap: Record<string, any> = {};
    cStats.map((c) => (cStatsMap[c.id] = c.comments));

    const rStats = await ReactionStatService.getByIds(postIds);
    const rStatsMap: Record<string, any> = {};
    rStats.map((r) => (rStatsMap[r.id] = r.likes));

    return posts.map((p) => ({
      ...p,
      stats: { comments: cStatsMap[p.id], likes: rStatsMap[p.id] },
    }));
  };

  static addWriter = async (
    posts: IncompletePost[],
    reqUserId?: string | null
  ) => {
    const writerIds = posts.map((c) => c.userId);

    const iWriters = await ProfileService.getByIds(writerIds);
    const tWriters = await ProfileAggregator.transform(iWriters, reqUserId);

    const writerMap: Record<string, any> = {};
    tWriters.map((w) => (writerMap[w.id] = w));

    return posts.map((p) => ({ ...p, writer: writerMap[p.userId] }));
  };

  static transform = async (
    posts: IncompletePost[],
    reqUserId: string | null = null
  ) => {
    const withIsLiked = await PostAggregator.addIsLiked(posts, reqUserId);
    const withStats = (await PostAggregator.addStats(
      withIsLiked
    )) as IncompletePost[];
    const withWriter = await PostAggregator.addWriter(withStats, reqUserId);

    return withWriter.map((p) => PostSchema.parse(p));
  };
}
