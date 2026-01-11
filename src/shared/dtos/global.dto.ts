import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const GlobalSchema = modelSchema({
  page: z.coerce
    .number("Invalid page")
    .positive("Page must be from 1-Inf")
    .default(1),
  timestamp: z.coerce
    .number("Invalid timestamp")
    .nonnegative("Timestamp can't be negative")
    .nullable()
    .default(null),
  order: z
    .string("Invalid Order")
    .refine((val) => {
      try {
        const lls = JSON.parse(val) as string[][];
        if (!Array.isArray(lls)) return false;
        for (const ls of lls) {
          if (!Array.isArray(ls) || ls.length !== 2) return false;
          for (const s of ls) if (typeof s !== "string") return false;
        }
        return true;
      } catch {
        return false;
      }
    })
    .transform((val) => JSON.parse(val) as string[][])
    .default([]),
});

export const GlobalDeleteSchema = z.object({
  id: z.uuidv4(),
  localId: z.string().nullish(),
});
