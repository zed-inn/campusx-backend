import { BaseService } from "@shared/services/base.service";
import { Request, RequestAttributes, RequestInstance } from "./request.model";
import { RequestCreateDto, RequestUpdateDto } from "./dtos/request-action.dto";
import db from "@config/database";
import { EducationService } from "@modules/features/education";
import { AppError } from "@shared/errors/app-error";
import { DB_Errors } from "@shared/errors/db-errors";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";
import { AmbassadorService } from "../ambassador.service";
import { NotificationService } from "@modules/core/notifications";
import { InstituteService } from "@modules/core/institutes";

class _RequestService extends BaseService<RequestInstance> {
  constructor() {
    super(Request);
  }

  createNew = async (data: RequestCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const isUserEnrolled = await EducationService.isUserEnrolled(
        userId,
        data.instituteId
      );
      if (!isUserEnrolled)
        throw new AppError(
          "Does not meet requirements to become ambassador",
          400
        );

      const isUserAmbassador = await AmbassadorService.isUserAmbassador(userId);
      if (isUserAmbassador) throw new AppError("Already an ambassador", 400);

      const institute = (await InstituteService.getById(data.instituteId))
        .plain;

      await NotificationService.createNew(
        {
          title: "Ambassador Update",
          body: `Your request to represent ${institute.name} has been received and under evaluation.`,
          type: "AMBASSADOR_REQUEST",
        },
        userId
      );
      return await this.create({ ...data, userId });
    });
  };

  getByUserId = async (userId: string) => {
    const request = await Request.findOne({ where: { userId } });
    if (!request) throw DB_Errors.notFound;

    return request;
  };

  update = async (data: RequestUpdateDto, userId: string) => {
    const { id, ...updateData } = data;
    const request = await this.getById(id);
    this.checkOwnership(request, userId);

    if (request.plain.status !== "PENDING")
      throw new AppError("Your request is being reviewed.", 400);

    const cleanData = removeUndefined(updateData);
    if (hasKeys(cleanData)) {
      const institute = await InstituteService.getById(
        cleanData.instituteId ?? request.plain.instituteId
      );

      await NotificationService.createNew(
        {
          title: "Ambassador Update",
          body: "Your request has been updated and is being evaluated.",
          type: "AMBASSADOR_REQUEST",
        },
        userId
      );
      await request.update(cleanData as Partial<RequestAttributes>);
    }

    return request;
  };
}

export const RequestService = new _RequestService();
