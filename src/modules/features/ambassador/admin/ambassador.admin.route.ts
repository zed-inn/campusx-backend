import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { AmbassadorGetFilterSchema } from "./dtos/ambassador-get.admin.dto";
import { array } from "zod";
import { AmbassadorSchema } from "./dtos/ambassador-response.admin.dto";
import { AmbassadorController } from "./ambassador.admin.controller";
import { AmbassadorDeleteSchema } from "./dtos/ambassador-action.admin.dto";

const router = new DetailedRouter("Ambassador");

router
  .describe("Get ambassadors", "Get ambassadors by filters")
  .admin()
  .query(AmbassadorGetFilterSchema)
  .output("ambassadors", array(AmbassadorSchema), "Ambassadors fetched.")
  .get("/", AmbassadorController.getAmbassodorsByFilters);

router
  .describe("Delete ambassador", "Delete ambassador by id")
  .admin()
  .query(AmbassadorDeleteSchema)
  .output("Ambassador deleted.")
  .delete("/", AmbassadorController.deleteAmbassador);

export const AmbassadorRouter = router;
