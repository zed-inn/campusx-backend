import db from "@config/database";
import { Forum } from "../models/forum.model";
import { Like } from "../models/like.model";

export class LikeService {
  static likeForum = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      await Like.create({ forumId: id, userId });
      await Forum.increment({ likesCount: 1 }, { where: { id } });
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
