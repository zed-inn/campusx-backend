import { getOldData } from "./scripts/get-data";
import { mapAllData } from "./scripts/data-mapper";
import {
  CategoryAttributes,
  CategoryModel,
  Category,
} from "@modules/features/insights/category/category.model";
import {
  PostModel as InsightPostModel,
  PostAttributes as InsightPostAttributes,
  Post as InsightPost,
} from "@modules/features/insights/post/post.model";
import { z } from "zod";
import db, { connectDB, disconnectDB } from "@config/database";
import { User, UserAttributes, UserModel } from "@modules/core/user/user.model";
import { generateReferralCode } from "@shared/utils/generate-code";
import {
  ProfileAttributes,
  ProfileModel,
  Profile,
} from "@modules/core/profile/profile.model";
import {
  FollowAttributes,
  FollowModel,
  Follow,
} from "@modules/features/follow/follow.model";
import {
  FollowStatAttributes,
  FollowStatModel,
  FollowStat,
} from "@modules/features/follow/stat/stat.model";
import {
  PostAttributes as ForumPostAttributes,
  PostModel as ForumPostModel,
  Post as ForumPost,
} from "@modules/features/forums/post/post.model";
import {
  CommentAttributes as ForumCommentAttributes,
  CommentModel as ForumCommentModel,
  Comment as ForumComment,
} from "@modules/features/forums/comments/comment.model";
import {
  ReactionAttributes as ForumReactionAttributes,
  ReactionModel as ForumReactionModel,
  Reaction as ForumReaction,
} from "@modules/features/forums/reactions/reaction.model";
import {
  ReactionStatAttributes as ForumReactionStatAttributes,
  ReactionStatModel as ForumReactionStatModel,
  ReactionStat as ForumReactionStat,
} from "@modules/features/forums/reactions/stat/stat.model";
import {
  CommentStatAttributes as ForumCommentStatAttributes,
  CommentStatModel as ForumCommentStatModel,
  CommentStat as ForumCommentStat,
} from "@modules/features/forums/comments/stat/stat.model";
import {
  ChatAttributes,
  ChatModel,
  Chat,
} from "@modules/features/chats/chat/chat.model";
import {
  MessageAttributes as ChatsMessageAttributes,
  MessageModel as ChatsMessageModel,
  Message,
  MessageAttributes,
} from "@modules/features/chats/message/message.model";
import {
  WalletAttributes,
  WalletModel,
  Wallet,
} from "@modules/core/wallet/wallet.model";
import {
  ReferralUseAttributes,
  ReferralUseModel,
  ReferralUse,
} from "@modules/core/user/referral-use/referral-use.model";
import {
  Institute,
  InstituteModel,
} from "@modules/core/institutes/institute.model";
import { dataFill as InstitutesFill } from "@modules/core/institutes/preprocessing/institute.process";
import { InstituteSchema as InstituteOldSchema } from "./mapping/data-old.dto";
import {
  Review,
  ReviewAttributes,
  ReviewModel,
} from "@modules/features/institute-review/review.model";
import {
  MessageAttributes as CommunityChatMessageAttributes,
  MessageModel as CommunityChatMessageModel,
  Message as CommunityChatMessage,
} from "@modules/features/institute-community-chat/message/message.model";
import {
  ReactionAttributes as CCReactionAttributes,
  ReactionModel as CCReactionModel,
  Reaction as CCReaction,
} from "@modules/features/institute-community-chat/reactions/reaction.model";
import {
  ReactionStatAttributes as CCReactionStatAttributes,
  ReactionStatModel as CCReactionStatModel,
  ReactionStat as CCReactionStat,
} from "@modules/features/institute-community-chat/reactions/stat/stat.model";
import {
  Education,
  EducationAttributes,
  EducationModel,
} from "@modules/features/education/education.model";
import { Sanitize } from "@shared/utils/sanitize";
import { PostService } from "@modules/features/forums/post/post.service";
import { ProfileService } from "@modules/core/profile";
import { NotificationService } from "@modules/core/notifications";
import { limitText } from "@shared/utils/limit-text";
import { DB_Errors } from "@shared/errors/db-errors";
import { readFileSync } from "fs";
import path from "path";

