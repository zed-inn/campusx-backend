import { z } from "zod";
import { InstituteInterface } from "../../institute.interface";

export const InstituteSchema = InstituteInterface.dbSchema;

export type InstituteDto = z.infer<typeof InstituteSchema>;
