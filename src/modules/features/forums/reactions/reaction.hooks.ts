import { ProfileService } from "@modules/core/profile";
import { PostService } from "../post/post.service";
import { Reaction } from "./reaction.model";
import { NotificationService } from "@modules/core/notifications";
import { limitText } from "@shared/utils/limit-text";

export const ReactionHooks = () => {
  // Hooks
  Reaction.afterCreate(async (reaction) => {
    const r = reaction.plain;
    const f = (await PostService.getById(r.postId)).plain;
    const u = (await ProfileService.getById(r.userId)).plain;

    await NotificationService.createNew(
      {
        type: "LIKE",
        title: `${u.fullName}${
          u.username ? ` (@${u.username})` : ""
        } liked your post ${limitText(f.title, 20)}`,
      },
      f.userId
    );
  });
};