const migrate = async () => {
  const oldData = getOldData();
  const oldDataMap = mapAllData(oldData);
  const imageUrls: Record<string, string> = JSON.parse(
    readFileSync(path.join(__dirname, "./url-mapped.json")).toString()
  );
  console.log("Loaded Url mapped of images...");

  // Module Insights
  {
    const insights: {
      categories: CategoryAttributes[];
      posts: InsightPostAttributes[];
    } = { categories: [], posts: [] };
    insights.categories = oldData.category.map((c) =>
      CategoryModel.dbSchema.parse(c)
    );
    insights.posts = oldData.insight.map((i) => {
      try {
        i.imageUrl = z.url().parse(i.imageUrl);
      } catch {
        i.imageUrl = i.imageUrl
          ? imageUrls[i.imageUrl.replace("/uploads/", "")] ?? null
          : null;
      }
      return InsightPostModel.dbSchema.parse(i);
    });
    await Category.bulkCreate(insights.categories);
    await InsightPost.bulkCreate(insights.posts);
    console.log("Completed Module : Insights");
  }

  // Module User
  {
    const users: UserAttributes[] = [];
    for (const p of oldData.profile) {
      const [matchedUser] = oldData.user.filter((u) => u.id === p.userId);
      if (matchedUser) matchedUser.id = p.id;
    }
    oldData.user
      .filter((x) => x.type === "normal user")
      .map((u) =>
        users.push(
          UserModel.dbSchema.parse({
            ...u,
            referralCode:
              oldDataMap.profile[u.id]?.referralCode ?? generateReferralCode(8),
            passwordHash: u.password,
            fcmToken: oldDataMap.profile[u.id]?.fcmToken ?? null,
            role: "STUDENT",
          })
        )
      );
    await User.bulkCreate(users);
    console.log("Completed Module : User");
  }

  // Module Profile
  {
    const profiles: ProfileAttributes[] = [];
    oldData.profile.map((p) => {
      let avatarUrl = p.profileImageUrl;
      try {
        avatarUrl = z.url().parse(avatarUrl);
      } catch {
        avatarUrl = avatarUrl
          ? imageUrls[avatarUrl.replace("/uploads/", "")] ?? null
          : null;
      }
      profiles.push(
        ProfileModel.dbSchema.parse({
          ...p,
          gender: p.gender?.toLowerCase() ?? null,
          avatarUrl,
          username: p.username && p.username.length < 3 ? null : p.username,
        })
      );
    });
    await Profile.bulkCreate(profiles);
    console.log("Completed Module : Profile");
  }

  // Module Follow
  {
    const follows: FollowAttributes[] = [];
    oldData.follow.map((f) =>
      follows.push(
        FollowModel.dbSchema.parse({ ...f, followeeId: f.profileId })
      )
    );
    const followStats: FollowStatAttributes[] = [];
    for (const p of oldData.profile) {
      const stats = { followers: 0, following: 0 };
      let maxUpdateDate = 0;
      follows.map((f) => {
        if (f.followeeId === p.id) stats.followers++;
        if (f.followerId === p.id) stats.following++;
        if (f.followeeId === p.id || f.followerId === p.id)
          maxUpdateDate = Math.max(f.updateDate, maxUpdateDate);
      });
      const createDate = p.createDate;
      const updateDate = maxUpdateDate;
      follows;
      followStats.push(
        FollowStatModel.dbSchema.parse({
          id: p.id,
          ...stats,
          createDate,
          updateDate,
        })
      );
    }
    await Follow.bulkCreate(follows);
    await FollowStat.bulkCreate(followStats);
    console.log("Completed Module : Follow + Follow Stats");
  }

  // Module Forums
  {
    const forums: {
      posts: ForumPostAttributes[];
      comments: ForumCommentAttributes[];
      commentStats: ForumCommentStatAttributes[];
      reactions: ForumReactionAttributes[];
      reactionStats: ForumReactionStatAttributes[];
    } = {
      posts: [],
      comments: [],
      reactions: [],
      commentStats: [],
      reactionStats: [],
    };

    oldData.forum.map((f) => {
      let imageUrl = f.imageUrl;
      try {
        imageUrl = z.url().parse(imageUrl);
      } catch {
        imageUrl = imageUrl
          ? imageUrls[imageUrl.replace("/uploads/", "")] ?? null
          : null;
      }
      forums.posts.push(
        ForumPostModel.dbSchema.parse({ ...f, userId: f.profileId, imageUrl })
      );
    });
    oldData.forumcomment.map((c) =>
      forums.comments.push(
        ForumCommentModel.dbSchema.parse({
          ...c,
          userId: c.profileId,
          repliesCount: c.replies,
          postId: c.forumId,
        })
      )
    );
    oldData.forumlike.map((l) =>
      forums.reactions.push(
        ForumReactionModel.dbSchema.parse({
          ...l,
          userId: l.profileId,
          postId: l.forumId,
        })
      )
    );
    for (const f of oldData.forum) {
      const stats = { comments: 0, likes: 0 };
      const createDate = f.createDate;
      {
        let maxUpdateDate = 0;
        forums.comments.map((c) => {
          if (c.postId === f.id) {
            stats.comments++;
            maxUpdateDate = Math.max(maxUpdateDate, c.updateDate);
          }
        });
        const updateDate = maxUpdateDate;
        forums.commentStats.push(
          ForumCommentStatModel.dbSchema.parse({
            id: f.id,
            ...stats,
            createDate,
            updateDate,
          })
        );
      }
      {
        let maxUpdateDate = 0;
        forums.reactions.map((r) => {
          if (r.postId === f.id) {
            stats.likes++;
            maxUpdateDate = Math.max(maxUpdateDate, r.updateDate);
          }
        });
        const updateDate = maxUpdateDate;
        forums.reactionStats.push(
          ForumReactionStatModel.dbSchema.parse({
            id: f.id,
            ...stats,
            createDate,
            updateDate,
          })
        );
      }
    }
    await ForumPost.bulkCreate(forums.posts);
    await ForumComment.bulkCreate(forums.comments);
    await ForumReaction.bulkCreate(forums.reactions);
    await ForumCommentStat.bulkCreate(forums.commentStats);
    await ForumReactionStat.bulkCreate(forums.reactionStats);
    console.log(
      "Completed Module : Forums + Posts + Comments + Reactions + CommentStats + ReactionStats"
    );
  }

  // Module Chat
  {
    const chats: {
      chat: ChatAttributes[];
      messages: ChatsMessageAttributes[];
    } = { chat: [], messages: [] };
    oldData.chat.map((c) =>
      chats.chat.push(
        ChatModel.dbSchema.parse({
          ...c,
          userOneId: c.personOne,
          userTwoId: c.personTwo,
        })
      )
    );
    oldData.message.map((m) =>
      chats.messages.push(
        ChatsMessageModel.dbSchema.parse({ ...m, senderId: m.by })
      )
    );
    await Chat.bulkCreate(chats.chat);
    await Message.bulkCreate(chats.messages);
    console.log("Completed Module : Chats + Messages");
  }

  // Module Wallet
  {
    const wallets: WalletAttributes[] = [];
    oldData.profile.map((p) =>
      wallets.push(WalletModel.dbSchema.parse({ ...p, balance: 50 }))
    );
    oldData.refcode.map((r) => {
      for (let i = 0; i < wallets.length; i++) {
        if (
          (wallets[i] && (wallets[i] as any).id === r.referredId) ||
          (wallets[i] && (wallets[i] as any).id === r.profileId)
        ) {
          (wallets[i] as any).balance += 50;
          (wallets[i] as any).updateDate = Math.max(
            r.updateDate,
            (wallets[i] as any).updateDate
          );
          break;
        }
      }
    });
    await Wallet.bulkCreate(wallets);
    console.log("Completed Module : Wallet");
  }

  // Module ReferralUse
  {
    const referralUses: ReferralUseAttributes[] = [];
    oldData.refcode.map((r) =>
      referralUses.push(
        ReferralUseModel.dbSchema.parse({
          ...r,
          userId: r.referredId,
          referrerId: r.profileId,
          referralCodeUsed: r.referralCode,
        })
      )
    );
    await ReferralUse.bulkCreate(referralUses);
    console.log("Completed Module : Referral Use");
  }

  const instituteIdToNewMap: Record<string, string> = {};
  // Module Institute
  {
    await InstitutesFill(); // Fill institutes
    console.log("\nInstitutes updating now...");
    const instituteIds: Set<string> = new Set();
    oldData.education.map((e) => instituteIds.add(e.instituteId));
    oldData.institutereview.map((r) => instituteIds.add(r.instituteId));
    oldData.institutedisc.map((d) => instituteIds.add(d.instituteId));
    for (const id of instituteIds) {
      const aisheCode = oldDataMap.institute[id]?.aishe_code;
      if (aisheCode) {
        const newInst = await Institute.findOne({ where: { aisheCode } });
        if (newInst) instituteIdToNewMap[id] = newInst.dataValues.id;
      }
    }

    let i = 0;
    const takeFieldsSchema = InstituteOldSchema.pick({
      about: true,
      address: true,
      administrative_ministry: true,
      country: true,
      district: true,
      standalone_type: true,
      imageUrl: true,
      landline: true,
      location: true,
      management: true,
      phone: true,
      pinCode: true,
      shortName: true,
      website: true,
      year_of_establishment: true,
    });
    const fieldsOldToNewMap = {
      about: "about",
      address: "address",
      administrative_ministry: "administrativeMinistry",
      country: "country",
      district: "district",
      standalone_type: "standaloneType",
      imageUrl: "imageUrl",
      landline: "landline",
      location: "location",
      management: "management",
      phone: "phone",
      pinCode: "pinCode",
      shortName: "shortName",
      website: "website",
      year_of_establishment: "yearOfEstablishment",
    } as const;
    let j = 0;
    for (const inst of oldData.institute) {
      const aisheCode = inst.aishe_code;
      const fields = takeFieldsSchema.parse(inst);
      const newInst = await Institute.findOne({ where: { aisheCode } });
      if (!newInst)
        throw new Error(`No Institute Found of Aishe Code: ${aisheCode}.`);
      const newInstData = newInst.plain;

      const toUpdate: Record<string, unknown> = {};
      for (const k in Object.keys(fields)) {
        let tempI: string | number | null = fields[k as keyof typeof fields];
        const kToNField =
          fieldsOldToNewMap[k as keyof typeof fieldsOldToNewMap];
        const tempO = newInstData[kToNField];
        if (tempO === null && tempI !== null) {
          if (kToNField === "yearOfEstablishment") tempI = parseInt(tempI);
          else if (kToNField === "website" || kToNField === "imageUrl") {
            tempI = Sanitize.sanitizeUrl(tempI);
          }
          toUpdate[kToNField] = tempI;
        }
      }
      await newInst.update(toUpdate);
      process.stdout.write(`${i++ + 1}/${oldData.institute.length}\r`);
    }
    console.log("Completed Module : Institutes");
  }

  // Module Institute Review
  {
    const reviews: ReviewAttributes[] = [];
    const ratingToInstIds: Record<string, number> = {};
    const reviewsToInstIds: Record<string, number> = {};
    oldData.institutereview.map((r) => {
      const instId = instituteIdToNewMap[r.instituteId];
      if (instId && r.review && r.rating) {
        reviews.push(
          ReviewModel.dbSchema.parse({
            ...r,
            instituteId: instId,
            userId: r.profileId,
            body: r.review,
            localId: null,
          })
        );
        ratingToInstIds[instId] = ratingToInstIds[instId]
          ? ratingToInstIds[instId] + r.rating
          : 0;
        reviewsToInstIds[instId] = reviewsToInstIds[instId]
          ? reviewsToInstIds[instId] + 1
          : 0;
      }
    });
    await Review.bulkCreate(reviews);
    for (const k of Object.keys(ratingToInstIds)) {
      await Institute.update(
        {
          rating: ratingToInstIds[k] as number,
          reviewsCount: reviewsToInstIds[k] as number,
        },
        { where: { id: k } }
      );
    }
    console.log("Completed Module : Institute Review");
  }

  // Module Institute Community Chat
  {
    const commChats: {
      chats: CommunityChatMessageAttributes[];
      reactions: CCReactionAttributes[];
      reactionStats: CCReactionStatAttributes[];
    } = { chats: [], reactions: [], reactionStats: [] };
    oldData.institutedisc.map((d) =>
      commChats.chats.push(
        CommunityChatMessageModel.dbSchema.parse({
          ...d,
          body: d.message,
          instituteId: instituteIdToNewMap[d.instituteId],
          userId: d.profileId,
          replyingTo: d.parentId,
          localId: null,
        })
      )
    );
    oldData.institutediscreaction.map((d) =>
      commChats.reactions.push(
        CCReactionModel.dbSchema.parse({
          ...d,
          userId: d.profileId,
          messageId: d.discussionId,
        })
      )
    );
    for (const d of oldData.institutedisc) {
      const createDate = d.createDate;
      let maxUpdateDate = 0;
      commChats.reactions.map((r) => {
        if (r.messageId === d.id)
          maxUpdateDate = Math.max(maxUpdateDate, r.updateDate);
      });
      const stats = d.reactions;
      commChats.reactionStats.push(
        CCReactionStatModel.dbSchema.parse({
          createDate,
          updateDate: maxUpdateDate,
          id: d.id,
          likes: stats.likes,
        })
      );
    }
    await CommunityChatMessage.bulkCreate(commChats.chats);
    await CCReaction.bulkCreate(commChats.reactions);
    await CCReactionStat.bulkCreate(commChats.reactionStats);
    console.log("Completed Module : Community Chat + Reaction + ReactionStats");
  }

  // Module Education
  {
    const educations: EducationAttributes[] = [];
    oldData.education.map((e) =>
      educations.push(
        EducationModel.dbSchema.parse({
          ...e,
          instituteId: instituteIdToNewMap[e.instituteId],
          userId: e.profileId,
          localId: null,
        })
      )
    );
    await Education.bulkCreate(educations);
    console.log("Completed Module : Education");
  }

  // Module Notification
  {
    const comments = await ForumComment.findAll();
    const reactions = await ForumReaction.findAll();

    for (const reaction of reactions) {
      const r = reaction.plain;
      const f = (await PostService.getById(r.postId)).plain;
      const u = (await ProfileService.getById(r.userId)).plain;

      await NotificationService.create({
        type: "LIKE",
        title: `${u.fullName}${
          u.username ? ` (@${u.username})` : ""
        } liked your post ${limitText(f.title, 20)}`,
        userId: f.userId,
        body: null,
        createDate: r.createDate,
        updateDate: r.updateDate,
      });
    }

    for (const comment of comments) {
      const c = comment.plain;
      const f = (await PostService.getById(c.postId)).plain;
      const u = (await ProfileService.getById(c.userId)).plain;

      await NotificationService.create({
        type: "COMMENT",
        title: `New comment on your post ${limitText(f.title, 20)}`,
        body: `${u.fullName}: ${limitText(c.body)}`,
        userId: f.userId,
        createDate: c.createDate,
        updateDate: c.updateDate,
      });

      if (c.replyingTo) {
        const pc = await ForumComment.findByPk(c.replyingTo);
        if (!pc) throw DB_Errors.notFound;
        await NotificationService.create({
          type: "REPLY",
          title: `New reply on your comment on post ${limitText(f.title, 20)}`,
          body: `${u.fullName}: ${limitText(c.body)}`,
          userId: pc.plain.userId,
          createDate: c.createDate,
          updateDate: c.updateDate,
        });
      }
    }
    console.log("Completed Module : Notifications");
  }
};

const run = async () => {
  await connectDB();
  await db.sync({ force: true });

  try {
    await migrate();
  } catch (error) {
    console.log(error);
  }

  await disconnectDB();
};

run();
// migrate();
