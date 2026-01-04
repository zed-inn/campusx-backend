import {
  ModelStatic,
  Sequelize,
  Model,
  ModelAttributes,
  ModelOptions,
} from "sequelize";

export interface ExtendedModel<
  Attributes extends object,
  CreationAttributes extends object
> extends Model<Attributes, CreationAttributes> {
  readonly plain: Attributes;
}

export const defineModel = <
  Attributes extends object,
  CreationAttributes extends object
>(
  db: Sequelize,
  modelName: string,
  attributes: ModelAttributes,
  options?: ModelOptions
) => {
  const definedModel = db.define(modelName, attributes, options);

  // add a .plain property to get plained object
  Object.defineProperty(definedModel.prototype, "plain", {
    get() {
      return this.get({ plain: true });
    },
    configurable: true,
    enumerable: false,
  });

  return definedModel as ModelStatic<
    ExtendedModel<Attributes, CreationAttributes>
  >;
};
