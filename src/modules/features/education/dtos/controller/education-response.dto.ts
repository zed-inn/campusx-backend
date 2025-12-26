import { z } from "zod";
import { EducationInterface } from "../../education.interface";
import { ProfileResponseMinSchema as ResMinProfile } from "@modules/core/profile/dtos/controller/profile-response.dto";
import { InstituteResponseMinSchema as ResMinInstitute } from "@modules/core/institutes/dtos/controller/institute-response.dto";

export const EducationResponseSchema = EducationInterface.dbSchema
  .pick({
    createDate: true,
    endMonth: true,
    endYear: true,
    id: true,
    isCompleted: true,
    startMonth: true,
    startYear: true,
    updateDate: true,
  })
  .extend({
    institute: ResMinInstitute,
    user: ResMinProfile,
  });

export type EducationResponseDto = z.infer<typeof EducationResponseSchema>;
