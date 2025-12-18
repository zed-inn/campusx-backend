import { Router } from "express";
import { InsightsController } from "./insights.controller";

const router = Router();

router.get("/categories", InsightsController.getCategories);

router.get("/", InsightsController.getPublishedInsights);

export const InsightsRouter = router;
