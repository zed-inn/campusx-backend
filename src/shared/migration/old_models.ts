export type CategoryOld = {
  id: string;
  name: string;
  createDate: number;
  updateDate: number;
};

export type ChatOld = {
  createDate: number;
  updateDate: number;
  id: string;
  localId: string | null;
  personOne: string;
  personTwo: string;
  messagesForPersonOne: number;
  messagesForPersonTwo: number;
};

export type EducationOld = {
  createDate: number;
  updateDate: number;
  id: string;
  instituteId: string;
  profileId: string;
  startYear: number;
  startMonth: number | null;
  endYear: number | null;
  endMonth: number | null;
  isCompleted: boolean;
  description: string | null;
};

export type FollowOld = {
  createDate: number;
  updateDate: number;
  id: string;
  profileId: string;
  followerId: string;
};

export type ForumOld = {
  createDate: number;
  updateDate: number;
  id: string;
  profileId: string;
  localId: string | null;
  title: string;
  body: string;
  imageUrl: string | null;
  comments: number;
  likes: number;
};

export type CommentOld = {
  createDate: number;
  updateDate: number;
  id: string;
  profileId: string;
  forumId: string;
  localId: null | null;
  body: string;
  replyingTo: string | null;
  replies: number;
};

export type LikeOld = {
  createDate: number;
  updateDate: number;
  id: string;
  profileId: string;
  forumId: string;
};

export type InsightOld = {
  createDate: number;
  updateDate: number;
  id: string;
  title: string | null;
  body: string | null;
  hindiTitle: string | null;
  hindiBody: string | null;
  imageUrl: string | null;
  newsUrl: string | null;
  categoryId: string;
  status: string;
};

export type InstituteOld = {
  createDate: number;
  updateDate: number;
  id: string;
  aishe_code: string;
  name: string;
  state: string | null;
  district: string | null;
  website: string | null;
  year_of_establishment: string | null;
  location: string | null;
  category: string | null;
  administrative_ministry: string | null;
  standalone_type: string | null;
  management: string | null;
  college_type: string | null;
  university_name: string | null;
  university_type: string | null;
  name_normalized: string;
  about: string | null;
  shortName: string | null;
  address: string | null;
  phone: string | null;
  landline: string | null;
  country: string | null;
  pinCode: string | null;
  imageUrl: string | null;
  rating: number;
  ratedBy: number;
  reviews: number;
  instituteType: string;
};

export type DiscussionOld = {
  createDate: number;
  updateDate: number;
  id: string;
  profileId: string;
  instituteId: string;
  message: string;
  parentId: string | null;
  reactions: any;
};

export type DiscussionLikeOld = {
  createDate: number;
  updateDate: number;
  id: string;
  profileId: string;
  discussionId: string;
  type: string;
};

export type InstReviewOld = {
  createDate: number;
  updateDate: number;
  id: string;
  profileId: string;
  instituteId: string;
  review: string;
  rating: number;
};

export type MessageOld = {
  createDateLocal: number | null;
  createDate: number;
  updateDate: number;
  id: string;
  chatId: string;
  localId: null | string;
  body: string;
  by: string;
  deletedByPersonOne: boolean;
  deletedByPersonTwo: boolean;
  status: string;
};

export type ProfileOld = {
  createDate: number;
  updateDate: number;
  id: string;
  userId: string;
  username: string;
  fullName: string;
  about: string | null;
  profileImageUrl: null | string;
  gender: string | null;
  dob: string | null;
  followers: number;
  following: number;
  forums: number;
  reviews: number;
  referralCode: string;
  wallet: number;
  referrals: number;
  fcmToken: string | null;
};

export type UserOld = {
  createDate: number;
  updateDate: number;
  id: string;
  password: string | null;
  email: string;
  type: string;
  permissions: { RESTRICTED: any[]; UNRESTRICTED: any[] };
};

export type OldModels = {
  user: UserOld[];
  profile: ProfileOld[];
  institute: InstituteOld[];
  category: CategoryOld[];
  insight: InsightOld[];
  message: MessageOld[];
  chat: ChatOld[];
  forum: ForumOld[];
  follow: FollowOld[];
  institutedisc: DiscussionOld[];
  institutereview: InstReviewOld[];
  institutediscreaction: DiscussionLikeOld[];
  forumcomment: CommentOld[],
  forumlike: LikeOld[],
  education: EducationOld[],
};
