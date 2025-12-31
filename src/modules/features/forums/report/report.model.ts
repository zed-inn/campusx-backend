import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Forum } from "../posts/posts.model";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { Profile } from "@modules/core/user-profile";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";

export const ReportModel = modelSchema({
  id: z.uuidv4("Invalid Report Id"),
  forumId: z.uuidv4("Invalid Forum Id"),
  userId: z.uuidv4("Invalid User Id"),
  reason: z.string("Invalid Reason").min(1, { error: "Reason is required" }),
});

export type ReportAttributes = z.infer<typeof ReportModel.dbSchema>;
export type ReportCreationAttributes = Omit<
  z.infer<typeof ReportModel.dbFields>,
  "id"
>;

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
    reason: { type: DataTypes.TEXT, allowNull: false },
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
  as: "forumReports",
  onDelete: "CASCADE",
});
Report.belongsTo(Profile, { foreignKey: "userId", as: "user" });

export type ReportInstance = InstanceType<typeof Report>;
