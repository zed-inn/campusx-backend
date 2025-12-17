import db from "@config/database";
import { AppError } from "@shared/errors/app-error";
import { Forum } from "../models/forum.model";
import { Like } from "../models/like.model";

export class LikeService {
  static likeForum = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const forum = await Forum.findByPk(id);
      if (!forum) throw new AppError("Forum not found.", 404);

      await Like.create({ forumId: id, userId });
      await forum.increment({ likesCount: 1 });
    });
  };

  static unlikeForum = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const like = await Like.findOne({ where: { forumId: id, userId } });
      if (!like) return;

      await Like.destroy();
      await Forum.decrement({ likesCount: 1 }, { where: { id } });
    });
  };
}
