import { AppError } from "@shared/errors/app-error";
import { Model } from "sequelize";
import { Type } from "typescript";
import { z } from "zod";

export abstract class BaseService<
  M extends Model,
  I extends Record<string, unknown>
> {
  public model: M;

  constructor(model: M) {
    this.model = model;
  }

  get data(): I {
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
