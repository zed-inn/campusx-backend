import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Profile } from "@modules/core/user-profile";
import { Institute } from "@modules/core/institutes";

import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const DiscussionModel = modelSchema({
  id: z.uuidv4("Invalid Discussion Id"),
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  message: z
    .string("Invalid Message")
    .min(1, { error: "Message must contain one letter atleast" }),
  replyingTo: z
    .uuidv4("Invalid Discussion Id To Reply")
    .nullable()
    .default(null),
});

export type DiscussionAttributes = z.infer<typeof DiscussionModel.dbSchema>;
export type DiscussionCreationAttributes = Omit<
  z.infer<typeof DiscussionModel.dbFields>,
  "id"
>;

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

export type DiscussionInstance = InstanceType<typeof Discussion>;
