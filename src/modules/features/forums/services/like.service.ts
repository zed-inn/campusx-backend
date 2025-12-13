import db from "@config/database";
import { Forum } from "../models/forum.model";
import { AppError } from "@shared/errors/app-error";
import { Like } from "../models/like.model";

export class LikeService {
  static likeForum = async (id: string, profileId: string) => {
    return await db.transaction(async (t) => {
      const forum = await Forum.findByPk(id);
      if (!forum) throw new AppError("Invalid Request.", 404);

      await Like.create({ forumId: id, profileId });
      await forum.increment({ likes: 1 });
    });
  };

  static unlikeForum = async (id: string, profileId: string) => {
    return await db.transaction(async (t) => {
      const like = await Like.findOne({ where: { forumId: id, profileId } });
      if (!like) throw new AppError("Invalid Request", 406);

      await Like.destroy();
      await Forum.decrement({ likes: 1 }, { where: { id } });
    });
  };
}
