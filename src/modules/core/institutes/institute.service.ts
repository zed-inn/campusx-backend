import {
  Institute,
  InstituteAttributes,
  InstituteInstance,
} from "./institute.model";
import { Op } from "sequelize";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { INSTITUTES_PER_PAGE } from "@config/constants/items-per-page";
import { InstituteGetPageDto } from "./dtos/institute-get.dto";

class _InstituteService extends BaseService<InstituteInstance> {
  protected OFFSET = createOffsetFn(INSTITUTES_PER_PAGE);

  constructor() {
    super(Institute);
  }

  filterByPage = async (data: InstituteGetPageDto) => {
    const { page, ...filters } = data;

    const institutes = await Institute.findAll({
      where: {
        ...(filters.name
          ? { nameNormalized: { [Op.iLike]: `%${filters.name}%` } }
          : {}),
        ...(filters.district ? { district: filters.district } : {}),
        ...(filters.state ? { state: filters.state } : {}),
      },
      offset: this.OFFSET(page),
      limit: INSTITUTES_PER_PAGE,
      order: [["updateDate", "desc"]],
    });

    return institutes.map((i) => i.plain);
  };

  getTwoFieldMap = async (
    field1: keyof InstituteAttributes,
    field2: keyof InstituteAttributes
  ) => {
    const fieldMap = await Institute.findAll({
      attributes: [field1, field2],
      group: [field1, field2],
      raw: true,
      order: [
        [field1, "ASC"],
        [field2, "ASC"],
      ],
    });

    return fieldMap as unknown as Record<string, string>[];
  };
}

export const InstituteService = new _InstituteService();
