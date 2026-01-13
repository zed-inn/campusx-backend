import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { EventGetFilterDto } from "./dtos/event-get.admin.dto";
import { EventService } from "./event.admin.service";
import { EventSchema } from "./dtos/event-response.admin.dto";
import { ApiResponse } from "@shared/utils/api-response";
import {
  EventCreateDto,
  EventDeleteDto,
  EventUpdateDto,
} from "./dtos/event-action.admin.dto";
import { converTOrder } from "@shared/utils/convert-to-order";

export class EventController {
  static getEventsByFilters = catchAsync(
    async (req: Request<{}, {}, {}, EventGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order: converTOrder(order), filters };

      const iEvents = await EventService.getByFilters(
        q.filters,
        q.order,
        q.page
      );
      const pEvents = iEvents.map((e) => EventSchema.parse(e));

      return ApiResponse.success(res, "Events fetched.", { events: pEvents });
    }
  );

  static createEvent = catchAsync(
    async (req: Request<{}, {}, EventCreateDto>, res: Response) => {
      const iEvent = await EventService.createNew(req.body);
      const pEvent = EventSchema.parse(iEvent.plain);

      return ApiResponse.success(res, "Event created.", { event: pEvent });
    }
  );

  static updateEvent = catchAsync(
    async (req: Request<{}, {}, EventUpdateDto>, res: Response) => {
      const iEvent = await EventService.update(req.body);
      const pEvent = EventSchema.parse(iEvent.plain);

      return ApiResponse.success(res, "Event updated.", { event: pEvent });
    }
  );

  static deleteEvent = catchAsync(
    async (req: Request<{}, {}, {}, EventDeleteDto>, res: Response) => {
      const q = req.query;

      const event = await EventService.deleteById(q.id);

      return ApiResponse.success(res, "Event deleted.", { id: event.id });
    }
  );
}
