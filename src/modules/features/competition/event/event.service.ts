import { BaseService } from "@shared/services/base.service";
import { Event, EventInstance } from "./event.model";
import { createOffsetFn } from "@shared/utils/create-offset";
import { COMPETITIONS_PER_PAGE } from "@config/constants/items-per-page";

class _EventService extends BaseService<EventInstance> {
  protected OFFSET = createOffsetFn(COMPETITIONS_PER_PAGE);

  constructor() {
    super(Event);
  }

  getByPage = async (page: number) => {
    const events = await Event.findAll({
      offset: this.OFFSET(page),
      limit: COMPETITIONS_PER_PAGE,
      order: [["startDate", "desc"]],
    });

    return events.map((e) => e.plain);
  };
}

export const EventService = new _EventService();
