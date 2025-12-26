import { Router } from "express";
import { InsightsController } from "./insights.controller";
import { mount } from "@shared/utils/mount-router";

const router = Router();

router.get("/categories", InsightsController.getCategories);

router.get("/", InsightsController.getPublishedInsights);

export const InsightsRouter = mount("/insights", router);
