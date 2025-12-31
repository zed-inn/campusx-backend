import { AmbassadorService } from "@modules/features/ambassador";
import { FollowService } from "../follow/follow.service";
import {
  ResponseFullDto,
  ResponseFullSchema,
} from "./dtos/profile-response.dto";

export class ProfileUtils {
  static joinIsFollowed = async (
    profiles: any[],
    reqUserId: string | null = null
  ) => {
    if (!reqUserId) return profiles;

    const joinedProfiles: ResponseFullDto[] = [];

    const follows = await FollowService.getFollowStatus(
      profiles.map((p) => p.id),
      [reqUserId]
    );

    for (const prf of profiles)
      joinedProfiles.push(
        ResponseFullSchema.parse({
          ...prf,
          isFollowed: follows(reqUserId, prf.id),
        })
      );

    return joinedProfiles;
  };

  static joinAmbassador = async (profiles: any[]) => {
    const joinedProfiles: ResponseFullDto[] = [];

    const institutesMap = await AmbassadorService.getByIds(
      profiles.map((p) => p.id)
    );

    for (const prf of profiles)
      joinedProfiles.push(
        ResponseFullSchema.parse({
          ...prf,
          isAmbassador: institutesMap[prf.id] ? true : false,
          ambassadorInstitute: institutesMap[prf.id],
        })
      );

    return joinedProfiles;
  };

  static joinAll = async (profiles: any[], reqUserId: string | null = null) => {
    const profiles1 = await this.joinIsFollowed(profiles, reqUserId);
    const profiles2 = await this.joinAmbassador(profiles1);
    return profiles2;
  };
}
