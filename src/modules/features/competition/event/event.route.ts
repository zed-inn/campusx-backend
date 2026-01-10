import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { EventGetPageSchema } from "./dtos/event-get.dto";
import { EventSchema } from "./dtos/event-response.dto";
import { EventController } from "./event.controller";

const router = new DetailedRouter("Competition Event");

router
  .describe("Get events", "Get events by page")
  .query(EventGetPageSchema)
  .output("events", EventSchema, "Events")
  .get("/", EventController.getEvents);

export const EventRouter = router;
