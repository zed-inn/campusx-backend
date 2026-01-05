import { User, UserModel } from "@modules/core/user";
import { getDataJsons } from "./get-data";
import {
  ChatOld,
  CommentOld,
  ForumOld,
  LikeOld,
  MessageOld,
  OldModels,
  ProfileOld,
  UserOld,
} from "./old_models";
import { Profile, ProfileModel } from "@modules/core/profile";
import { Forum, ForumModel } from "@modules/features/forums/post/post.model";
import {
  Comment,
  CommentModel,
} from "@modules/features/forums/comments/comment.model";
import {
  Like,
  LikeModel,
} from "@modules/features/forums/reactions/reaction.model";
import {
  Category,
  CategoryModel,
} from "@modules/features/insights/category/category.model";
import {
  Insight,
  InsightModel,
} from "@modules/features/insights/post/post.model";
import db, { connectDB, disconnectDB } from "@config/database";
import { Chat, ChatModel } from "@modules/features/chats/chat/chat.model";
import { uuidv4 } from "zod";
import {
  Message,
  MessageModel,
} from "@modules/features/chats/message/message.model";

const URL = "https://api.thoughtshub.agency";

const mapWithKey = <T extends Record<string, unknown>>(
  obj: T[],
  key: keyof T
) => {
  const _obj: Record<string, T> = {};
  for (const k of obj) {
    _obj[k[key] as string] = k;
  }
  return _obj;
};

const convertUserId = async (users: UserOld[], profiles: ProfileOld[]) => {
  const _users = mapWithKey<ProfileOld>(profiles, "userId");

  const profiledUsers = users
    .filter((u) => (_users[u.id] ? true : false))
    .map((u) => _users[u.id]?.id ?? "");

  for (const user of users) {
    user.id = _users[user.id]?.id ?? user.id;
  }

  return {
    users: users
      .map((u) => {
        try {
          return UserModel.dbSchema
            .pick({
              createDate: true,
              email: true,
              id: true,
              passwordHash: true,
              role: true,
              updateDate: true,
            })
            .parse({
              ...u,
              passwordHash: u.password,
              type: "STUDENT",
            });
        } catch (error) {
          return null;
        }
      })
      .filter((i) => i !== null),
    profiles: profiles
      .map((p) => {
        try {
          return ProfileModel.dbSchema.parse({
            ...p,
            gender: p.gender?.toLowerCase() ?? null,
            avatarUrl: p.profileImageUrl ? URL + p.profileImageUrl : null,
            dob: p.dob ? parseInt(p.dob) : null,
            about: p.about ? (p.about.length >= 1 ? p.about : null) : null,
          });
        } catch (error) {
          console.log(p);
          return null;
        }
      })
      .filter((i) => i !== null),
  };
};

const convertForums = (
  forums: ForumOld[],
  profileIds: string[],
  comments: CommentOld[],
  likes: LikeOld[]
) => {
  const _forums = forums.filter((f) => profileIds.includes(f.profileId));
  const forumIds = _forums.map((f) => f.id);
  const _commentsNotDoingReplyingTo = comments.filter(
    (c) => profileIds.includes(c.profileId) && forumIds.includes(c.forumId)
  );
  const commentIds = _commentsNotDoingReplyingTo.map((c) => c.id);
  const _comments = _commentsNotDoingReplyingTo.filter(
    (c) => c.replyingTo === null || commentIds.includes(c.replyingTo)
  );
  const _likes = likes.filter(
    (l) => profileIds.includes(l.profileId) && forumIds.includes(l.forumId)
  );

  return {
    forums: _forums.map((f) =>
      ForumModel.dbSchema.parse({
        ...f,
        userId: f.profileId,
        imageUrl: f.imageUrl ? URL + f.imageUrl : null,
      })
    ),
    comments: _comments.map((c) =>
      CommentModel.dbSchema.parse({ ...c, userId: c.profileId })
    ),
    likes: _likes.map((l) =>
      LikeModel.dbSchema.parse({ ...l, userId: l.profileId })
    ),
  };
};

const convertChats = (
  chats: ChatOld[],
  profileIds: string[],
  messages: MessageOld[]
) => {
  const _chats = chats.filter(
    (c) => profileIds.includes(c.personOne) && profileIds.includes(c.personTwo)
  );
  const chatIds = _chats.map((c) => c.id);
  const _messages = messages.filter(
    (m) => profileIds.includes(m.by) && chatIds.includes(m.chatId)
  );

  return {
    chats: _chats.map((c) =>
      ChatModel.dbSchema.parse({
        ...c,
        userOne: c.personOne,
        userTwo: c.personTwo,
        randomUpdate: "start",
      })
    ),
    messages: _messages.map((m) =>
      MessageModel.dbSchema.parse({ ...m, senderId: m.by, message: m.body })
    ),
  };
};

const runTransaction = async (jsons: any) => {
  await connectDB(() => console.log("Connected"));

  await db.sync({ force: true });
  await db.transaction(async () => {
    for (const user of jsons.users) {
      await (User as any).create(user);
    }
    await Profile.bulkCreate(jsons.profiles);
    await Category.bulkCreate(jsons.categories);
    await Insight.bulkCreate(jsons.insights);
    await Forum.bulkCreate(jsons.forums);
    await Comment.bulkCreate(jsons.comments);
    await Like.bulkCreate(jsons.likes);
    await Chat.bulkCreate(jsons.chats);
    await Message.bulkCreate(jsons.messages);
  });

  await disconnectDB(() => console.log("Disconnected"));
};

export const runMigration = async () => {
  const jsons = (await getDataJsons()) as OldModels;

  const { users, profiles: _profiles } = await convertUserId(
    jsons.user,
    jsons.profile
  );

  const deletedProfileIds: string[] = [];

  const uIds = users.map((u) => u.id);
  for (const p of _profiles)
    if (!uIds.includes(p.id)) deletedProfileIds.push(p.id);

  const profiles = _profiles.filter((f) => !deletedProfileIds.includes(f.id));

  const { forums, comments, likes } = convertForums(
    jsons.forum,
    profiles.map((p) => p.id),
    jsons.forumcomment,
    jsons.forumlike
  );

  const categories = jsons.category.map((c) => CategoryModel.dbSchema.parse(c));

  const insights = jsons.insight
    .filter((i) => i.status === "Published")
    .map((i) =>
      InsightModel.dbSchema.parse({
        ...i,
        imageUrl: i.imageUrl ? URL + i.imageUrl : null,
      })
    );

  const { chats, messages } = convertChats(
    jsons.chat,
    profiles.map((p) => p.id),
    jsons.message
  );

  await runTransaction({
    users,
    profiles,
    forums,
    categories,
    insights,
    comments,
    likes,
    chats,
    messages,
  });
};

runMigration(); // excluding institutes/reviews/discussions/chats/messages/etc.
