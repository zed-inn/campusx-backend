import { z } from "zod";
import { EducationInterface } from "../education.interface";

export const EducationCreateSchema = z.object({
  userId: EducationInterface.fields.userId,
  instituteId: EducationInterface.fields.instituteId,
  startYear: EducationInterface.fields.startYear,
  startMonth: EducationInterface.fields.startMonth,
  endYear: EducationInterface.fields.endYear,
  endMonth: EducationInterface.fields.endMonth,
  isCompleted: EducationInterface.fields.isCompleted.default(false),
});

export type EducationCreateDto = z.infer<typeof EducationCreateSchema>;
