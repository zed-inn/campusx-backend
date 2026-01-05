import { AmbassadorController } from "./ambassador.controller";
import { AmbassadorGetInstituteSchema } from "./dtos/ambassador-get.dto";
import { RequestRouter } from "./request/request.route";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { array } from "zod";
import { ShortUserSchema } from "@modules/core/profile";

const router = new DetailedRouter("Ambassador");

router
  .describe(
    "Get Institute's Ambassadors",
    "Get users list of ambassadors for queried institute"
  )
  .query(AmbassadorGetInstituteSchema)
  .output("ambassadors", array(ShortUserSchema), "Ambassadors.")
  .get("/institute", AmbassadorController.getInstituteAmbassadors);

router.use("/request", RequestRouter);

export const AmbassadorRouter = router;
