import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export const WalletFields = z.object({
    id: z.uuidv4(),
    
});

export const WalletDbSchema = BaseSchema.extend(WalletFields.shape);

export type WalletAttributes = z.infer<typeof WalletDbSchema>;

export type WalletCreationAttributes = Omit<z.infer<typeof WalletFields>, "">;

