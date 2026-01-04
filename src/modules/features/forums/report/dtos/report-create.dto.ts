import { z } from "zod";
import { PostModel } from "../../post/post.model";
import { ReportModel } from "../report.model";

export const ReportCreateSchema = z.object({
  forumId: PostModel.fields.id,
  reason: ReportModel.fields.reason.default(null),
});

export type ReportCreateDto = z.infer<typeof ReportCreateSchema>;
