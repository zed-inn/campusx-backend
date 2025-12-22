import { defineModel } from "@shared/utils/define-model";
import {
  ReportAttributes,
  ReportCreationAttributes,
} from "../interfaces/report.interface";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile";

export const Report = defineModel<ReportAttributes, ReportCreationAttributes>(
  db,
  "UserReport",
  {
    id: { ...PRIMARY_ID },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    reportedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    reason: { type: DataTypes.STRING, allowNull: false },
  }
);

// Associations
Profile.hasMany(Report, {
  foreignKey: "userId",
  as: "reports",
  onDelete: "CASCADE",
});
Report.belongsTo(Profile, { foreignKey: "userId", as: "user" });

Profile.hasMany(Report, {
  foreignKey: "reportedBy",
  as: "reported",
  onDelete: "CASCADE",
});
Report.belongsTo(Profile, { foreignKey: "reportedBy", as: "reportingUser" });
