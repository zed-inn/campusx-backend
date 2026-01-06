import { BaseService } from "@shared/services/base.service";
import { ReferralUse, ReferralUseInstance } from "./referral-use.model";
import { ReferralUseCreateDto } from "./dtos/referral-use-action.dto";
import { DB_Errors } from "@shared/errors/db-errors";

class _ReferralUseService extends BaseService<ReferralUseInstance> {
  constructor() {
    super(ReferralUse);
  }

  createNew = async (data: ReferralUseCreateDto) => {
    return await this.create(data);
  };

  getByUserId = async (userId: string) => {
    const refUse = await ReferralUse.findOne({ where: { userId } });
    if (!refUse) throw DB_Errors.notFound;

    return refUse;
  };
}

export const ReferralUseService = new _ReferralUseService();
