import { Router } from "express";
import { FeedbackController } from "./feedback.controller";

const router = Router();

router.post("/", FeedbackController.giveFeedback);

export const FeedbackRouter = router;
