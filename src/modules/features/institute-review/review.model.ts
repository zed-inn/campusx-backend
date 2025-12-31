import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Institute } from "@modules/core/institutes";
import { Profile } from "@modules/core/user-profile";
import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const ReviewModel = modelSchema({
  id: z.uuidv4("Invalid Review Id"),
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  body: z.string("Invalid Body"),
  rating: z
    .int("Invalid Rating")
    .min(0, { error: "Rating cannot be lower than 1" })
    .max(5, { error: "Rating cannot be higher than 5" }),
});

export type ReviewAttributes = z.infer<typeof ReviewModel.dbSchema>;
export type ReviewCreationAttributes = Omit<
  z.infer<typeof ReviewModel.dbFields>,
  "id"
>;

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

// Associations
Institute.hasMany(Review, {
  foreignKey: "instituteId",
  onDelete: "CASCADE",
  as: "reviews",
});
Review.belongsTo(Institute, { foreignKey: "instituteId", as: "institute" });

Profile.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(Profile, { foreignKey: "userId", as: "writer" });

export type ReviewInstance = InstanceType<typeof Review>;
