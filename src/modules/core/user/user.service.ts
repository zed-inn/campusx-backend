import bcrypt from "bcryptjs";
import { env } from "@config/env";
import { UserCreateDto } from "./dtos/service/user-create.dto";
import { UpdatePasswordDto } from "./dtos/service/update-password.dto";
import { User } from "./user.model";
import { UserErrors } from "./user.errors";
import { UserSchema } from "./dtos/service/user-schema.dto";
import { BaseService } from "@shared/services/base.service";
import { USER_CONFIG } from "./user.config";

export class UserService extends BaseService<InstanceType<typeof User>> {
  override get data() {
    const user = super.data;
    return UserSchema.parse(user);
  }

  static createWithPassword = async (data: UserCreateDto) => {
    const passwordHash = await UserUtils.hashPassword(data.password);
    const user = await User.create({
      email: data.email,
      passwordHash,
      role: USER_CONFIG.ROLE.STUDENT,
    });

    return new UserService(user);
  };

  static createWithoutPassword = async (email: string) => {
    const user = await User.create({ email, role: USER_CONFIG.ROLE.STUDENT });

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
    const user = (await UserService.getByEmail(data.email)).model;
    const passwordHash = await UserUtils.hashPassword(data.password);
    await user.update({ passwordHash });

    return new UserService(user);
  };
}

export class UserUtils {
  static hashPassword = async (password: string) =>
    await bcrypt.hash(password, env.BCRYPT_PASSWORD_HASH_SALT);
}
