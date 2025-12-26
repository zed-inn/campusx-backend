import { z } from "zod";
import { ReportInterface } from "../../interfaces/report.interface";
import { ProfileSchema } from "./profile-schema.dto";

export const ReportSchema = ReportInterface.dbSchema.extend({
  user: ProfileSchema,
});

export type ReportSchemaDto = z.infer<typeof ReportSchema>;
