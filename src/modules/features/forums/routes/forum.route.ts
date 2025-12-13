import { Router } from "express";
import { ForumController } from "../controllers/forum.controller";
import { isLoggedIn, isUserProfiled } from "@shared/middlewares/auth-restrict";
import { LikeController } from "../controllers/like.controller";
import { CommentRouter } from "./comment.route";

const router = Router();

router.get("/", ForumController.getProfileForums);

router.get("/latest", ForumController.getForums);

router.get("/me", isLoggedIn, isUserProfiled, ForumController.getMyForums);

router.post("/", isLoggedIn, isUserProfiled, ForumController.createForum);

router.put("/", isLoggedIn, isUserProfiled, ForumController.updateForum);

router.delete("/", isLoggedIn, isUserProfiled, ForumController.deleteForum);

router.get("/like", isLoggedIn, isUserProfiled, LikeController.likeForum);

router.get("/unlike", isLoggedIn, isUserProfiled, LikeController.unlikeForum);

router.use("/comments", CommentRouter);

export const ForumRouter = router;
