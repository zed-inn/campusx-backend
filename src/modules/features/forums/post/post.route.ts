import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import {
  PostCreateSchema,
  PostDeleteSchema,
  PostUpdateSchema,
} from "./dtos/post-action.dto";
import { PostController } from "./post.controller";
import {
  PostGetLatestSchema,
  PostGetMineSchema,
  PostGetUsersSchema,
} from "./dtos/post-get.dto";

const router = Router();

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(PostCreateSchema),
  PostController.createPost
);

router.patch(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(PostUpdateSchema),
  PostController.updatePost
);

router.delete(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(PostDeleteSchema),
  PostController.deletePost
);

router.get(
  "/latest",
  ValidateReq.query(PostGetLatestSchema),
  PostController.getLatestPosts
);

router.get(
  "/user",
  ValidateReq.query(PostGetUsersSchema),
  PostController.getUserPosts
);

router.get(
  "/user/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(PostGetMineSchema),
  PostController.getMyPosts
);

export const PostRouter = router;
