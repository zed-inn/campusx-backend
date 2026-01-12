import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Ambassador, AmbassadorInstance } from "../ambassador.model";
import { AmbassadorFiltersDto } from "./dtos/ambassador-get.admin.dto";
import { OrderItem } from "sequelize";
import { DB_Errors } from "@shared/errors/db-errors";

class _AmbassadorService extends BaseService<AmbassadorInstance> {
  protected OFFSET = createOffsetFn(USERS_PER_PAGE);

  constructor() {
    super(Ambassador);
  }

  getByFilters = async (
    filters: AmbassadorFiltersDto,
    order: string[][],
    page: number
  ) => {
    const ambasssadors = await Ambassador.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
      order: order as OrderItem[],
    });

    return ambasssadors.map((a) => a.plain);
  };

  deleteByUserId = async (userId: string) => {
    const ambassador = await Ambassador.findOne({ where: { userId } });
    if (!ambassador) throw DB_Errors.notFound;

    await ambassador.destroy();

    return ambassador.plain;
  };
}

export const AmbassadorService = new _AmbassadorService();
