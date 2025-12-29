import { defineModel } from "@shared/utils/define-model";
import {
  DiscussionAttributes,
  DiscussionCreationAttributes,
} from "../interfaces/discussion.interface";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/profile";
import { Institute } from "@modules/core/institutes";

export const Discussion = defineModel<
  DiscussionAttributes,
  DiscussionCreationAttributes
>(db, "InstituteDiscussion", {
  id: { ...PRIMARY_ID },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Profile, key: "id" },
  },
  instituteId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Institute, key: "id" },
  },
  message: { type: DataTypes.STRING, allowNull: false },
  replyingTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: "InstituteDiscussions", key: "id" },
  },
});

export type DiscussionInstance = InstanceType<typeof Discussion>;

// Associations
Institute.hasMany(Discussion, {
  foreignKey: "instituteId",
  onDelete: "CASCADE",
  as: "discussions",
});
Discussion.belongsTo(Institute, { foreignKey: "instituteId", as: "institute" });

Profile.hasMany(Discussion, { foreignKey: "userId", as: "discussions" });
Discussion.belongsTo(Profile, { foreignKey: "userId", as: "writer" });

Discussion.hasMany(Discussion, { foreignKey: "replyingTo", as: "replies" });
Discussion.belongsTo(Discussion, {
  foreignKey: "replyingTo",
  as: "parentMessage",
});
