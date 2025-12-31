import { z } from "zod";
import { EducationModel } from "../education.model";

export const EducationCreateSchema = EducationModel.dbSchema.pick({
  instituteId: true,
  startYear: true,
  startMonth: true,
  endYear: true,
  endMonth: true,
  description: true,
});

export type EducationCreateDto = z.infer<typeof EducationCreateSchema>;
