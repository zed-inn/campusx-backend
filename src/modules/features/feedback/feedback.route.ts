import { FeedbackController } from "./feedback.controller";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Feedback");

router
  .describe("Give Feedback", "Give feedback on website or app")
  .output("Feedback given.")
  .post("/", FeedbackController.giveFeedback);

export const FeedbackRouter = router;
