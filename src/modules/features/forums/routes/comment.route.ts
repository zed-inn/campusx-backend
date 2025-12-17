import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";

const router = Router();

router.get("/", CommentController.getForumComments);

router.post("/", isLoggedIn, isProfiledUser, CommentController.createComment);

router.put("/", isLoggedIn, isProfiledUser, CommentController.updateComment);

router.delete("/", isLoggedIn, isProfiledUser, CommentController.deleteComment);

export const CommentRouter = router;
