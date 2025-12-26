import { Institute } from "./institute.model";
import { literal } from "sequelize";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { InstituteErrors } from "./institute.errors";
import { InstituteSchema } from "./dtos/service/institute-schema.dto";

export class InstituteService extends BaseService<
  InstanceType<typeof Institute>
> {
  protected static INSTITUTES_PER_PAGE = 30;
  protected static OFFSET = createOffsetFn(this.INSTITUTES_PER_PAGE);

  override get data() {
    const institute = super.data;
    return InstituteService.parse(institute);
  }

  static parse = (institute: any) => InstituteSchema.parse(institute);

  static getById = async (id: string) => {
    const institute = await Institute.findByPk(id);
    if (!institute) throw InstituteErrors.noInstituteFound;

    return new InstituteService(institute);
  };

  static getAll = async (page: number) => {
    const institutes = await Institute.findAll({
      offset: this.OFFSET(page),
      limit: this.INSTITUTES_PER_PAGE,
      order: [["updateDate", "desc"]],
    });

    return institutes.map((i) => new InstituteService(i));
  };

  static getRandom = async () => {
    const institutes = await Institute.findAll({
      limit: this.INSTITUTES_PER_PAGE,
      order: literal("RANDOM()"),
    });

    return institutes.map((i) => new InstituteService(i));
  };
}
