import { z } from "zod";
import { InstituteModel } from "../../institute.model";

export const InstituteSchema = InstituteModel.dbSchema;

export type InstituteDto = z.infer<typeof InstituteSchema>;
