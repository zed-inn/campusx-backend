import { defineModel } from "@shared/utils/define-model";
import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";
import { Profile } from "@modules/core/profile/profile.model";
import { AppError } from "@shared/errors/app-error";

export const ChatModel = modelSchema({
  id: z.uuidv4("Invalid Chat Id"),
  userOneId: z.uuidv4("Invalid User Id"),
  userTwoId: z.uuidv4("Invalid User Id"),
});

export type ChatAttributes = z.infer<typeof ChatModel.dbSchema>;
export type ChatCreationAttributes = Omit<
  z.infer<typeof ChatModel.dbFields>,
  "id"
>;

export const Chat = defineModel<ChatAttributes, ChatCreationAttributes>(
  db,
  "UserChat",
  {
    id: { ...PRIMARY_ID },
    userOneId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
    userTwoId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Profile, key: "id" },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userOneId", "userTwoId"],
        name: "chats_chat_two_diff_persons",
      },
    ],
  }
);

// Associations
Profile.hasMany(Chat, { foreignKey: "userOneId", onDelete: "CASCADE" });
Chat.belongsTo(Profile, { foreignKey: "userOneId", as: "userOne" });

Profile.hasMany(Chat, { foreignKey: "userTwoId", onDelete: "CASCADE" });
Chat.belongsTo(Profile, { foreignKey: "userTwoId", as: "userTwo" });

// Hooks
Chat.beforeCreate(async (chat: any) => {
  const exist = await Chat.findOne({
    where: { userOneId: chat.userTwoId, userTwoId: chat.userOneId },
  });

  if (exist)
    throw new AppError("Already started a chat with this person.", 406);
});

export type ChatInstance = InstanceType<typeof Chat>;
