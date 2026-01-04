import { Router } from "express";
import { mount } from "@shared/utils/mount-router";
import { CategoryRouter } from "./category/category.route";
import { PostRouter } from "./post/post.route";

const router = Router();

router.use("/category", CategoryRouter);

router.use("/post", PostRouter);

export const InsightsRouter = mount("/insights", router);
