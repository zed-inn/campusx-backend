import { z } from "zod";

export const BaseSchema = z.object({
  createDate: z.int().positive(),
  updateDate: z.int().positive(),
});
export type BaseDto = z.infer<typeof BaseSchema>;

export const CategorySchema = BaseSchema.extend({
  id: z.uuidv4(),
  name: z.string(),
});
export type CategoryDto = z.infer<typeof CategorySchema>;

export const ChatSchema = BaseSchema.extend({
  id: z.uuidv4(),
  localId: z.string().nullable(),
  personOne: z.uuidv4(),
  personTwo: z.uuidv4(),
});
export type ChatDto = z.infer<typeof ChatSchema>;

export const EducationSchema = BaseSchema.extend({
  id: z.uuidv4(),
  instituteId: z.uuidv4(),
  profileId: z.uuidv4(),
  startYear: z.int(),
  startMonth: z.int().nullable(),
  endYear: z.int().nullable(),
  endMonth: z.int().nullable(),
  description: z.string().nullable(),
});
export type EducationDto = z.infer<typeof EducationSchema>;

export const FollowSchema = BaseSchema.extend({
  profileId: z.uuidv4(),
  followerId: z.uuidv4(),
});
export type FollowDto = z.infer<typeof FollowSchema>;

export const ForumSchema = BaseSchema.extend({
  id: z.uuidv4(),
  profileId: z.uuidv4(),
  localId: z.string().nullable(),
  title: z.string(),
  body: z.string(),
  imageUrl: z.string().nullable(),
  comments: z.int().nonnegative(),
  likes: z.int().nonnegative(),
});
export type ForumDto = z.infer<typeof ForumSchema>;

export const ForumCommentSchema = BaseSchema.extend({
  id: z.uuidv4(),
  profileId: z.uuidv4(),
  forumId: z.uuidv4(),
  localId: z.string().nullable(),
  body: z.string(),
  replyingTo: z.uuidv4().nullable(),
  replies: z.int().nonnegative(),
});
export type ForumCommentDto = z.infer<typeof ForumCommentSchema>;

export const ForumLikeSchema = BaseSchema.extend({
  profileId: z.uuidv4(),
  forumId: z.uuidv4(),
});
export type ForumLikeDto = z.infer<typeof ForumLikeSchema>;

export const InsightSchema = BaseSchema.extend({
  id: z.uuidv4(),
  title: z.string(),
  body: z.string(),
  hindiTitle: z.string(),
  hindiBody: z.string(),
  imageUrl: z.string().nullable(),
  newsUrl: z.string().nullable(),
  categoryId: z.uuidv4(),
  status: z.enum(["Draft", "On Review", "Published"]),
});
export type InsightDto = z.infer<typeof InsightSchema>;

export const InstituteSchema = BaseSchema.extend({
  id: z.uuidv4(),
  aishe_code: z.string(),
  name: z.string(),
  state: z.string().nullable(),
  district: z.string().nullable(),
  website: z.string().nullable(),
  year_of_establishment: z.string().nullable(),
  location: z.string().nullable(),
  instituteType: z.string(),
  administrative_ministry: z.string().nullable(),
  standalone_type: z.string().nullable(),
  management: z.string().nullable(),
  college_type: z.string().nullable(),
  university_name: z.string().nullable(),
  university_type: z.string().nullable(),
  name_normalized: z.string(),
  about: z.string().nullable(),
  shortName: z.string().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  landline: z.string().nullable(),
  country: z.string().nullable(),
  pinCode: z.string().nullable(),
  imageUrl: z.string().nullable(),
  rating: z.number().nonnegative(),
  ratedBy: z.int().nonnegative(),
  reviews: z.int().nonnegative(),
});
export type InstituteDto = z.infer<typeof InstituteSchema>;

export const InstituteDiscussionSchema = BaseSchema.extend({
  id: z.uuidv4(),
  profileId: z.uuidv4(),
  instituteId: z.uuidv4(),
  message: z.string(),
  parentId: z.uuidv4().nullable(),
  reactions: z
    .object({ likes: z.int().nonnegative().default(0) })
    .default({ likes: 0 }),
});
export type InstituteDiscussionDto = z.infer<typeof InstituteDiscussionSchema>;

export const InstituteDiscussionReactionSchema = BaseSchema.extend({
  profileId: z.uuidv4(),
  discussionId: z.uuidv4(),
});
export type InstituteDiscussionReactionDto = z.infer<
  typeof InstituteDiscussionReactionSchema
>;

export const InstituteReviewSchema = BaseSchema.extend({
  id: z.uuidv4(),
  profileId: z.uuidv4(),
  instituteId: z.uuidv4(),
  review: z.string().nullable(),
  rating: z.int().min(0).max(5),
});
export type InstituteReviewDto = z.infer<typeof InstituteReviewSchema>;

export const MessageSchema = BaseSchema.extend({
  id: z.uuidv4(),
  chatId: z.uuidv4(),
  localId: z.string().nullable(),
  body: z.string(),
  by: z.uuidv4(),
  status: z.string(),
  createDateLocal: z.coerce.number().int().nullable(),
});
export type MessageDto = z.infer<typeof MessageSchema>;

export const NotificationSchema = BaseSchema.extend({
  id: z.uuidv4(),
  profileId: z.uuidv4(),
  heading: z.string(),
  body: z.string().nullable(),
  type: z.string(),
});
export type NotificationDto = z.infer<typeof NotificationSchema>;

export const ProfileSchema = BaseSchema.extend({
  id: z.uuidv4(),
  userId: z.uuidv4(),
  username: z.string().nullable(),
  fullName: z.string(),
  about: z.string().nullable(),
  profileImageUrl: z.string().nullable(),
  gender: z.string().nullable(),
  dob: z.coerce.number().int().nullable(),
  followers: z.int().nonnegative(),
  following: z.int().nonnegative(),
  referralCode: z.string(),
  wallet: z.int().nonnegative(),
  fcmToken: z.string().nullable(),
});
export type ProfileDto = z.infer<typeof ProfileSchema>;

export const ReferralCodeSchema = BaseSchema.extend({
  deviceId: z.string(),
  profileId: z.uuidv4(),
  referredId: z.uuidv4(),
  referralCode: z.string(),
});
export type ReferralCodeDto = z.infer<typeof ReferralCodeSchema>;

export const UserSchema = BaseSchema.extend({
  id: z.uuidv4(),
  email: z.email(),
  password: z.string().nullable(),
  type: z.string(),
});
export type UserDto = z.infer<typeof UserSchema>;

export const WalletSchema = BaseSchema.extend({
  id: z.uuidv4(),
  profileId: z.uuidv4(),
  value: z.int().nonnegative(),
});
export type WalletDto = z.infer<typeof WalletSchema>;

export const Schemas = {
  CategorySchema,
  ChatSchema,
  EducationSchema,
  FollowSchema,
  ForumSchema,
  ForumCommentSchema,
  ForumLikeSchema,
  InsightSchema,
  InstituteSchema,
  InstituteDiscussionReactionSchema,
  InstituteDiscussionSchema,
  InstituteReviewSchema,
  MessageSchema,
  NotificationSchema,
  ProfileSchema,
  ReferralCodeSchema,
  UserSchema,
  WalletSchema,
};
