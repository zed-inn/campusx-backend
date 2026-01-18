import { z } from "zod";
import { LogInterface } from "../log.interface";

export const LogSchema = LogInterface.dbSchema;

export type LogDto = z.infer<typeof LogSchema>;
