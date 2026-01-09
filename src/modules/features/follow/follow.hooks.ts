import { AppError } from "@shared/errors/app-error";
import { Follow } from "./follow.model";
import { ProfileService } from "@modules/core/profile";
import { NotificationService } from "@modules/core/notifications";

export const FollowHooks = () => {
  // Hooks
  Follow.beforeValidate((follow: any) => {
    if (follow.followeeId === follow.followerId)
      throw new AppError("You can't follow yourself", 406);
  });

  Follow.afterCreate(async (follow) => {
    const f = follow.plain;

    const followee = (await ProfileService.getById(f.followeeId)).plain;
    const follower = (await ProfileService.getById(f.followerId)).plain;
    await NotificationService.createNew(
      {
        type: "FOLLOW",
        title: `New Follower`,
        body: `${follower.fullName}${
          follower.username ? ` (@${follower.username})` : ""
        } started following you.`,
      },
      followee.id
    );
  });
};
