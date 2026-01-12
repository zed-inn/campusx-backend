import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { RequestGetFilterSchema } from "./dtos/request-get.admin.dto";
import { array } from "zod";
import { RequestSchema } from "./dtos/request-response.admin.dto";
import { RequestController } from "./request.admin.controller";
import { RequestUpdateSchema } from "./dtos/request-action.admin.dto";

const router = new DetailedRouter("Request");

router
  .describe("Get requests", "Get requests by filters")
  .admin()
  .query(RequestGetFilterSchema)
  .output("requests", array(RequestSchema), "Requests fetched.")
  .get("/", RequestController.getRequestsByFilter);

router
  .describe("Update request", "Update request by Id")
  .admin()
  .body(RequestUpdateSchema)
  .output("request", RequestSchema, "Request updated.")
  .patch("/", RequestController.updateRequest);

export const RequestRouter = router;
