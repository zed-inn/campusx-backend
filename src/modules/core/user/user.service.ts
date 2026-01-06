import bcrypt from "bcryptjs";
import { env } from "@config/env";
import { CreateProtectedDto, CreateSimpleDto } from "./dtos/user-create.dto";
import { UpdatePasswordDto } from "./dtos/user-update.dto";
import { User, UserInstance } from "./user.model";
import { BaseService } from "@shared/services/base.service";
import { DB_Errors } from "@shared/errors/db-errors";

class _UserService extends BaseService<UserInstance> {
  constructor() {
    super(User);
  }

  createWithPassword = async (data: CreateProtectedDto) => {
    const { password, ...createData } = data;

    const passwordHash = await UserUtils.hashPassword(password);
    return await this.create({ ...createData, passwordHash });
  };

  createWithoutPassword = async (data: CreateSimpleDto) => {
    return await this.create({ ...data });
  };

  getByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw DB_Errors.notFound;

    return user;
  };

  getByReferralCode = async (referralCode: string) => {
    const user = await User.findOne({ where: { referralCode } });
    if (!user) throw DB_Errors.notFound;

    return user;
  };

  updatePasswordByEmail = async (data: UpdatePasswordDto) => {
    const user = await this.getByEmail(data.email);

    const passwordHash = await UserUtils.hashPassword(data.password);
    await user.update({ passwordHash });

    return user;
  };
}

class UserUtils {
  static hashPassword = async (password: string) =>
    await bcrypt.hash(password, env.BCRYPT_PASSWORD_HASH_SALT);
}

export const UserService = new _UserService();
