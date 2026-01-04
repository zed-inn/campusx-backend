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

class _AmbassadorService extends BaseService<AmbassadorInstance> {
  protected OFFSET = createOffsetFn(USERS_PER_PAGE);

  constructor() {
    super(Ambassador);
  }

  createRequest = async (data: AmbassadorCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const isUserEnrolled = await EducationService.isUserEnrolled(
        userId,
        data.instituteId
      );
      if (!isUserEnrolled) throw AmbassadorErrors.userNotEnrolled;

      return await Ambassador.create({ ...data, id: userId });
    });
  };

  getByInstituteId = async (id: string, page: number) => {
    const ambassadors = await Ambassador.findAll({
      where: { instituteId: id, status: REQUEST_STATUS.ACCEPTED },
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return ambassadors.map((a) => a.plain);
  };

  update = async (data: AmbassadorUpdateDto, userId: string) => {
    const ambassador = await this.getById(userId);

    if (ambassador.dataValues.status !== REQUEST_STATUS.PENDING)
      throw AmbassadorErrors.noUpdateAllowed;

    const cleanData = removeUndefined(data);
    if (hasKeys(cleanData))
      await ambassador.update(cleanData as Partial<AmbassadorAttributes>);

    return ambassador;
  };

  delete = async (userId: string) => {
    const ambassador = await this.getById(userId);

    if (ambassador.dataValues.status !== REQUEST_STATUS.PENDING)
      throw AmbassadorErrors.noDeleteAllowed;

    await ambassador.destroy();

    return ambassador.plain;
  };
}

export const AmbassadorService = new _AmbassadorService();
