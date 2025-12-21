import { defineModel } from "@shared/utils/define-model";
import {
  ReportAttributes,
  ReportCreationAttributes,
} from "../interfaces/report.interface";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Forum } from "./forum.model";
import { Profile } from "@modules/core/profile";

export const Report = defineModel<ReportAttributes, ReportCreationAttributes>(
  db,
  "ForumReport",
  {
    id: { ...PRIMARY_ID },
    forumId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Forum, key: "id" },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    reason: { type: DataTypes.STRING, allowNull: false },
  }
);

// Associations
Forum.hasMany(Report, {
  foreignKey: "forumId",
  as: "reports",
  onDelete: "CASCADE",
});
Report.belongsTo(Forum, { foreignKey: "forumId", as: "forum" });

Profile.hasMany(Report, {
  foreignKey: "userId",
  as: "reports",
  onDelete: "CASCADE",
});
Report.belongsTo(Profile, { foreignKey: "userId", as: "user" });
