import { Model } from "sequelize";

export const getModel = (model: any) =>
  model instanceof Model ? model.get({ plain: true }) : model;
