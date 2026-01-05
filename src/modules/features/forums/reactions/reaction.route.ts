import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { ReactActionSchema } from "./dtos/reaction.dto";
import { ReactionController } from "./reaction.controller";

const router = new DetailedRouter("Forum Reactions");

router
  .describe("Like Post", "Add a like reaction to a specific post.")
  .userProfiled()
  .body(ReactActionSchema)
  .output("Liked.")
  .post("/like", ReactionController.likePost);

router
  .describe("Unlike Post", "Remove a like reaction from a specific post.")
  .userProfiled()
  .query(ReactActionSchema)
  .output("Unliked.")
  .delete("/like", ReactionController.unlikePost);

export const ReactionRouter = router;
