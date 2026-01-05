import { z } from "zod";
import { RequestModel } from "../request.model";
import { ShortInstituteSchema } from "@modules/core/institutes";

export const RequestSchema = RequestModel.dbSchema.extend({
  institute: ShortInstituteSchema,
});

export type RequestDto = z.infer<typeof RequestSchema>;
