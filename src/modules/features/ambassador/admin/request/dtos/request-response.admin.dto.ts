import { UserModel } from "@modules/core/user";
import { RequestModel } from "@modules/features/ambassador/request/request.model";
import { z } from "zod";

export const RequestSchema = RequestModel.dbSchema.extend({
  user: UserModel.dbSchema,
});

export type RequestDto = z.infer<typeof RequestSchema>;
