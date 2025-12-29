import { z } from "zod";
import { EducationSchema } from "../service/education-schema.dto";
import { InstituteResMin } from "@modules/core/institutes";

export const EducationResponseSchema = EducationSchema.pick({
  createDate: true,
  endMonth: true,
  endYear: true,
  id: true,
  startMonth: true,
  startYear: true,
  updateDate: true,
  description: true,
  userId: true,
}).extend({
  institute: InstituteResMin,
});

export type EducationResponseDto = z.infer<typeof EducationResponseSchema>;
