import { z } from "zod";
import { UserInterface } from "../../user.interface";

export const UserSchema = UserInterface.dbSchema;

export type UserDto = z.infer<typeof UserSchema>;
