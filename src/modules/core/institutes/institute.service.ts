import {
  Institute,
  InstituteAttributes,
  InstituteInstance,
} from "./institute.model";
import { literal } from "sequelize";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { InstituteErrors } from "./institute.errors";
import { INSTITUTES_PER_PAGE } from "@config/constants/items-per-page";

export class InstituteService extends BaseService<
  InstituteInstance,
  InstituteAttributes
> {
  protected static OFFSET = createOffsetFn(INSTITUTES_PER_PAGE);

  static getById = async (id: string) => {
    const institute = await Institute.findByPk(id);
    if (!institute) throw InstituteErrors.noInstituteFound;

    return new InstituteService(institute);
  };

  static getByIds = async (ids: string[]) => {
    const institutes = await Institute.findAll({ where: { id: ids } });

    return institutes.map((i) => new InstituteService(i));
  };

  static getAll = async (page: number) => {
    const institutes = await Institute.findAll({
      offset: this.OFFSET(page),
      limit: INSTITUTES_PER_PAGE,
      order: [["updateDate", "desc"]],
    });

    return institutes.map((i) => new InstituteService(i));
  };

  static getRandom = async () => {
    const institutes = await Institute.findAll({
      limit: INSTITUTES_PER_PAGE,
      order: literal("RANDOM()"),
    });

    return institutes.map((i) => new InstituteService(i));
  };
}
