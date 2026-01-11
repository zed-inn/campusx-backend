import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { PostGetFilterSchema } from "./dtos/post-get.admin.dto";
import { array } from "zod";
import { PostSchema } from "./dtos/post-response.admin.dto";
import { PostController } from "./post.admin.controller";
import {
  PostCreateSchema,
  PostDeleteSchema,
  PostUpdateSchema,
} from "./dtos/post-action.admin.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Insights Post");

router
  .describe("Get posts", "Get posts by filtering")
  .admin()
  .query(PostGetFilterSchema)
  .output("posts", array(PostSchema), "Posts fetched.")
  .get("/", PostController.getPostsByFilter);

router
  .describe("Create post", "Create post")
  .admin()
  .body(PostCreateSchema)
  .output("post", PostSchema, "Post created.")
  .post("/", PostController.createPost);

router
  .describe("Update post", "Update post by Id")
  .admin()
  .body(PostUpdateSchema)
  .output("post", PostSchema, "Post updated.")
  .patch("/", PostController.updatePost);

router
  .describe("Delete post", "Delete post by Id")
  .admin()
  .query(PostDeleteSchema)
  .output(GlobalDeleteSchema, "Post deleted.")
  .delete("/", PostController.deletePost);

export const PostRouter = router;
