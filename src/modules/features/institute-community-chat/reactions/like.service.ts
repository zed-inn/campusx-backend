import { Like, LikeAttributes, LikeInstance } from "./like.model";
import { DiscussionService } from "../message/message.service";
import { DiscussionErrors } from "../discussion.errors";
import { BaseService } from "@shared/services/base.service";

export class LikeService extends BaseService<LikeInstance, LikeAttributes> {
  static liked = async (ids: string[], userId: string | null = null) => {
    if (!userId) return (discId: string) => false;
    const likes = await Like.findAll({ where: { discussionId: ids, userId } });
    const likeMap: Record<string, boolean> = {};
    likes.map(
      (l) =>
        (likeMap[`${l.dataValues.discussionId}-${l.dataValues.userId}`] = true)
    );

    return (discId: string) => {
      const res = likeMap[`${discId}-${userId}`];
      return res ? true : false;
    };
  };

  static like = async (id: string, userId: string) => {
    const service = await DiscussionService.getById(id);
    await Like.create({ discussionId: service.data.id, userId });
  };

  static unlike = async (id: string, userId: string) => {
    const like = await Like.findOne({ where: { discussionId: id, userId } });
    if (!like) throw DiscussionErrors.noLikeFound;
    await like.destroy();
  };
}
