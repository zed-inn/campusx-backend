import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { EventRouter } from "./event/event.admin.route";

const router = new DetailedRouter("Admin Competition");

router.use("/event", EventRouter);

export const CompetitionAdminRouter = router;
