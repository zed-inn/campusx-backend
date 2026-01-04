import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { STATS } from "@shared/utils/db-types";
import { Post } from "../../post/post.model";

export const CommentStatModel = modelSchema({
  id: z.uuidv4("Invalid Stat Id"),
  comments: z.number().nonnegative(),
});

export type CommentStatAttributes = z.infer<typeof CommentStatModel.dbSchema>;
export type CommentStatCreationAttributes = Omit<
  z.infer<typeof CommentStatModel.dbFields>,
  "comments"
>;

export const CommentStat = defineModel<
  CommentStatAttributes,
  CommentStatCreationAttributes
>(db, "CommentStat", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    references: { model: Post, key: "id" },
  },
  comments: { ...STATS },
});

// Associations
Post.hasOne(CommentStat, { foreignKey: "id", as: "commentStat" });
CommentStat.belongsTo(Post, { foreignKey: "id", as: "post" });

export type CommentStatInstance = InstanceType<typeof CommentStat>;
