import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";
import { Profile } from "@modules/core/user-profile";

export const ChatModel = modelSchema({
  id: z.uuidv4("Invalid Chat Id"),
  localId: z.string("Invalid Local Id").nullable().default(null),
  userOne: z.uuidv4("Invalid User Id"),
  userTwo: z.uuidv4("Invalid User Id"),
  randomUpdate: z.string(),
});

export type ChatAttributes = z.infer<typeof ChatModel.dbSchema>;
export type ChatCreationAttributes = Omit<
  z.infer<typeof ChatModel.dbFields>,
  "id" | "randomUpdate"
>;

export const Chat = defineModel<ChatAttributes, ChatCreationAttributes>(
  db,
  "Chat",
  {
    id: { ...PRIMARY_ID },
    localId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    userOne: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    userTwo: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    randomUpdate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "start",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userOne", "userTwo"],
        name: "unique_chat_per_persons",
      },
    ],
  }
);

// Associations
Profile.hasMany(Chat, {
  foreignKey: "userOne",
  onDelete: "CASCADE",
  as: "chatsOne",
});
Chat.belongsTo(Profile, { foreignKey: "userOne", as: "userOneProfile" });

Profile.hasMany(Chat, {
  foreignKey: "userTwo",
  onDelete: "CASCADE",
  as: "chatsTwo",
});
Chat.belongsTo(Profile, { foreignKey: "userTwo", as: "userTwoProfile" });

export type ChatInstance = InstanceType<typeof Chat>;
