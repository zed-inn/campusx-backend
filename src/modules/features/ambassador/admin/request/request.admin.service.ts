import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import {
  Request,
  RequestAttributes,
  RequestInstance,
} from "../../request/request.model";
import { RequestUpdateDto } from "./dtos/request-action.admin.dto";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";
import { RequestFiltersDto } from "./dtos/request-get.admin.dto";
import { OrderItem } from "sequelize";

class _RequestService extends BaseService<RequestInstance> {
  protected OFFSET = createOffsetFn(USERS_PER_PAGE);

  constructor() {
    super(Request);
  }

  getByFilters = async (
    filters: RequestFiltersDto,
    order: string[][],
    page: number
  ) => {
    const requests = await Request.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
      order: order as OrderItem[],
    });

    return requests.map((r) => r.plain);
  };

  update = async (data: RequestUpdateDto) => {
    const { id, ...updateData } = data;

    return await db.transaction(async () => {
      const request = await this.getById(id);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await request.update(cleanData as Partial<RequestAttributes>);

      return request;
    });
  };
}

export const RequestService = new _RequestService();
