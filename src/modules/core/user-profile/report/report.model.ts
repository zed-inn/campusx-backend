import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Profile } from "../profile/profile.model";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";

export const ReportModel = modelSchema({
  id: z.uuidv4("Invalid Report Id"),
  userId: z.uuidv4("Invalid User Id"),
  reportedBy: z.uuidv4("Invalid Reporting User Id"),
  reason: z.string("Invalid Reason").min(1, { error: "Reason is required" }),
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

export type ReportInstance = InstanceType<typeof Report>;
