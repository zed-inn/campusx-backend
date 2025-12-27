import db from "@config/database";
import { Like, LikeInstance } from "../models/like.model";
import { ForumService } from "./forum.service";
import { BaseService } from "@shared/services/base.service";
import { ForumErrors } from "../errors/forum.errors";

export class LikeService extends BaseService<LikeInstance> {
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
