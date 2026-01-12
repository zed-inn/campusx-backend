import { UserService } from "@modules/core/user";
import { ProfileAttributes } from "../profile.model";
import {
  ProfileDto,
  ProfileReversedSchema,
  ProfileSchema,
} from "./dtos/profile-response.admin.dto";

export type IncompleteProfile = ProfileAttributes & {
  user?: Record<string, unknown>;
};

export class ProfileAggregator {
  static addUser = async (profiles: IncompleteProfile[]) => {
    const userIds = profiles.map((p) => p.id);

    const users = await UserService.getByIds(userIds);
    const userMap: Record<string, any> = {};
    users.map((u) => (userMap[u.id] = u));

    return profiles.map((p) => ({ ...p, user: userMap[p.id] }));
  };

  static transform = async (profiles: IncompleteProfile[]) => {
    const withUser = await ProfileAggregator.addUser(profiles);

    const reversed = withUser.map((p) => ProfileReversedSchema.parse(p));

    const transformed: ProfileDto[] = [];
    for (const p of reversed) {
      const { user, ...profile } = p;
      transformed.push({ ...user, profile });
    }

    return transformed.map((p) => ProfileSchema.parse(p));
  };
}
