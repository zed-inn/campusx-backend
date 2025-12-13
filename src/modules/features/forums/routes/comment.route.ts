import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { isLoggedIn, isUserProfiled } from "@shared/middlewares/auth-restrict";

const router = Router();

router.get("/", CommentController.getComments);

router.post("/", isLoggedIn, isUserProfiled, CommentController.createComment);

router.put("/", isLoggedIn, isUserProfiled, CommentController.updateComment);

router.delete("/", isLoggedIn, isUserProfiled, CommentController.deleteComment);

export const CommentRouter = router;
