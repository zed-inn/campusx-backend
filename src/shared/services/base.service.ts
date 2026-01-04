import { AppError } from "@shared/errors/app-error";
import { DB_Errors } from "@shared/errors/db-errors";
import { ExtendedModel } from "@shared/utils/define-model";
import { ModelStatic, WhereOptions, Attributes, Op } from "sequelize";

export abstract class BaseService<M extends ExtendedModel<any, any>> {
  protected model: ModelStatic<M>;

  constructor(model: ModelStatic<M>) {
    this.model = model;
  }

  getById = async (id: string) => {
    const instance = await this.model.findByPk(id);
    if (!instance) throw DB_Errors.notFound;
    return instance;
  };

  getByIds = async (ids: string[]) => {
    const instances = await this.model.findAll({
      where: { id: { [Op.in]: ids } } as WhereOptions<Attributes<M>>,
    });
    return instances.map((i) => i.plain) as Attributes<M>[];
  };

  create = async (data: any) => {
    const instance = await this.model.create(data);
    return instance;
  };

  deleteById = async (id: string) => {
    const instance = await this.getById(id);
    await instance.destroy();
    return instance.plain as Attributes<M>;
  };

  // Owner would be a user
  deleteByOwnerById = async (id: string, userId: string) => {
    const instance = await this.getById(id);
    this.checkOwnership(instance, userId);
    await instance.destroy();
    return instance.plain as Attributes<M>;
  };

  checkOwnership = (
    obj: M | Record<string, any>,
    value: any,
    keys: string | string[] = "userId"
  ) => {
    const plainedObj = "plain" in obj ? obj.plain : obj;

    const keysToCheck = Array.isArray(keys) ? keys : [keys];

    for (const key of keysToCheck) if (plainedObj[key] === value) return;

    throw new AppError("Invalid Request", 406);
  };
}
