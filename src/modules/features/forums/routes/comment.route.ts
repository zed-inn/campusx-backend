import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { CommentCreateSchema } from "../dtos/comment-create.dto";
import { CommentUpdateSchema } from "../dtos/comment-update.dto";

const router = Router();

router.get("/", CommentController.getForumComments);

router.post(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(CommentCreateSchema),
  CommentController.createComment
);

router.put(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(CommentUpdateSchema),
  CommentController.updateComment
);

router.delete("/", isLoggedIn, isProfiledUser, CommentController.deleteComment);

export const CommentRouter = router;
