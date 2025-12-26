import { z } from "zod";
import { EducationInterface } from "../../education.interface";
import { ProfileSchema } from "@modules/core/profile/dtos/service/profile-schema.dto";
import { InstituteSchema } from "@modules/core/institutes/dtos/service/institute-schema.dto";

export const EducationSchema = EducationInterface.dbSchema.extend({
  institute: InstituteSchema,
  user: ProfileSchema,
});

export type EducationDto = z.infer<typeof EducationSchema>;
