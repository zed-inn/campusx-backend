import bcrypt from "bcryptjs";
import { env } from "@config/env";
import { CreateProtectedDto, CreateSimpleDto } from "./dtos/user-create.dto";
import { UpdatePasswordDto } from "./dtos/user-update.dto";
import { User, UserAttributes, UserInstance } from "./user.model";
import { UserErrors } from "./user.errors";
import { BaseService } from "@shared/services/base.service";

export class UserService extends BaseService<UserInstance, UserAttributes> {
  static createWithPassword = async (data: CreateProtectedDto) => {
    const { password, ...createData } = data;

    const passwordHash = await UserUtils.hashPassword(password);
    const user = await User.create({
      ...createData,
      passwordHash,
    });

    return new UserService(user);
  };

  static createWithoutPassword = async (data: CreateSimpleDto) => {
    const user = await User.create({ ...data });

    return new UserService(user);
  };

  static getById = async (id: string) => {
    const user = await User.findByPk(id);
    if (!user) throw UserErrors.noUserFound;

    return new UserService(user);
  };

  static getByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw UserErrors.noUserFound;

    return new UserService(user);
  };

  static updatePasswordByEmail = async (data: UpdatePasswordDto) => {
    const passwordHash = await UserUtils.hashPassword(data.password);
    const service = await UserService.getByEmail(data.email);

    const user = service.model;
    await user.update({ passwordHash });

    return new UserService(user);
  };
}

export class UserUtils {
  static hashPassword = async (password: string) =>
    await bcrypt.hash(password, env.BCRYPT_PASSWORD_HASH_SALT);
}
