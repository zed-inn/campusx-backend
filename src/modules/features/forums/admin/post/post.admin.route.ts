import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { PostGetFilterSchema } from "./dtos/post-get.admin.dto";
import { array } from "zod";
import { PostSchema } from "./dtos/post-response.admin.dto";
import { PostController } from "./post.admin.controller";

const router = new DetailedRouter("Post");

router
  .describe("Get forum posts", "Get forum posts by filter")
  .admin()
  .query(PostGetFilterSchema)
  .output("posts", array(PostSchema), "Posts fetched.")
  .get("/", PostController.getPostsByFilters);

export const PostRouter = router;
