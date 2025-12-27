import { AppError } from "@shared/errors/app-error";
import { Model } from "sequelize";

export abstract class BaseService<M extends Model> {
  public model: M;

  constructor(model: M) {
    this.model = model;
  }

  get data(): any {
    return this.model.get({ plain: true });
  }

  public checkOwnership = (
    userId: string,
    alias: string | string[] = "userId"
  ) => {
    if (typeof alias === "string" && this.data[alias] !== userId)
      throw new AppError("Invalid Request", 406);
    else if (Array.isArray(alias)) {
      for (const key of alias) if (this.data[key] === userId) return;
      throw new AppError("Invalid Request", 406);
    }
  };
}
