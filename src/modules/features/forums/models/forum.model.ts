import db from "@config/database";
import { Profile } from "@modules/core/profile";
import { PRIMARY_ID, STATS } from "@shared/utils/db-types";
import { DataTypes, Model, ModelStatic } from "sequelize";
import {
  ForumAttributes,
  ForumCreationAttributes,
} from "../interfaces/forum.interface";

const ForumModel = db.define("Forum", {
  id: { ...PRIMARY_ID },
  localId: { type: DataTypes.STRING, allowNull: true },
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Profile, key: "id" },
  },
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: true },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  comments: { ...STATS },
  likes: { ...STATS },
});

export const Forum = ForumModel as ModelStatic<
  Model<ForumAttributes, ForumCreationAttributes>
>;

Profile.hasMany(Forum, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
  as: "forums",
});
Forum.belongsTo(Profile, { foreignKey: "profileId", as: "writer" });
