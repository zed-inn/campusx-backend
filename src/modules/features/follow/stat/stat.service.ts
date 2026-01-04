import { BaseService } from "@shared/services/base.service";
import {
  FollowStat,
  FollowStatAttributes,
  FollowStatInstance,
} from "./stat.model";

class _FollowStatService extends BaseService<FollowStatInstance> {
  constructor() {
    super(FollowStat);
  }

  updateCounts = async (
    id: string,
    key: keyof FollowStatAttributes,
    value: number
  ) => {
    if (value === 0 || isNaN(value)) return;

    const [followStat, _] = await FollowStat.findOrCreate({
      where: { id },
      defaults: { id },
    });
    if (value > 0) await followStat.increment({ [key]: value });
    else await followStat.decrement({ [key]: Math.abs(value) });
  };
}

export const FollowStatService = new _FollowStatService();
