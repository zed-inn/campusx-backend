import { z } from "zod";
import { EducationInterface } from "../education.interface";

export const EducationCreateSchema = z.object({
  instituteId: EducationInterface.fields.instituteId,
  startYear: EducationInterface.fields.startYear,
  startMonth: EducationInterface.fields.startMonth,
  endYear: EducationInterface.fields.endYear.default(null),
  endMonth: EducationInterface.fields.endMonth.default(null),
  isCompleted: EducationInterface.fields.isCompleted.default(false),
});

export type EducationCreateDto = z.infer<typeof EducationCreateSchema>;
