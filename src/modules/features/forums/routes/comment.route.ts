import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { CommentCreateSchema } from "../dtos/service/comment-create.dto";
import { CommentUpdateSchema } from "../dtos/service/comment-update.dto";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";

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
