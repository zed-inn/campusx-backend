import db from "@config/database";
import { Reaction, ReactionInstance } from "./reaction.model";
import { BaseService } from "@shared/services/base.service";
import { Op } from "sequelize";
import { PostService } from "../post/post.service";
import { ReactionStatService } from "./stat/stat.service";

class _ReactionService extends BaseService<ReactionInstance> {
  constructor() {
    super(Reaction);
  }

  getReactionStatus = async (postIds: string[], userIds: string[]) => {
    const reactionModels = await Reaction.findAll({
      where: {
        postId: { [Op.in]: postIds },
        userId: { [Op.in]: userIds },
      },
    });

    const reactionMap = new Set(
      reactionModels.map((r: any) => `${r.userId}|${r.postId}`)
    );

    return (userId: string, postId: string) => {
      const key = `${userId}|${postId}`;
      return reactionMap.has(key);
    };
  };

  like = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const post = await PostService.getById(id);
      const postData = post.plain;

      await this.create({ postId: postData.id, userId });
      await ReactionStatService.updateCounts(postData.id, "likes", 1);
    });
  };

  unlike = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const post = await PostService.getById(id);
      const postData = post.plain;

      await this.deleteByOwnerById(postData.id, userId);
      await ReactionStatService.updateCounts(postData.id, "likes", -1);
    });
  };
}

export const ReactionService = new _ReactionService();
