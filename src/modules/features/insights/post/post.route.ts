import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { PostGetSchema } from "./dtos/post-get.dto";
import { PostsController } from "./post.controller";

const router = Router();

router.get(
  "/",
  ValidateReq.query(PostGetSchema),
  PostsController.getPublishedPosts
);

export const PostRouter = router;
