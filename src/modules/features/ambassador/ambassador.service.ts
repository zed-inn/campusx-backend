import { BaseService } from "@shared/services/base.service";
import { Ambassador, AmbassadorInstance } from "./ambassador.model";
import { Rui } from "@shared/dtos/req-user.dto";
import { Includeable } from "sequelize";
import { Profile, ProfileInclude, ProfileService } from "@modules/core/profile";
import { AmbassadorSchema } from "./dtos/service/ambassador-schema.dto";
import { AmbassadorCreateDto } from "./dtos/service/ambassador-create.dto";
import { AmbassadorErrors } from "./ambassador.errors";
import db from "@config/database";
import { AmbassadorUpdateDto } from "./dtos/service/ambassador-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { AmbassadorAttributes } from "./ambassador.interface";
import { createOffsetFn } from "@shared/utils/create-offset";
import { AMBASSADOR_CONFIG } from "./ambassador.config";
import { Institute, InstituteService } from "@modules/core/institutes";

export class AmbassadorService extends BaseService<AmbassadorInstance> {
  static AMBASSADORS_PER_PAGE = 30;
  static OFFSET = createOffsetFn(this.AMBASSADORS_PER_PAGE);

  override get data() {
    const ambassador = super.data;
    ambassador.user = ProfileService.parse(ambassador.user);
    ambassador.institute = InstituteService.parse(ambassador.institute)

    return AmbassadorSchema.parse(ambassador);
  }

  static create = async (data: AmbassadorCreateDto, userId: string) => {
    return await db.transaction(async () => {
      const a = await Ambassador.create({ ...data, id: userId });

      return this.getById(a.dataValues.id);
    });
  };

  static getById = async (id: string, reqUserId?: Rui) => {
    const ambassador = await Ambassador.findByPk(id, {
      include: [AmbassadorInclude.user(reqUserId)],
    });
    if (!ambassador) throw AmbassadorErrors.noAmbassadorFound;

    return new AmbassadorService(ambassador);
  };

  static getByInstituteId = async (
    id: string,
    page: number,
    reqUserId?: Rui
  ) => {
    const ambassadors = await Ambassador.findAll({
      where: { instituteId: id, status: AMBASSADOR_CONFIG.STATUS.ACCEPTED },
      offset: this.OFFSET(page),
      limit: this.AMBASSADORS_PER_PAGE,
      include: [AmbassadorInclude.user(reqUserId)],
    });

    return ambassadors.map((a) => new AmbassadorService(a));
  };

  static update = async (data: AmbassadorUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const service = await this.getById(userId);
      const ambassador = service.model;

      if (service.data.status !== AMBASSADOR_CONFIG.STATUS.PENDING)
        throw AmbassadorErrors.noUpdateAllowed;

      const cleanData = removeUndefined(data);
      if (Object.keys(cleanData).length)
        await ambassador.update(cleanData as Partial<AmbassadorAttributes>);

      return new AmbassadorService(ambassador);
    });
  };

  static delete = async (userId: string) => {
    return await db.transaction(async () => {
      const service = await this.getById(userId);
      const ambassador = service.model;

      if (service.data.status !== AMBASSADOR_CONFIG.STATUS.PENDING)
        throw AmbassadorErrors.noDeleteAllowed;

      await ambassador.destroy();
    });
  };
}

class AmbassadorInclude {
  static user = (userId?: Rui): Includeable => ({
    model: Profile,
    as: "user",
    include: [ProfileInclude.followedBy(userId), ProfileInclude.ambassador],
  });

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }
}
