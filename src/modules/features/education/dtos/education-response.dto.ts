import { z } from "zod";
import { EducationInterface } from "../education.interface";

export const EducationResponseSchema = z.object({
  id: EducationInterface.fields.id,
  startYear: EducationInterface.fields.startYear,
  startMonth: EducationInterface.fields.startMonth,
  endYear: EducationInterface.fields.endYear.default(null),
  endMonth: EducationInterface.fields.endMonth.default(null),
  isCompleted: EducationInterface.fields.isCompleted.default(false),
  institute: EducationInterface.extra.fields.institute,
  user: EducationInterface.extra.fields.user,
});

export type EducationResponseDto = z.infer<typeof EducationResponseSchema>;
