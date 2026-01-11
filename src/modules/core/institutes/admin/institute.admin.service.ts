import { BaseService } from "@shared/services/base.service";
import {
  InstituteCreateDto,
  InstituteUpdateDto,
} from "./dtos/institute-action.admin.dto";
import {
  Institute,
  InstituteAttributes,
  InstituteInstance,
} from "../institute.model";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";
import { InstituteFiltersDto } from "./dtos/institute-get.admin.dto";
import { createOffsetFn } from "@shared/utils/create-offset";
import { INSTITUTES_PER_PAGE } from "@config/constants/items-per-page";
import { OrderItem } from "sequelize";

class _InstituteAdminService extends BaseService<InstituteInstance> {
  protected OFFSET = createOffsetFn(INSTITUTES_PER_PAGE);

  constructor() {
    super(Institute);
  }

  createNew = async (data: InstituteCreateDto) => {
    return await this.create(data);
  };

  getByFilter = async (
    filters: InstituteFiltersDto,
    order: string[][],
    page: number
  ) => {
    const institutes = await Institute.findAll({
      where: { ...filters },
      offset: this.OFFSET(page),
      limit: INSTITUTES_PER_PAGE,
      order: order as OrderItem[],
    });

    return institutes.map((i) => i.plain);
  };

  update = async (data: InstituteUpdateDto) => {
    const { id, ...updateDate } = data;

    return await db.transaction(async () => {
      const institute = await this.getById(id);

      const cleanData = removeUndefined(updateDate);
      if (hasKeys(cleanData))
        await institute.update(cleanData as Partial<InstituteAttributes>);

      return institute;
    });
  };
}

export const InstituteService = new _InstituteAdminService();
