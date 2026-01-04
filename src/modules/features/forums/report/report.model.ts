import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { Profile } from "@modules/core/profile";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { Post } from "../post/post.model";
import { REPORT } from "./report.constants";

export const ReportModel = modelSchema({
  id: z.uuidv4("Invalid Report Id"),
  postId: z.uuidv4("Invalid Post Id"),
  userId: z.uuidv4("Invalid User Id"),
  reason: z
    .string("Invalid Reason")
    .min(REPORT.REASON.LENGTH.MIN, { error: "Reason is required" })
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
  "ForumReport",
  {
    id: { ...PRIMARY_ID },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Post, key: "id" },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: {
          args: [REPORT.REASON.LENGTH.MIN, REPORT.REASON.LENGTH.MAX],
          msg: `Reason should be in limit of ${REPORT.REASON.LENGTH.MIN}-${REPORT.REASON.LENGTH.MAX} characters.`,
        },
      },
    },
  }
);

// Associations
Post.hasMany(Report, {
  foreignKey: "forumId",
  as: "reports",
  onDelete: "CASCADE",
});
Report.belongsTo(Post, { foreignKey: "forumId", as: "post" });

Profile.hasMany(Report, {
  foreignKey: "userId",
  as: "forumReports",
  onDelete: "CASCADE",
});
Report.belongsTo(Profile, { foreignKey: "userId", as: "user" });

export type ReportInstance = InstanceType<typeof Report>;
