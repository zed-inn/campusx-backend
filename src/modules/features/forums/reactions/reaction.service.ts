import db from "@config/database";
import { Reaction, ReactionInstance } from "./reaction.model";
import { BaseService } from "@shared/services/base.service";
import { Op } from "sequelize";
import { PostService } from "../post/post.service";
import { ReactionStatService } from "./stat/stat.service";
import { DB_Errors } from "@shared/errors/db-errors";
import { ProfileService } from "@modules/core/profile";
import { NotificationService } from "@modules/core/notifications";
import { limitText } from "@shared/utils/limit-text";

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

      {
        const user = (await ProfileService.getById(userId)).plain;
        const notifiedUser = (await ProfileService.getById(postData.userId))
          .plain;
        await NotificationService.createNew(
          {
            type: "LIKE",
            title: `${user.fullName} liked your post ${limitText(
              postData.title,
              20
            )}`,
          },
          notifiedUser.id
        );
      }

      await this.create({ postId: postData.id, userId });
      await ReactionStatService.updateCounts(postData.id, "likes", 1);
    });
  };

  unlike = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const post = await PostService.getById(id);
      const postData = post.plain;

      const reaction = await Reaction.findOne({
        where: { postId: postData.id },
      });
      if (!reaction) throw DB_Errors.notFound;

      this.checkOwnership(reaction, userId);
      await reaction.destroy();

      await ReactionStatService.updateCounts(postData.id, "likes", -1);
    });
  };
}

export const ReactionService = new _ReactionService();
