import { Router } from "express";
import { ForumController } from "../posts/posts.controller";
import { LikeController } from "../reactions/like.controller";
import { CommentRouter } from "./comment.route";
import { ReportController } from "../report/report.controller";
import { mount } from "@shared/utils/mount-router";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import { ForumCreateSchema } from "../posts/dtos/forum-create.dto";
import { ForumUpdateSchema } from "../posts/dtos/forum-update.dto";

const router = Router();

router.get("/", ForumController.getUserForums);

router.get("/latest", ForumController.getForums);

router.get(
  "/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ForumController.getMyForums
);

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(ForumCreateSchema),
  ForumController.createForum
);

router.put(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(ForumUpdateSchema),
  ForumController.updateForum
);

router.delete(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ForumController.deleteForum
);

router.get(
  "/like",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  LikeController.likeForum
);

router.get(
  "/unlike",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  LikeController.unlikeForum
);

router.post(
  "/report",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ReportController.reportForum
);

router.use("/comments", CommentRouter);

export const ForumRouter = mount("/forums", router);
