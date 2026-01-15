import { BaseService } from "@shared/services/base.service";
import { Profile, ProfileAttributes, ProfileInstance } from "./profile.model";
import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import { createOffsetFn } from "@shared/utils/create-offset";
import { ProfileCreateDto } from "./dtos/profile-create.dto";
import { DB_Errors } from "@shared/errors/db-errors";
import { ProfileGetUsersDto } from "./dtos/profile-get.dto";
import { Op } from "sequelize";
import { ProfileUpdateDto } from "./dtos/profile-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";

class _ProfileService extends BaseService<ProfileInstance> {
  protected OFFSET = createOffsetFn(USERS_PER_PAGE);

  constructor() {
    super(Profile);
  }

  createStudent = async (data: ProfileCreateDto, id: string) => {
    return this.create({ ...data, id });
  };

  getByUsername = async (username: string) => {
    const profile = await Profile.findOne({ where: { username } });
    if (!profile) throw DB_Errors.notFound;

    return profile;
  };

  filterUsersByName = async ({ name, page }: ProfileGetUsersDto) => {
    const profile = await Profile.findAll({
      ...(name
        ? {
            where: {
              [Op.or]: [
                { username: { [Op.iLike]: `%${name}%` } },
                { fullName: { [Op.iLike]: `%${name}%` } },
              ],
            },
          }
        : {}),
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
    });

    return profile.map((p) => p.plain);
  };

  update = async (data: ProfileUpdateDto, id: string) => {
    const profile = await this.getById(id);

    const cleanData = removeUndefined(data);
    if (hasKeys(cleanData))
      await profile.update(cleanData as Partial<ProfileAttributes>);

    return profile;
  };
}

export const ProfileService = new _ProfileService();
