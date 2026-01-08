import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { Institute } from "@modules/core/institutes/institute.model";
import { Profile } from "@modules/core/profile/profile.model";
import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { REVIEW } from "./review.constants";

export const ReviewModel = modelSchema({
  id: z.uuidv4("Invalid Review Id"),
  localId: z.string("Invalid Local Id").nullable(),
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  body: z.string("Invalid Body"),
  rating: z
    .int("Invalid Rating")
    .min(REVIEW.RATING.MIN, {
      error: `Rating cannot be lower than ${REVIEW.RATING.MIN}`,
    })
    .max(REVIEW.RATING.MAX, {
      error: `Rating cannot be higher than ${REVIEW.RATING.MAX}`,
    }),
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
    localId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
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
    body: { type: DataTypes.TEXT, allowNull: false },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: REVIEW.RATING.MIN, max: REVIEW.RATING.MAX },
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
