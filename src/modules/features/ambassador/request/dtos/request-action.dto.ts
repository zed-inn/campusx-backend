import { z } from "zod";
import { RequestModel } from "../request.model";

export const RequestCreateSchema = z.object({
  instituteId: RequestModel.fields.instituteId,
  reason: RequestModel.fields.reason.default(null),
});

export type RequestCreateDto = z.infer<typeof RequestCreateSchema>;

export const RequestUpdateSchema = RequestModel.dbSchema
  .pick({ instituteId: true, reason: true })
  .partial()
  .extend({ id: RequestModel.fields.id });

export type RequestUpdateDto = z.infer<typeof RequestUpdateSchema>;

export const RequestDeleteSchema = RequestModel.dbSchema.pick({ id: true });

export type RequestDeleteDto = z.infer<typeof RequestDeleteSchema>;
