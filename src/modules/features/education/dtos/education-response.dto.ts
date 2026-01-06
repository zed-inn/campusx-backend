import { z } from "zod";
import { EducationModel } from "../education.model";
import { ShortInstituteSchema } from "@modules/core/institutes";
import { EducationCreateSchema, UniqueIdSchema } from "./education-action.dto";

export const EducationSchema = EducationModel.dbSchema.extend({
  institute: ShortInstituteSchema,
});

export type EducationDto = z.infer<typeof EducationSchema>;

export const EducationCreateResponseSchema = z.object({
  processed: z.array(
    z.object({ uniqueId: UniqueIdSchema, education: EducationSchema })
  ),
  unprocessed: z.array(UniqueIdSchema),
});

export type EducationCreateResponseDto = z.infer<
  typeof EducationCreateResponseSchema
>;
