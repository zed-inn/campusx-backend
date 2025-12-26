import { z } from "zod";
import { EducationInterface } from "../../education.interface";

export const EducationCreateSchema = EducationInterface.dbSchema.pick({
  instituteId: true,
  startYear: true,
  startMonth: true,
  endYear: true,
  endMonth: true,
  isCompleted: true,
});

export type EducationCreateDto = z.infer<typeof EducationCreateSchema>;
