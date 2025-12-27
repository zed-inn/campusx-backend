import { Router } from "express";
import { ForumController } from "../controllers/forum.controller";
import { LikeController } from "../controllers/like.controller";
import { CommentRouter } from "./comment.route";
import { ForumCreateSchema } from "../dtos/service/forum-create.dto";
import { ForumUpdateSchema } from "../dtos/service/forum-update.dto";
import { ReportController } from "../controllers/report.controller";
import { mount } from "@shared/utils/mount-router";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";

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
