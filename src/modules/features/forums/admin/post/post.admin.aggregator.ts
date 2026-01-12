import { ProfileAggregator, ProfileService } from "@modules/core/profile";
import { PostAttributes } from "../../post/post.model";
import { CommentStatService } from "../../comments/stat/stat.service";
import { ReactionStatService } from "../../reactions/stat/stat.service";
import { PostSchema } from "./dtos/post-response.admin.dto";

export type IncompletePost = PostAttributes & {
  stats?: { comments: number; likes: number };
  user?: Record<string, unknown>;
};

export class PostAggregator {
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

  static addUser = async (posts: IncompletePost[]) => {
    const userIds = posts.map((c) => c.userId);

    const users = await ProfileService.getByIds(userIds);

    const userMap: Record<string, any> = {};
    users.map((w) => (userMap[w.id] = w));

    return posts.map((p) => ({ ...p, user: userMap[p.userId] }));
  };

  static transform = async (posts: IncompletePost[]) => {
    const withStats = await PostAggregator.addStats(posts);
    const withUser = await PostAggregator.addUser(withStats);

    return withUser.map((p) => PostSchema.parse(p));
  };
}
