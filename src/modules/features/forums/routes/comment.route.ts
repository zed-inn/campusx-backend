import { Router } from "express";
import { CommentController } from "../comments/comment.controller";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import { CommentCreateSchema } from "../comments/dtos/comment-create.dto";
import { CommentUpdateSchema } from "../comments/dtos/comment-update.dto";

const router = Router();

router.get("/", CommentController.getForumComments);

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(CommentCreateSchema),
  CommentController.createComment
);

router.put(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(CommentUpdateSchema),
  CommentController.updateComment
);

router.delete(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  CommentController.deleteComment
);

export const CommentRouter = router;
