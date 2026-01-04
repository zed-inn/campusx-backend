import { z } from "zod";
import { EducationModel } from "../education.model";
import { ShortInstituteSchema } from "@modules/core/institutes";

export const EducationSchema = EducationModel.dbSchema.extend({
  institute: ShortInstituteSchema,
});

export type EducationDto = z.infer<typeof EducationSchema>;
