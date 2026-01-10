import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { EventGetPageDto } from "./dtos/event-get.dto";
import { EventService } from "./event.service";
import { EventAggregator } from "./event.aggregator";
import { EventSchema } from "./dtos/event-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class EventController {
  static getEvents = catchAsync(
    async (req: Request<{}, {}, {}, EventGetPageDto>, res: Response) => {
      const q = req.query;

      const iEvents = await EventService.getByPage(q.page);
      const tEvents = await EventAggregator.transfrom(iEvents, req.user?.id);
      const pEvents = tEvents.map((e) => EventSchema.parse(e));

      return ApiResponse.success(res, "Events", { events: pEvents });
    }
  );
}
