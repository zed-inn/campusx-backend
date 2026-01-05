import { BaseService } from "@shared/services/base.service";
import {
  ReactionStat,
  ReactionStatAttributes,
  ReactionStatInstance,
} from "./stat.model";

class _StatService extends BaseService<ReactionStatInstance> {
  constructor() {
    super(ReactionStat);
  }

  updateCounts = async (
    id: string,
    key: keyof ReactionStatAttributes,
    value: number
  ) => {
    if (value === 0 || isNaN(value)) return;

    const [reactStat, _] = await ReactionStat.findOrCreate({
      where: { id },
      defaults: { id },
    });
    if (value > 0) await reactStat.increment({ [key]: value });
    else await reactStat.decrement({ [key]: Math.abs(value) });
  };
}

export const ReactionStatService = new _StatService();
