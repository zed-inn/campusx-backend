import { InstituteService } from "@modules/core/institutes";
import { Request } from "./request.model";
import { NotificationService } from "@modules/core/notifications";
import { RequestService } from "./request.service";
import { AppError } from "@shared/errors/app-error";

export const RequestHooks = () => {
  // Hooks
  Request.beforeCreate(async (request) => {
    const r = request.plain;

    try {
      const isExist = (await RequestService.getById(r.id)).plain.status;
      if (isExist === "PENDING" || isExist === "ACCEPTED")
        throw new AppError(
          "Your request is under evaluation, you cannot request anymore for sometime.",
          400
        );
    } catch {}
  });

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
