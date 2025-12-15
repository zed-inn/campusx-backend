import {
  ModelStatic,
  Sequelize,
  Model,
  ModelAttributes,
  ModelOptions,
} from "sequelize";

export const defineModel = <
  Attributes extends object,
  CreationAttributes extends object
>(
  db: Sequelize,
  modelName: string,
  attributes: ModelAttributes,
  options?: ModelOptions
): ModelStatic<Model<Attributes, CreationAttributes>> => {
  return db.define(modelName, attributes, options) as ModelStatic<
    Model<Attributes, CreationAttributes>
  >;
};
