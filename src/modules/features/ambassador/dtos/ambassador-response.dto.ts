import { z } from "zod";
import { AmbassadorModel } from "../ambassador.model";
import { InstituteResponseSmall } from "@modules/core/institutes";

export const ResponseFullSchema = AmbassadorModel.dbSchema
  .pick({
    id: true,
    createDate: true,
    updateDate: true,
    status: true,
    reason: true,
  })
  .extend({
    institute: InstituteResponseSmall,
  });

export type ResponseFullDto = z.infer<typeof ResponseFullSchema>;

export const ResponseShortSchema = ResponseFullSchema.pick({
  id: true,
  createDate: true,
  updateDate: true,
  status: true,
  reason: true,
});

export type ResponseShortDto = z.infer<typeof ResponseShortSchema>;
