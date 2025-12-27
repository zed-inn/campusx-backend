import { z } from "zod";
import { EducationSchema } from "../service/education-schema.dto";

export const EducationResponseSchema = EducationSchema.pick({
  createDate: true,
  endMonth: true,
  endYear: true,
  id: true,
  isCompleted: true,
  startMonth: true,
  startYear: true,
  updateDate: true,
  institute: true,
  user: true,
});

export type EducationResponseDto = z.infer<typeof EducationResponseSchema>;
