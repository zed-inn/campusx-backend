import { Router } from "express";
import { ForumController } from "../controllers/forum.controller";
import { LikeController } from "../controllers/like.controller";
import { CommentRouter } from "./comment.route";
import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { ForumCreateSchema } from "../dtos/service/forum-create.dto";
import { ForumUpdateSchema } from "../dtos/service/forum-update.dto";
import { ReportController } from "../controllers/report.controller";
import { mount } from "@shared/utils/mount-router";

const router = Router();

router.get("/", ForumController.getUserForums);

router.get("/latest", ForumController.getForums);

router.get("/me", isLoggedIn, isProfiledUser, ForumController.getMyForums);

router.post(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(ForumCreateSchema),
  ForumController.createForum
);

router.put(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(ForumUpdateSchema),
  ForumController.updateForum
);

router.delete("/", isLoggedIn, isProfiledUser, ForumController.deleteForum);

router.get("/like", isLoggedIn, isProfiledUser, LikeController.likeForum);

router.get("/unlike", isLoggedIn, isProfiledUser, LikeController.unlikeForum);

router.post(
  "/report",
  isLoggedIn,
  isProfiledUser,
  ReportController.reportForum
);

router.use("/comments", CommentRouter);

export const ForumRouter = mount("/forums", router);
