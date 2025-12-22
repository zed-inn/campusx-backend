import { z } from "zod";
import { FollowInterface } from "../interfaces/follow.interface";

export const FollowResponseSchema = FollowInterface.extra.fields.profile;

export type FollowResponseDto = z.infer<typeof FollowResponseSchema>;
