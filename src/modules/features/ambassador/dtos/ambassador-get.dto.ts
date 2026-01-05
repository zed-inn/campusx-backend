import { z } from "zod";
import { AmbassadorModel } from "../ambassador.model";
import { GlobalSchema } from "@shared/dtos/global.dto";

export const AmbassadorGetInstituteSchema = z.object({
  instituteId: AmbassadorModel.fields.instituteId,
  page: GlobalSchema.fields.page,
});

export type AmbassadorGetInstituteDto = z.infer<
  typeof AmbassadorGetInstituteSchema
>;
