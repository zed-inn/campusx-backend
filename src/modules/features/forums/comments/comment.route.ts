import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import {
  CommentCreateSchema,
  CommentDeleteSchema,
  CommentUpdateSchema,
} from "./dtos/comment-action.dto";
import { CommentController } from "./comment.controller";
import { CommentGetPostSchema } from "./dtos/comment-get.dto";

const router = Router();

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(CommentCreateSchema),
  CommentController.createComment
);

router.patch(
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
  ValidateReq.query(CommentDeleteSchema),
  CommentController.deleteComment
);

router.get(
  "/",
  ValidateReq.query(CommentGetPostSchema),
  CommentController.getPostComments
);

export const CommentRouter = router;
