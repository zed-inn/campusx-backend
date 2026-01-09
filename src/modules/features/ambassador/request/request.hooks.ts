import { InstituteService } from "@modules/core/institutes";
import { Request } from "./request.model";
import { NotificationService } from "@modules/core/notifications";

export const RequestHooks = () => {
  // Hooks
  Request.afterCreate(async (request) => {
    const r = request.plain;
    const i = (await InstituteService.getById(r.instituteId)).plain;

    await NotificationService.createNew(
      {
        title: "Ambassador Update",
        body: `Your request to represent ${i.name} has been received and is under evaluation.`,
        type: "AMBASSADOR_REQUEST",
      },
      r.userId
    );
  });

  Request.afterUpdate(async (request) => {
    const r = request.plain;

    await NotificationService.createNew(
      {
        title: "Ambassador Update",
        body: `Your request has been updated and is under evaluation.`,
        type: "AMBASSADOR_REQUEST",
      },
      r.userId
    );
  });
};
