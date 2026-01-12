import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { FeedbackGetFilterSchema } from "./dtos/feedback-get.admin.dto";
import { array } from "zod";
import { FeedbackSchema } from "./dtos/feedback-response.admin.dto";
import { FeedbackController } from "./feedback.admin.controller";
import {
  FeedbackDeleteSchema,
  FeedbackUpdateSchema,
} from "./dtos/feedback-action.admin.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Admin Feedback");

router
  .describe("Get feedbacks", "Get feedbacks by filter")
  .admin()
  .query(FeedbackGetFilterSchema)
  .output("feedbacks", array(FeedbackSchema), "Feedbacks fetched.")
  .get("/", FeedbackController.getFeedbacksByFilters);

router
  .describe("Update feedback", "Update feedback by Id")
  .admin()
  .body(FeedbackUpdateSchema)
  .output("feedback", FeedbackSchema, "Feedback updated.")
  .patch("/", FeedbackController.updateFeedback);

router
  .describe("Delete feedback", "Delete feedback by Id")
  .admin()
  .query(FeedbackDeleteSchema)
  .output(GlobalDeleteSchema, "Feedback deleted.")
  .delete("/", FeedbackController.deleteFeedback);

export const FeedbackAdminRouter = router;
