import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const GlobalSchema = modelSchema({
  page: z.coerce
    .number("Invalid page")
    .positive("Page must be from 1-Inf")
    .default(1),
});
