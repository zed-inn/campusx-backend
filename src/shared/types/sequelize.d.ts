import { Model } from "sequelize";

declare module "sequelize" {
  interface Model<TModelAttributes = any, TCreationAttributes = any> {
    get plain(): TModelAttributes;
  }
}
