import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { ReactActionSchema } from "./dtos/reaction.dto";
import { ReactionController } from "./reaction.controller";

const router = new DetailedRouter("Institute Community Chat Message Reactions");

router
  .describe("Like Message", "Add a like reaction to a specific message.")
  .userProfiled()
  .body(ReactActionSchema)
  .output("Liked.")
  .post("/like", ReactionController.likeMessage);

router
  .describe("Unlike Message", "Remove a like reaction from a specific message.")
  .userProfiled()
  .query(ReactActionSchema)
  .output("Unliked.")
  .delete("/like", ReactionController.unlikeMessage);

export const ReactionRouter = router;
