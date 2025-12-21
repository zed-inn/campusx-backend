import { AppError } from "@shared/errors/app-error";
import { Like } from "../models/like.model";

export class LikeService {
  static like = async (id: string, userId: string) => {
    const like = await Like.create({ discussionId: id, userId });
    return like.get({ plain: true });
  };

  static unlike = async (id: string, userId: string) => {
    const like = await Like.findOne({ where: { discussionId: id, userId } });
    if (!like) throw new AppError("No Like Found.", 404);

    const likeData = like.get({ plain: true });

    await like.destroy();

    return likeData;
  };
}
