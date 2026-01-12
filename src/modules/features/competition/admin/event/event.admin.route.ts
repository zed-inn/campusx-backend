import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { EventGetFilterSchema } from "./dtos/event-get.admin.dto";
import { array } from "zod";
import { EventSchema } from "./dtos/event-response.admin.dto";
import { EventController } from "./event.admin.controller";
import {
  EventCreateSchema,
  EventDeleteSchema,
  EventUpdateSchema,
} from "./dtos/event-action.admin.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Event");

router
  .describe("Get Events", "Get events by filter")
  .admin()
  .query(EventGetFilterSchema)
  .output("events", array(EventSchema), "Events fetched.")
  .get("/", EventController.getEventsByFilters);

router
  .describe("Create event", "Create event")
  .admin()
  .body(EventCreateSchema)
  .output("event", EventSchema, "Event created.")
  .post("/", EventController.createEvent);

router
  .describe("Update event", "Update event by Id")
  .admin()
  .body(EventUpdateSchema)
  .output("event", EventSchema, "Event updated.")
  .post("/", EventController.updateEvent);

router
  .describe("Delete event", "Delete event by Id")
  .admin()
  .query(EventDeleteSchema)
  .output(GlobalDeleteSchema, "Event deleted.")
  .delete("/", EventController.deleteEvent);

export const EventRouter = router;
