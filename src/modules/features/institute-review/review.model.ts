import { defineModel } from "@shared/utils/define-model";
import { ReviewAttributes, ReviewCreationAttributes } from "./review.interface";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Institute } from "@modules/core/institutes";
import { Profile } from "@modules/core/profile";

export const Review = defineModel<ReviewAttributes, ReviewCreationAttributes>(
  db,
  "InstituteReview",
  {
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
    body: { type: DataTypes.STRING, allowNull: false },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0, max: 5 },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "instituteId"],
        name: "one_user_one_institute_review",
      },
    ],
  }
);

export type ReviewInstance = InstanceType<typeof Review>;

// Associations
Institute.hasMany(Review, {
  foreignKey: "instituteId",
  onDelete: "CASCADE",
  as: "reviews",
});
Review.belongsTo(Institute, { foreignKey: "instituteId", as: "institute" });

Profile.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(Profile, { foreignKey: "userId", as: "writer" });
