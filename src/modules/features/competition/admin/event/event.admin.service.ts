import {
  EVENTS_PER_PAGE,
  USERS_PER_PAGE,
} from "@config/constants/items-per-page";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Event, EventAttributes, EventInstance } from "../../event/event.model";
import { EventCreateDto, EventUpdateDto } from "./dtos/event-action.admin.dto";
import { EventFiltersDto } from "./dtos/event-get.admin.dto";
import { OrderItem } from "sequelize";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";

class _EventService extends BaseService<EventInstance> {
  protected OFFSET = createOffsetFn(EVENTS_PER_PAGE);

  constructor() {
    super(Event);
  }

  createNew = async (data: EventCreateDto) => {
    return await this.create(data);
  };

  getByFilters = async (
    filters: EventFiltersDto,
    order: string[][],
    page: number
  ) => {
    const events = await Event.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
      order: order as OrderItem[],
    });

    return events.map((e) => e.plain);
  };

  update = async (data: EventUpdateDto) => {
    const { id, ...updateData } = data;

    return await db.transaction(async () => {
      const event = await this.getById(id);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await event.update(cleanData as Partial<EventAttributes>);

      return event;
    });
  };
}

export const EventService = new _EventService();
