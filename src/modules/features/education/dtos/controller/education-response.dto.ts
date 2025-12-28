import { z } from "zod";
import { EducationSchema } from "../service/education-schema.dto";
import { ProfileResMin } from "@modules/core/profile";
import { Institute, InstituteResMin } from "@modules/core/institutes";

export const EducationResponseSchema = EducationSchema.pick({
  createDate: true,
  endMonth: true,
  endYear: true,
  id: true,
  isCompleted: true,
  startMonth: true,
  startYear: true,
  updateDate: true,
}).extend({
  Institute: InstituteResMin,
  user: ProfileResMin,
});

export type EducationResponseDto = z.infer<typeof EducationResponseSchema>;
