import { CreateFullDto, CreateShortDto } from "./dtos/profile-create.dto";
import { ProfileUpdateDto } from "./dtos/profile-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { createOffsetFn } from "@shared/utils/create-offset";
import { UserErrors } from "@modules/core/user";
import { BaseService } from "@shared/services/base.service";
import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import { Profile, ProfileAttributes, ProfileInstance } from "./profile.model";
import { hasKeys } from "@shared/utils/object-length";

export class ProfileService extends BaseService<
  ProfileInstance,
  ProfileAttributes
> {
  protected static offset = createOffsetFn(USERS_PER_PAGE);

  static async create(data: CreateFullDto | CreateShortDto, userId: string) {
    const profile = await Profile.create({ ...data, id: userId });

    return new ProfileService(profile);
  }

  static getById = async (id: string) => {
    const profile = await Profile.findByPk(id);
    if (!profile) throw UserErrors.noUserFound;

    return new ProfileService(profile);
  };

  static getByIds = async (ids: string[]) => {
    const profiles = await Profile.findAll({ where: { id: ids } });

    return profiles.map((p) => new ProfileService(p));
  };

  static getByUsername = async (username: string) => {
    const profile = await Profile.findOne({ where: { username } });
    if (!profile) throw UserErrors.noUserFound;

    return new ProfileService(profile);
  };

  static getAll = async (page: number) => {
    const profiles = await Profile.findAll({
      offset: this.offset(page),
      limit: USERS_PER_PAGE,
      order: [["fullName", "asc"]],
    });

    return profiles.map((p) => new ProfileService(p));
  };

  static update = async (data: ProfileUpdateDto, userId: string) => {
    const service = await ProfileService.getById(userId);

    const profile = service.model;
    const cleanData = removeUndefined(data);
    console.log(cleanData);
    if (hasKeys(cleanData))
      await profile.update(cleanData as Partial<ProfileAttributes>);

    return new ProfileService(profile);
  };
}
