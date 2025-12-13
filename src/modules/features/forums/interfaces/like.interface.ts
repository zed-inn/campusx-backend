import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export const LikeFields = z.object({
  forumId: z.uuidv4(),
  profileId: z.uuidv4(),
});

export const LikeDbSchema = BaseSchema.extend(LikeFields.shape);

export type LikeAttributes = z.infer<typeof LikeDbSchema>;

export type LikeCreationAttributes = z.infer<typeof LikeFields>;
