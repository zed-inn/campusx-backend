import db from "@config/database";
import { Like, LikeAttributes, LikeInstance } from "./like.model";
import { BaseService } from "@shared/services/base.service";
import { ForumErrors } from "../posts/posts.errors";
import { ForumService } from "../posts/posts.service";

export class LikeService extends BaseService<LikeInstance, LikeAttributes> {
  static liked = async (forumIds: string[], userId: string | null = null) => {
    if (!userId) return (forumId: string) => false;
    const likes = await Like.findAll({ where: { forumId: forumIds, userId } });
    const likeMap: Record<string, boolean> = {};
    likes.map(
      (l) => (likeMap[`${l.dataValues.forumId}-${l.dataValues.userId}`] = true)
    );

    return (forumId: string) => {
      const res = likeMap[`${forumId}-${userId}`];
      return res ? true : false;
    };
  };

  static likeForum = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const service = await ForumService.getById(id);

      const forum = service.model;
      await Like.create({ forumId: service.data.id, userId });
      await forum.increment({ likesCount: 1 });
    });
  };

  static unlikeForum = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const service = await ForumService.getById(id);

      const forum = service.model;
      const like = await Like.findOne({ where: { forumId: id, userId } });
      if (!like) return ForumErrors.notLiked;

      await like.destroy();
      await forum.decrement({ likesCount: 1 });
    });
  };
}
