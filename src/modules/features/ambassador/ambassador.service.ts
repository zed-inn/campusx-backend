import { BaseService } from "@shared/services/base.service";
import { Ambassador, AmbassadorInstance } from "./ambassador.model";
import { createOffsetFn } from "@shared/utils/create-offset";
import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import { Op } from "sequelize";

class _AmbassadorService extends BaseService<AmbassadorInstance> {
  protected OFFSET = createOffsetFn(USERS_PER_PAGE);

  constructor() {
    super(Ambassador);
  }

  getByInstituteId = async (instituteId: string, page: number) => {
    const ambassadors = await Ambassador.findAll({
      where: { instituteId },
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return ambassadors.map((a) => a.plain);
  };

  isUserAmbassador = async (userId: string) => {
    const ambassador = await Ambassador.findOne({ where: { userId } });
    return ambassador ? true : false;
  };

  getByUserIds = async (userIds: string[]) => {
    const ambassadors = await Ambassador.findAll({
      where: { userId: { [Op.in]: userIds } },
    });

    return ambassadors.map((a) => a.plain);
  };
}

export const AmbassadorService = new _AmbassadorService();
