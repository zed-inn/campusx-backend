import { DataTypes, ModelAttributeColumnOptions } from "sequelize";

export const PRIMARY_ID: ModelAttributeColumnOptions = {
  type: DataTypes.UUID,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  unique: true,
};
