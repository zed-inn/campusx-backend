import { z } from "zod";
import db from "@config/database";
import { DataTypes } from "sequelize";
import { Institute } from "@modules/core/institutes/institute.model";
import { modelSchema } from "@shared/utils/model-schema";
import { defineModel } from "@shared/utils/define-model";
import { Profile } from "@modules/core/profile/profile.model";
import { REQUEST } from "./request.constants";
import { PRIMARY_ID } from "@shared/utils/db-types";

export const RequestModel = modelSchema({
  id: z.uuidv4("Invalid Request Id"),
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  reason: z
    .string("Invalid Reason")
    .min(REQUEST.REASON.LENGTH.MIN, { error: "Reason is too short" })
    .max(REQUEST.REASON.LENGTH.MAX, { error: "Reason is too long" })
    .nullable(),
  status: z.enum(REQUEST.STATUS._),
});

export type RequestAttributes = z.infer<typeof RequestModel.dbSchema>;
export type RequestCreationAttributes = Omit<
  z.infer<typeof RequestModel.dbFields>,
  "status"
>;

export const Request = defineModel<
  RequestAttributes,
  RequestCreationAttributes
>(db, "AmbassadorRequest", {
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
  reason: { type: DataTypes.STRING, allowNull: true },
  status: {
    type: DataTypes.STRING,
    values: REQUEST.STATUS._,
    allowNull: false,
    defaultValue: REQUEST.STATUS.PENDING,
  },
});

// Associations
Profile.hasMany(Request, {
  foreignKey: "id",
  onDelete: "CASCADE",
  as: "ambassadorRequest",
});
Request.belongsTo(Profile, { foreignKey: "id", as: "requester" });

Institute.hasMany(Request, {
  foreignKey: "instituteId",
  onDelete: "CASCADE",
  as: "ambassadorRequests",
});
Request.belongsTo(Institute, { foreignKey: "instituteId", as: "institute" });

export type RequestInstance = InstanceType<typeof Request>;
