import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { EventRouter } from "./event/event.route";
import { LeaderboardRouter } from "./leaderboard/leaderboard.route";

const router = new DetailedRouter("Competition");

router.use("/event", EventRouter);

router.use("/event", LeaderboardRouter);

export const CompetitionRouter = router;
