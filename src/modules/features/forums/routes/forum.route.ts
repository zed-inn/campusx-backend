import { Router } from "express";
import { ForumController } from "../controllers/forum.controller";
import { LikeController } from "../controllers/like.controller";
import { CommentRouter } from "./comment.route";
import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";

const router = Router();

router.get("/", ForumController.getUserForums);

router.get("/latest", ForumController.getForums);

router.get("/me", isLoggedIn, isProfiledUser, ForumController.getMyForums);

router.post("/", isLoggedIn, isProfiledUser, ForumController.createForum);

router.put("/", isLoggedIn, isProfiledUser, ForumController.updateForum);

router.delete("/", isLoggedIn, isProfiledUser, ForumController.deleteForum);

router.get("/like", isLoggedIn, isProfiledUser, LikeController.likeForum);

router.get("/unlike", isLoggedIn, isProfiledUser, LikeController.unlikeForum);

router.use("/comments", CommentRouter);

export const ForumRouter = router;
