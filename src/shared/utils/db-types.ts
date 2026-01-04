import { DataTypes, ModelAttributeColumnOptions } from "sequelize";

export const PRIMARY_ID: ModelAttributeColumnOptions = {
  type: DataTypes.UUID,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  unique: true,
};

export const STATS: ModelAttributeColumnOptions = {
  type: DataTypes.INTEGER,
  allowNull: false,
  validate: { min: 0 },
  defaultValue: 0,
};
