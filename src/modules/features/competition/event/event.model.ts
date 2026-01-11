import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";
import { EVENT } from "./event.constants";
import { defineModel } from "@shared/utils/define-model";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { DataTypes } from "sequelize";
import db from "@config/database";

export const EventModel = modelSchema({
  id: z.uuidv4("Invalid Event Id"),
  name: z
    .string("Invalid Event Name")
    .min(EVENT.NAME.LENGTH.MIN, { error: "Event name is too short" })
    .max(EVENT.NAME.LENGTH.MAX, { error: "Event name is too long" }),
  description: z
    .string("Invalid Event Description")
    .min(EVENT.DESCRIPTION.LENGTH.MIN, {
      error: "Event description is too short",
    })
    .max(EVENT.DESCRIPTION.LENGTH.MAX, {
      error: "Event description is too long",
    }),
  rules: z
    .array(z.string())
    .min(EVENT.RULES.HOW_MANY.MIN, { error: "Rules are too few" })
    .max(EVENT.RULES.HOW_MANY.MAX, { error: "Rules are too many" }),
  prizes: z.array(
    z.object({
      position: z.string("Invalid Position"),
      amount: z.int("Invalid Amount").positive(),
      description: z.string("Invalid Prize Description"),
    })
  ),
  startDate: z.int("Invalid Start Date").positive(),
  endDate: z.int("Invalid End Date").positive(),
  posterUrl: z.url("Invalid Poster Url").nullable(),
  status: z.enum(EVENT.STATUS._),
  category: z.string("Invalid Category"),
  organizer: z.string("Invalid Organizer"),
});

export type EventAttributes = z.infer<typeof EventModel.dbSchema>;
export type EventCreationAttributes = Omit<
  z.infer<typeof EventModel.dbFields>,
  "id"
>;

export const Event = defineModel<EventAttributes, EventCreationAttributes>(
  db,
  "CompetitionEvent",
  {
    id: { ...PRIMARY_ID },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [EVENT.NAME.LENGTH.MIN, EVENT.NAME.LENGTH.MAX],
          msg: "Event name is not in appropriate length.",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [EVENT.DESCRIPTION.LENGTH.MIN, EVENT.DESCRIPTION.LENGTH.MAX],
          msg: "Event description is not in appropriate length.",
        },
      },
    },
    rules: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    prizes: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
    },
    startDate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("startDate");
        return rawValue ? parseInt(rawValue as string, 10) : null;
      },
    },
    endDate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("endDate");
        return rawValue ? parseInt(rawValue as string, 10) : null;
      },
    },
    posterUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { isUrl: true },
    },
    status: {
      type: DataTypes.STRING,
      values: EVENT.STATUS._,
      defaultValue: EVENT.STATUS.UPCOMING,
      allowNull: false,
    },
    category: { type: DataTypes.STRING, allowNull: false },
    organizer: { type: DataTypes.STRING, allowNull: false },
  }
);

export type EventInstance = InstanceType<typeof Event>;
