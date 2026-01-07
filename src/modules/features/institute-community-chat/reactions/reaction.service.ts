import { BaseService } from "@shared/services/base.service";
import { Reaction, ReactionInstance } from "./reaction.model";
import { Op } from "sequelize";
import db from "@config/database";
import { MessageService } from "../message/message.service";
import { ReactionStatService } from "./stat/stat.service";
import { DB_Errors } from "@shared/errors/db-errors";

class _ReactionService extends BaseService<ReactionInstance> {
  constructor() {
    super(Reaction);
  }

  getReactionStatus = async (messageIds: string[], userIds: string[]) => {
    const reactionModels = await Reaction.findAll({
      where: {
        messageId: { [Op.in]: messageIds },
        userId: { [Op.in]: userIds },
      },
    });

    const reactionMap = new Set(
      reactionModels.map((r: any) => `${r.userId}|${r.messageId}`)
    );

    return (userId: string, messageId: string) => {
      const key = `${userId}|${messageId}`;
      return reactionMap.has(key);
    };
  };

  like = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const message = await MessageService.getById(id);
      const messageData = message.plain;

      // TODO: notify writer
      await this.create({ messageId: messageData.id, userId });
      await ReactionStatService.updateCounts(messageData.id, "likes", 1);
    });
  };

  unlike = async (id: string, userId: string) => {
    return await db.transaction(async () => {
      const message = await MessageService.getById(id);
      const messageData = message.plain;

      const reaction = await Reaction.findOne({
        where: { messageId: messageData.id },
      });
      if (!reaction) throw DB_Errors.notFound;

      this.checkOwnership(reaction, userId);
      await reaction.destroy();

      await ReactionStatService.updateCounts(messageData.id, "likes", -1);
    });
  };
}

export const ReactionService = new _ReactionService();
