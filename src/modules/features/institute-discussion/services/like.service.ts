import { Like, LikeInstance } from "../models/like.model";
import { DiscussionService } from "./discussion.service";
import { DiscussionErrors } from "../discussion.errors";
import { BaseService } from "@shared/services/base.service";

export class LikeService extends BaseService<LikeInstance> {
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
