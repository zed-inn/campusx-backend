import db from "@config/database";
import { Profile } from "@modules/core/profile/profile.model";
import { defineModel } from "@shared/utils/define-model";
import { DataTypes } from "sequelize";
import { Message } from "../message/message.model";
import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const ReactionModel = modelSchema({
  userId: z.uuidv4("Invalid User Id"),
  messageId: z.uuidv4("Invalid Message Id"),
});

export type ReactionAttributes = z.infer<typeof ReactionModel.dbSchema>;
export type ReactionCreationAttributes = Omit<
  z.infer<typeof ReactionModel.dbFields>,
  never
>;

export const Reaction = defineModel<
  ReactionAttributes,
  ReactionCreationAttributes
>(
  db,
  "MessageReaction",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    messageId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Message, key: "id" },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "messageId"],
        name: "community_chat_one_like_per_user",
      },
    ],
  }
);

// Associations
Message.hasMany(Reaction, {
  foreignKey: "messageId",
  onDelete: "CASCADE",
  as: "reactions",
});
Reaction.belongsTo(Message, { foreignKey: "messageId", as: "message" });

Profile.hasMany(Reaction, { foreignKey: "userId", onDelete: "CASCADE" });
Reaction.belongsTo(Profile, { foreignKey: "userId" });

export type ReactionInstance = InstanceType<typeof Reaction>;
