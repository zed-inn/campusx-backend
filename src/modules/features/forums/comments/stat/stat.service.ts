import { BaseService } from "@shared/services/base.service";
import {
  CommentStat,
  CommentStatAttributes,
  CommentStatInstance,
} from "./stat.model";

class _StatService extends BaseService<CommentStatInstance> {
  constructor() {
    super(CommentStat);
  }

  updateCounts = async (
    id: string,
    key: keyof CommentStatAttributes,
    value: number
  ) => {
    if (value === 0 || isNaN(value)) return;

    const [commentStat, _] = await CommentStat.findOrCreate({
      where: { id },
      defaults: { id },
    });
    if (value > 0) await commentStat.increment({ [key]: value });
    else await commentStat.decrement({ [key]: Math.abs(value) });
  };
}

export const CommentStatService = new _StatService();
