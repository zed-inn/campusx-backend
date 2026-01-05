import { DetailedRouter } from "@shared/infra/http/detailed-router";
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
import { PostSchema } from "./dtos/post-response.dto";
import { array } from "zod";

const router = new DetailedRouter("Forums");

router
  .describe("Create Post", "Publish a new post to the feed.")
  .userProfiled()
  .body(PostCreateSchema)
  .output("forum", PostSchema, "Forum created.")
  .post("/", PostController.createPost);

router
  .describe("Update Post", "Edit the content of an existing post.")
  .userProfiled()
  .body(PostUpdateSchema)
  .output("forum", PostSchema, "Forum updated.")
  .patch("/", PostController.updatePost);

router
  .describe("Delete Post", "Permanently remove a post.")
  .userProfiled()
  .query(PostDeleteSchema)
  .output("forum", PostSchema, "Forum deleted.")
  .delete("/", PostController.deletePost);

router
  .describe("Get Latest Posts", "Retrieve a stream of the most recent posts.")
  .query(PostGetLatestSchema)
  .output("forums", array(PostSchema), "Forum fetched.")
  .get("/latest", PostController.getLatestPosts);

router
  .describe("Get User Posts", "Retrieve posts belonging to a specific user.")
  .query(PostGetUsersSchema)
  .output("forums", array(PostSchema), "Forum fetched.")
  .get("/user", PostController.getUserPosts);

router
  .describe("Get My Posts", "Retrieve the current user's post history.")
  .userProfiled()
  .query(PostGetMineSchema)
  .output("forums", array(PostSchema), "Forum fetched.")
  .get("/user/me", PostController.getMyPosts);

export const PostRouter = router;
