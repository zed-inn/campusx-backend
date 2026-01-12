import { z } from "zod";
import { AmbassadorModel } from "../../ambassador.model";
import { UserModel } from "@modules/core/user";

export const AmbassadorSchema = AmbassadorModel.dbSchema.extend({
  user: UserModel.dbSchema,
});

export type AmbassadorDto = z.infer<typeof AmbassadorSchema>;
