import { PostRouter } from "./post/post.route";
import { ReactionRouter } from "./reactions/reaction.route";
import { ReportRouter } from "./report/report.route";
import { CommentRouter } from "./comments/comment.route";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Forums");

router.use("/post", PostRouter);

router.use("/comment", CommentRouter);

router.use("/reaction", ReactionRouter);

router.use("/report", ReportRouter);

export const ForumRouter = router;
