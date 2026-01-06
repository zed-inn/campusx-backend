import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { PostGetSchema } from "./dtos/post-get.dto";
import { PostsController } from "./post.controller";
import { array } from "zod";
import { PostSchema } from "./dtos/post-response.dto";

const router = new DetailedRouter("Insight Posts");

router
  .describe("Get insights", "Retrieve a paginated list of insights.")
  .query(PostGetSchema)
  .output("insights", array(PostSchema), "Insights fetched.")
  .get("/", PostsController.getPublishedPosts);

export const PostRouter = router;
