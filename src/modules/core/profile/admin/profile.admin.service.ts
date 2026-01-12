import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Profile, ProfileInstance } from "../profile.model";
import { ProfileFiltersDto } from "./dtos/profile-get.admin.dto";
import { OrderItem } from "sequelize";

class _ProfileService extends BaseService<ProfileInstance> {
  protected OFFSET = createOffsetFn(USERS_PER_PAGE);

  constructor() {
    super(Profile);
  }

  getByFilters = async (
    filters: ProfileFiltersDto,
    order: string[][],
    page: number
  ) => {
    const profiles = await Profile.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
      order: order as OrderItem[],
    });

    return profiles.map((p) => p.plain);
  };
}

export const ProfileService = new _ProfileService();
