import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { RequestModel } from "@modules/features/ambassador/request/request.model";

export const RequestFiltersSchema = RequestModel.dbSchema.partial();

export type RequestFiltersDto = z.infer<typeof RequestFiltersSchema>;

export const RequestGetFilterSchema = RequestFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type RequestGetFilterDto = z.infer<typeof RequestGetFilterSchema>;
