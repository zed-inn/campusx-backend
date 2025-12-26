import { DataTypes } from "sequelize";
import db from "@config/database";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { Profile } from "@modules/core/profile";
import {
  ForumAttributes,
  ForumCreationAttributes,
} from "../interfaces/forum.interface";

export const Forum = defineModel<ForumAttributes, ForumCreationAttributes>(
  db,
  "Forum",
  {
    id: { ...PRIMARY_ID },
    localId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    imageUrl: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    commentsCount: { ...STATS },
    likesCount: { ...STATS },
  }
);

// Associations
Profile.hasMany(Forum, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "forums",
});
Forum.belongsTo(Profile, { foreignKey: "userId", as: "writer" });
