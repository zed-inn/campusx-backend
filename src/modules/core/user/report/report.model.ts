import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { User } from "../user.model";
import { REPORT } from "./report.constants";

export const ReportModel = modelSchema({
  id: z.uuidv4("Invalid Report Id"),
  userId: z.uuidv4("Invalid User Id"),
  reportedBy: z.uuidv4("Invalid Reporting User Id"),
  reason: z
    .string("Invalid Reason")
    .min(REPORT.REASON.LENGTH.MIN, { error: "Reason is too short" })
    .max(REPORT.REASON.LENGTH.MAX, { error: "Reason is too long" })
    .nullable(),
});

export type ReportAttributes = z.infer<typeof ReportModel.dbSchema>;
export type ReportCreationAttributes = Omit<
  z.infer<typeof ReportModel.dbFields>,
  "id"
>;

export const Report = defineModel<ReportAttributes, ReportCreationAttributes>(
  db,
  "UserReport",
  {
    id: { ...PRIMARY_ID },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    reportedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: true,
      validate: {
        len: {
          args: [REPORT.REASON.LENGTH.MIN, REPORT.REASON.LENGTH.MAX],
          msg: "Invalid reason",
        },
      },
    },
  }
);

// Associations
User.hasMany(Report, {
  foreignKey: "userId",
  as: "reports",
  onDelete: "CASCADE",
});
Report.belongsTo(User, { foreignKey: "userId", as: "reported" });

User.hasMany(Report, {
  foreignKey: "reportedBy",
  onDelete: "CASCADE",
});
Report.belongsTo(User, { foreignKey: "reportedBy", as: "reporter" });

export type ReportInstance = InstanceType<typeof Report>;
