import { z } from "zod";
import { EducationSchema } from "./education-schema.dto";

export const EducationCreateSchema = EducationSchema.pick({
  instituteId: true,
  startYear: true,
  startMonth: true,
  endYear: true,
  endMonth: true,
  description: true,
});

export type EducationCreateDto = z.infer<typeof EducationCreateSchema>;
