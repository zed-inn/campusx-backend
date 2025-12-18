import { DataTypes } from "sequelize";
import db from "@config/database";
import { defineModel } from "@shared/utils/define-model";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { LOG_CONFIG } from "./log.config";
import { LogAttributes, LogCreationAttributes } from "./log.interface";

export const Log = defineModel<LogAttributes, LogCreationAttributes>(
  db,
  "Log",
  {
    id: { ...PRIMARY_ID },
    level: {
      type: DataTypes.STRING,
      values: Object.values(LOG_CONFIG.LEVELS),
      allowNull: false,
    },
    message: { type: DataTypes.STRING, allowNull: false },
    req: { type: DataTypes.JSONB, allowNull: true },
    err: { type: DataTypes.JSONB, allowNull: true },
    meta: { type: DataTypes.JSONB, allowNull: true },
  }
);
