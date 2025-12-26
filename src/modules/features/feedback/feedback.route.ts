import { Router } from "express";
import { FeedbackController } from "./feedback.controller";
import { mount } from "@shared/utils/mount-router";

const router = Router();

router.post("/", FeedbackController.giveFeedback);

export const FeedbackRouter = mount("/feedback", router);
