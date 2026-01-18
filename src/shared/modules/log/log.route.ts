import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { LogGetPageSchema } from "./dtos/log-get.dto";
import { array } from "zod";
import { LogSchema } from "./dtos/log-response.dto";
import { LogController } from "./log.controller";

const router = new DetailedRouter("Logs");

router
  .describe("Get logs", "Get logs by page")
  .admin()
  .query(LogGetPageSchema)
  .output("logs", array(LogSchema), "Logs.")
  .get("/", LogController.getLogs);

export const AdminLogRouter = router;
