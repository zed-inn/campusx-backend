import { BaseService } from "@shared/services/base.service";
import { User, UserInstance } from "../user.model";
import { UserUtils } from "../user.service";
import { UserCreateDto } from "./dtos/service/user-create.dto";

export class UserAdminService extends BaseService<UserInstance> {
  static create = async (data: UserCreateDto) => {
    const { password, ...createData } = data;
    const passwordHash = await UserUtils.hashPassword(password);
    const u = await User.create({ ...data, passwordHash });

    return new UserAdminService(u);
  };
}
