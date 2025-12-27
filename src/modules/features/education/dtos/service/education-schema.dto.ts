import { z } from "zod";
import { EducationInterface } from "../../education.interface";
import { InstituteSchema } from "@modules/core/institutes";
import { ProfileSchema } from "@modules/core/profile";

export const EducationSchema = EducationInterface.dbSchema.extend({
  institute: InstituteSchema,
  user: ProfileSchema,
});

export type EducationDto = z.infer<typeof EducationSchema>;
