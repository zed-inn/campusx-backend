import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { LeaderboardGetTopSchema } from "./dtos/leaderboard-get.dto";
import { array } from "zod";
import { LeaderboardSchema } from "./dtos/leaderboard-response.dto";
import { LeaderboardController } from "./leaderboard.controller";
import {
  LeaderboardRegisterSchema,
  LeaderboardUnregisterSchema,
} from "./dtos/leaderboard-action.dto";

const router = new DetailedRouter("Competition Event Leaderboard");

router
  .describe(
    "Get Top Participants",
    "Get participants with thier points to arrange in any order"
  )
  .query(LeaderboardGetTopSchema)
  .output("leaderboard", array(LeaderboardSchema), "Leaderboard.")
  .get("/participants/top", LeaderboardController.getTopParticipants);

router
  .describe(
    "Register for event",
    "Register current logged in user for an event"
  )
  .userProfiled()
  .body(LeaderboardRegisterSchema)
  .output("Registered.")
  .post("/register", LeaderboardController.registerInEvent);

router
  .describe(
    "Deregister from event",
    "Deregister current logged in user from an event"
  )
  .userProfiled()
  .query(LeaderboardUnregisterSchema)
  .output("Deregistered.")
  .delete("/deregister", LeaderboardController.deregisterInEvent);

export const LeaderboardRouter = router;
