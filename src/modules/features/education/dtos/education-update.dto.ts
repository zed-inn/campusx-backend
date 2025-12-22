import { z } from "zod";
import { EducationInterface } from "../education.interface";

export const EducationUpdateSchema = z.object({
  id: EducationInterface.fields.id,
  startYear: EducationInterface.fields.startYear.optional(),
  startMonth: EducationInterface.fields.startMonth.optional(),
  endYear: EducationInterface.fields.endYear.optional(),
  endMonth: EducationInterface.fields.endMonth.optional(),
  isCompleted: EducationInterface.fields.isCompleted.default(false).optional(),
});

export type EducationUpdateDto = z.infer<typeof EducationUpdateSchema>;
