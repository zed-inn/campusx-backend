import { z } from "zod";
import { EducationModel } from "../education.model";
import { InstituteResponseSmall } from "@modules/core/institutes";

export const ResponseFullSchema = EducationModel.dbSchema
  .pick({
    createDate: true,
    endMonth: true,
    endYear: true,
    id: true,
    startMonth: true,
    startYear: true,
    updateDate: true,
    description: true,
    userId: true,
  })
  .extend({
    institute: InstituteResponseSmall,
  });

export type ResponseFullDto = z.infer<typeof ResponseFullSchema>;

export const ResponseShortSchema = ResponseFullSchema.pick({
  createDate: true,
  endMonth: true,
  endYear: true,
  id: true,
  startMonth: true,
  startYear: true,
  updateDate: true,
  description: true,
  userId: true,
});

export type ResponseShortDto = z.infer<typeof ResponseShortSchema>;
