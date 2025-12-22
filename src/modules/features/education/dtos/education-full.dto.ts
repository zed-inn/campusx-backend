import { z } from "zod";
import { EducationInterface } from "../education.interface";
import { InstituteInterface } from "@modules/core/institutes";
import { ProfileInterface } from "@modules/core/profile";

export const EducationFullSchema = EducationInterface.dbSchema.extend({
  institute: InstituteInterface.dbSchema,
  user: ProfileInterface.dbSchema.extend({ ...ProfileInterface.extra.fields }),
});

export type EducationFullDto = z.infer<typeof EducationFullSchema>;
