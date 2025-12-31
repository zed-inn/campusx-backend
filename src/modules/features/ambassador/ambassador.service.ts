import { BaseService } from "@shared/services/base.service";
import {
  Ambassador,
  AmbassadorAttributes,
  AmbassadorInstance,
} from "./ambassador.model";
import { AmbassadorCreateDto } from "./dtos/ambassador-create.dto";
import { AmbassadorErrors } from "./ambassador.errors";
import db from "@config/database";
import { AmbassadorUpdateDto } from "./dtos/ambassador-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { createOffsetFn } from "@shared/utils/create-offset";
import { EducationService } from "../education";
import { REQUEST_STATUS } from "./ambassador.constants";
import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import { hasKeys } from "@shared/utils/object-length";
import { Institute, InstituteAttributes } from "@modules/core/institutes";

export class AmbassadorService extends BaseService<
  AmbassadorInstance,
  AmbassadorAttributes
> {
  static OFFSET = createOffsetFn(USERS_PER_PAGE);

  static create = async (data: AmbassadorCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const isInInstitute = await EducationService.userInInstitute(
        userId,
        data.instituteId
      );
      if (!isInInstitute) throw AmbassadorErrors.noRequestAllowed;

      const ambassador = await Ambassador.create({ ...data, id: userId });

      return new AmbassadorService(ambassador);
    });
  };

  static getByIds = async (ids: string[]) => {
    const ambassadors = await Ambassador.findAll({
      where: { id: ids, status: REQUEST_STATUS.ACCEPTED },
      include: [{ model: Institute, as: "institute" }],
    });
    const institutes: Record<string, InstituteAttributes | null> = {};
    ambassadors.map((a: any) => (institutes[a.id] = a.institute));
    return institutes;
  };

  static getById = async (id: string) => {
    const ambassador = await Ambassador.findByPk(id);
    if (!ambassador) throw AmbassadorErrors.noAmbassadorFound;

    return new AmbassadorService(ambassador);
  };

  static getByInstituteId = async (id: string, page: number) => {
    const ambassadors = await Ambassador.findAll({
      where: { instituteId: id, status: REQUEST_STATUS.ACCEPTED },
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return ambassadors.map((a) => new AmbassadorService(a));
  };

  static update = async (data: AmbassadorUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const service = await this.getById(userId);
      const ambassador = service.model;

      if (service.data.status !== REQUEST_STATUS.PENDING)
        throw AmbassadorErrors.noUpdateAllowed;

      const cleanData = removeUndefined(data);
      if (hasKeys(cleanData))
        await ambassador.update(cleanData as Partial<AmbassadorAttributes>);

      return new AmbassadorService(ambassador);
    });
  };

  static delete = async (userId: string) => {
    return await db.transaction(async () => {
      const service = await this.getById(userId);
      const ambassador = service.model;

      if (service.data.status !== REQUEST_STATUS.PENDING)
        throw AmbassadorErrors.noDeleteAllowed;

      await ambassador.destroy();
    });
  };
}
