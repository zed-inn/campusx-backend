import { mount } from "@shared/utils/mount-router";
import { Router } from "express";
import { PostRouter } from "./post/post.route";
import { ReactionRouter } from "./reactions/reaction.route";
import { ReportRouter } from "./report/report.route";
import { CommentRouter } from "./comments/comment.route";

const router = Router();

router.use("/post", PostRouter);

router.use("/comment", CommentRouter);

router.use("/reaction", ReactionRouter);

router.use("/report", ReportRouter);

export const ForumRouter = mount("/forums", router);
