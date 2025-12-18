import db from "@config/database";
import { Forum } from "../models/forum.model";
import { Like } from "../models/like.model";
import { ForumService } from "./forum.service";
import { ProfileService } from "@modules/core/profile";

export class LikeService {
  static likeForum = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const forum = await ForumService.getById(id);
      const liker = await ProfileService.getById(userId);

      await Like.create({ forumId: id, userId });
      await Forum.increment({ likesCount: 1 }, { where: { id } });

      return { liker, forum };
    });
  };

  static unlikeForum = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const like = await Like.findOne({ where: { forumId: id, userId } });
      if (!like) return;

      await like.destroy();
      await Forum.decrement({ likesCount: 1 }, { where: { id } });
    });
  };
}
