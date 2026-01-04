import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { STATS } from "@shared/utils/db-types";
import { Post } from "../../post/post.model";

export const ReactionStatModel = modelSchema({
  id: z.uuidv4("Invalid Stat Id"),
  likes: z.number().nonnegative(),
});

export type ReactionStatAttributes = z.infer<typeof ReactionStatModel.dbSchema>;
export type ReactionStatCreationAttributes = Omit<
  z.infer<typeof ReactionStatModel.dbFields>,
  "likes"
>;

export const ReactionStat = defineModel<
  ReactionStatAttributes,
  ReactionStatCreationAttributes
>(db, "ReactionStat", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    references: { model: Post, key: "id" },
  },
  likes: { ...STATS },
});

// Associations
Post.hasOne(ReactionStat, { foreignKey: "id", as: "reactionStat" });
ReactionStat.belongsTo(Post, { foreignKey: "id", as: "post" });

export type ReactionStatInstance = InstanceType<typeof ReactionStat>;
