import { RequestModel } from "@modules/features/ambassador/request/request.model";
import { z } from "zod";

export const RequestUpdateSchema = RequestModel.dbFields
  .omit({ id: true })
  .partial()
  .extend({ id: RequestModel.fields.id });

export type RequestUpdateDto = z.infer<typeof RequestUpdateSchema>;
