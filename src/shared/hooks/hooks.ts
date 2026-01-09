import { ProfileHooks } from "@modules/core/profile";
import { AmbassadorRequestHooks } from "@modules/features/ambassador";
import { ChatsMessageHooks } from "@modules/features/chats";
import { FollowHooks } from "@modules/features/follow";
import {
  ForumCommentHooks,
  ForumReactionHooks,
} from "@modules/features/forums";

export const defineHooks = () => {
  ProfileHooks();
  AmbassadorRequestHooks();
  ChatsMessageHooks();
  FollowHooks();
  ForumCommentHooks();
  ForumReactionHooks();
};
