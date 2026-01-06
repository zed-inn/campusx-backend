import { RequestController } from "./request.controller";
import {
  RequestCreateSchema,
  RequestDeleteSchema,
  RequestUpdateSchema,
} from "./dtos/request-action.dto";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { RequestSchema } from "./dtos/request-response.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Ambassador Request");

router
  .describe(
    "Get Request Status",
    "Get status request of the current logged in user"
  )
  .userProfiled()
  .output("request", RequestSchema, "Request Status.")
  .get("/me", RequestController.getMyRequestStatus);

router
  .describe(
    "Request for ambassador position",
    "Request will not happen if already an ambassador or if not a student of applied institute"
  )
  .userProfiled()
  .body(RequestCreateSchema)
  .output("request", RequestSchema, "Requested.")
  .post("/", RequestController.requestForPostition);

router
  .describe("Update Request", "Update request's institute or reason")
  .userProfiled()
  .body(RequestUpdateSchema)
  .output("request", RequestSchema, "Request updated.")
  .patch("/", RequestController.updateRequest);

router
  .describe("Withdraw Request", "Withdraw your request of ambassador")
  .userProfiled()
  .query(RequestDeleteSchema)
  .output(GlobalDeleteSchema, "Request withdrawn.")
  .delete("/", RequestController.withdrawRequest);

export const RequestRouter = router;
