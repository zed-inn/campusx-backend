# Authentication - /auth

**Service Actions** - [
create auth payload with user
]

## OTP - /otp

**Service Actions** - [
generate otp,
send otp to email,
verify otp by email,
generate otpToken,
verify otpToken,
get email from otpToken
]

- Get otp - /get [POST] - (email) - ()
- Verify otp - /verify [POST] - (email, otp) - (otpToken)

## Login - /login

**Service Actions** - [
get user with email and password,
get user with username and password,
get user with google mail and attributes
]

- Login with email/username and password - /basic [POST] - (email?, username?, password) - (authToken, user)
- Login with google mail - /google [POST] - (email, fullName, avatarUrl?) - (authToken, user)

## Register - /register

**Service Actions** - [
get user with email and password,
get user with google mail and attributes
]

- Register with email and password - /basic [POST] - (otpToken, password) - (authToken, user)
- Register with google mail - /google [POST] - (email, fullName, avatarUrl?) - (authToken, user)

## Recovery - /recovery

**Service Actions** - [
reset password with email and new password
]

- Recover with email if not signed up with google mail - /basic [POST] - (otpToken, password) - ()

## Logout - /logout

**Service Actions** - [
revoke authToken
]

- Logout with authToken - / [GET] [A] - () - ()

# User Profile - /profile

**Model** - UserProfile(Profile)[
id : uuid, ref to user,
fullName : string, 3-50,
username : string, null, 3-20,
about : text, null,
gender : male, female, other, null,
dob : string, format not decided,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get user with userId,
get users with filters,
create profile,
update profile
get users with userIds
]

**Aggregate Actions** - [
add isFollwed in users,
add ambassador in users,
add stats in users
]

= user = (id, fullName, username, avatarUrl, about, gender, dob, isFollowed, ambassador, stats, createdAt, updatedAt)
= shortuser = (id, fullName, username, avatarUrl, about, isFollowed, ambassador)

- Get user's profile - / [GET] - (userId) - (user)
- Get my profile - /me [GET] [A] - () - (user)
- Get users with filter - /users [GET] - (name?, page) - (shortusers)
- Create profile - / [POST] [A] - (fullName, about?, avatarUrl?, dob?, gender?, username?) - (user)
- Update profile - / [PATCH] [A] - (fullName?, about?, avatarUrl?, dob?, gender?, username?) - (user)
- Check username - /check-username [GET] - (username) - (available)

# Follow - /follow

**Model** - Follow(Follow)[
followerId : uuid, ref to profile,
followeeId : uuid, ref to profile,
]

**Model** - FollowStat(FollowStat)[
userId : uuid, ref to profile,
followers : number,
following : number
]

**Service Actions** - [
get followers by userId,
get following by userId,
follow by userId,
unfollow by userId,
get user stats,
get follow status by followerIds and followeeIds,
get follow stats by userIds,
update stats,
]

- Get followers - /followers [GET] - (userId, page) - (shortusers)
- Get my followers - /followers/me [GET] [A] - (page) - (shortusers)
- Get following - /following [GET] - (userId, page) - (shortusers)
- Get my following - /following/me [GET] [A] - (page) - (shortusers)
- Follow user - / [POST] [A] - (userId) - ()
- Unfollow user - / [DELETE] [A] - (userId) - ()

# Forums - /forums

= forum = (id, localId, userId, title, body, imageUrl, createdAt, updatedAt, stats, shortuser)
= forumcomment = (id, localId, forumId, userId, body, parentComment, replies, shortuser)

## Post - /post

**Model** - Post(ForumPost)[
id : uuid,
localId: string, null,
userId : uuid, ref to profile,
title : text, 1-500,
body : text, null, 1-5000,
imageUrl : url, null,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get posts by userId,
create post,
update post,
delete post,
get latest posts
]

**Aggregate Actions** - [
add isLiked to posts,
add stats to posts,
add user to posts
]

- Get user's posts - /user [GET] - (userId, page) - (forums)
- Get my posts - /user/me [GET] [A] - (page) - (forums)
- Create post - / [POST] [A] - (localId?, title, body, imageUrl?) - (forum)
- Update post - / [PATCH] [A] - (localId?, forumId, title?, body?, imageUrl?) - (forum)
- Delete post - / [DELETE] [A] - (forumId) - (id, localId)
- Get posts - /latest [GET] - (page) - (forums)

## Report - /report

**Model** - Report(ForumReport)[
id : uuid,
userId : uuid, ref to profile,
postId : uuid, ref to forum,
reason : text, null, 1-500,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
create report by postId
]

- Report post - / [POST] [A] - (forumId, reason?) - ()

## Comment - /comment

**Model** - Comment(ForumComment)[
id : uuid,
localId : string, null,
userId : uuid, ref to profile,
postId : uuid, ref to forum,
body : string, 1-500,
replyingTo : uuid, ref to comment,
replies : number,
createdAt : string,
updatedAt : string
]

**Model** - CommentStat(ForumCommentStat)[
id : uuid, ref to comment,
comments : number,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
create comment by postId,
update comment,
delete comment,
get comments by postId,
get parentComment by commentId,
get stats by commentId,
update stats
]

**Aggregate Actions** - [
add user to comments,
add parentComment to comments
]

- Create comment - / [POST] [A] - (localId?, forumId, body) - (forumcomment)
- Update comment - / [PATCH] [A] - (localId?, commentId, body?) - (forumcomment)
- Delete comment - / [DELETE] [A] - (commentId) - (id, localId)
- Get post's comments - / [GET] - (forumId, page) - (forumcomments)

## Reaction - /reaction

**Model** - Reaction(ForumReaction)[
userId : uuid, ref to profile,
forumId : uuid, ref to forum,
reaction : string enum - like,
createdAt : string,
updatedAt : string
]

**Model** - ReactionStat(ForumReactionStat)[
id: uuid, ref to forum,
likes : number,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
add reaction by userId and postId,
remove reaction by userId and postId,
get post stats by postIds
get post isLiked status by postIds,
update stats
]

- Add reaction like - /like [POST] [A] - (forumId) - ()
- Remove reaction like - /like [DELETE] [A] - (forumId) - ()

# Insight - /insight

= insight = (id, title, hindiTitle, body, hindiBody, referenceUrl, imageUrl, category, createdAt, updatedAt)

## Post - /post

**Model** - Post(InsightPost)[
id : uuid,
title : string, null, 1-50,
hindiTitle : string, null, 1-50,
body : string, null, 1-300,
hindiTitle : string, null, 1-300,
imageUrl : url, null,
referenceUrl : url, null,
categoryId : uuid, ref to category,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get posts by categories
]

**Aggregate Actions** - [
add category names to insights
]

- Get posts - / [GET] - (categories?, page) - (insights)

## Category - /category

**Model** - Category(InsightCategory)[
id : uuid,
name : string, 1-50,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get categories by page,
get category names by categoryids
]

- Get posts categories - / [GET] - (page) - (categories)

# Education - /education

**Model** - Education(UserEducation)[
id : uuid,
localId : string, null,
userId : uuid, ref to profile,
instituteId : uuid, ref to institute,
description : text, null, 1-500,
startYear : number,
startMonth : number, 1-12, null,
endYear : number, null,
endMonth : number, null, 1-12,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
add education,
update education,
delete education,
get educations by userId,
get users by instituteId,
get if a user is enrolled in an institute
]

**Aggregate Actions** - [
add institute to educations
]

= education = (id, userId, instituteId, description, startYear, startMonth, endYear, endMonth, createdAt, updatedAt, institute)

- Add education - / [POST] [A] - (localId?, instituteId, description?, startYear, startMonth?, endYear?, endMonth?) - (education)
- Update education - / [PATCH] [A] - (localId?, educationId, description?, startYear?, startMonth?, endYear?, endMonth?) - (education)
- Remove education - / [DELETE] [A] - (educationId) - (id, localId)
- Get user's education - / [GET] - (userId, page) - (educations)
- Get my education - /me [GET] [A] - (page) - (educations)
- Get institute students - /students [GET] - (instituteId, page) - (shortusers)

# Notification - /notification

**Model** - Notification(UserNotification)[
id : uuid,
userId : uuid, ref to profile,
type : forum, comment, like, reaction, admin, message, etc.,
title : string,
body : string, null,
imageUrl : string, null,
data : json, null,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get notifications by userId
]

- Get notifications - / [GET] [A] - (page) - (notifications)

# Institute - /institute

**Model** - Institute(Institute)[
id : uuid,
name : string,
aisheCode : string, null,
nameNormalized : string,
state : string,
district : string,
// TODO: will increase fields later,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get institutes by filters,
get states map of institutes,
get district map of districts
get institute by instituteIds
]

= institute = (id, name, state, district, type)
= shortinstitute = (id, name, state, district)

- Get institute - / [GET] - (instituteId) - (institute)s
- Get institutes with filter - /filter [GET] - (filters?, page) - (institutes)
- Get institutes state with country - /state [GET] - () - (states)
- Get institutes district with state - /district [GET] - () - (districts)

# Institute Review - /institute/review

**Model** - Review(InstituteReview)[
id : uuid,
localId : string, null,
userId : uuid, ref to profile,
instituteId : uuid, ref to instituteId,
body : string, null, 1-500,
rating : integer, 0-5,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
create review,
update review,
delete review,
get reviews by instituteId,
get review by instituteId and userId
]

**Aggregate Actions** - [
add user to reviews,
]

= institutereview = (id, userId, instituteId, body, rating, createdAt, updatedAt, shortuser)

- Review institute - / [POST] [A] - (localId?, instituteId, body, rating) - (institutereview)
- Update review - / [PATCH] [A] - (localId?, instituteId, body?, rating?) - (institutereview)
- Delete review - / [DELETE] [A] - (reviewId) - (id, localId)
- Get my review on institute - /me [GET] [A] - (instituteId) - (institutereview)
- Get institute reviews - / [GET] - (instituteId, page) - (institutereviews)

# Institute Community Chat - /institute/community-chat

= institutemessage = (id, userId, instituteId, body, stats, shortuser)

## Message - /message

**Model** - Message(InstituteMessage)[
id: uuid,
localId : string, null,
userId : uuid, ref to profile,
instituteId : uuid, ref to institute,
body : string, 1-2000,
replyingTo:b uuid, null,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
create message,
get messages by instituteId,
update message,
delete message,
get message by Id
]

**Aggregate Actions** - [
add stats to messages,
add isLiked to messages,
add user to messages
]

- Get institute messages - / [GET] - (instituteId) - (institutemessages)
- Message - / [POST] [A] - (localId?, instituteId, body, replyingTo?) - (institutemessage)
- Update message - / [PATCH] [A] - (localId?, messageId, body?) - (institutemessage)
- Delete message - / [DELETE] [A] - (messageId) - (id, localId)

## Reaction - /reaction

**Model** - Reaction(InstituteMessageReaction)[
messageId : uuid, ref to message,
userId : uuid, ref to profile,
reaction : string enum - like,
createdAt : string,
updatedAt : string
]

**Model** - ReactionStat(InstituteMessageReactionStat)[
messageId : uuid, ref to message,
likes : string,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
add reaction on message,
remove reaction on message,
get isLiked status on messages by messageIds,
get stats by messageIds
]

- Add reaction like - /like [POST] [A] - (messageId) - ()
- Remove reaction like - /like [DELETE] [A] - (messageId) - ()

# User - /user

**Model** - User(User)[
id : uuid,
email : string,
passwordHash : string, null,
referralCode : string,
fcmToken : string, null,
role : string,
createdAt : string,
updatedAt : string
]

## Report - /report

**Model** - Report(UserReport)[
id : uuid,
userId : uuid, ref to profile,
reporterId : uuid, ref to profile,
reason : string, null, 1-500,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
create report by userId
]

- Report user - / [POST] [A] - (userId, reason?) - ()

## Delete - /delete

**Service Actions** - [
delete account by userId
]

- Delete account - / [DELETE] [A] - () - ()

# Feedback - /feedback

**Model** - Feedback(Feedback)[
id : uuid,
userId : uuid, null, ref to profile,
message : text, 1-1000,
platformUsed : website, app
createdAt : string,
updatedAt : string
]

**Service Actions** - [
create feedback with userId? and message
]

- Give feedback - / [POST] - (message, platformUsed) - ()

# Upload - /upload

## Image - /image

**Service Actions** - [
upload image on s3 bucket and get url
]

- Upload image on server - / [POST] [A] - (file) - (url)

# Chats - /chat

= chat = (id, userOneId, userTwoId, createdAt, updatedAt, userOne, userTwo)
= message = (id, chatId, senderId, body, createdAt, updatedAt)

## Chat - /

**Model** - Chat(UserChat)[
id : uuid,
userOneId : uuid, ref to profile,
userTwoId : uuid, ref to profile,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get active chats,
create chat,
get chat by id,
]

**Aggregate Actions** - [
add users on chats
]

- Get active chats - /active [GET] [A] - (page) - (chats)

## Message - /message

**Model** - Message(UserChatMessage)[
id : uuid,
localId : string, null,
senderId : uuid, ref to profile,
chatId : uuid, ref to chat,
body : string, 1-1000,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get messages by chatId,
get latest messages of a user,
create message for a user,
create message in a chat,
update message in chat,
delete message in chat
]

- Get messages of a chat - / [GET] [A] - (chatId, page) - (messages)
- Get latest messages - /latest [GET] [A] - (page) - (messages)
- Message in a chat - / [POST] [A] - (localId?, chatId?, body) - (message)
- Message to a user - / [POST] [A] - (localId?, userId?, body) - (message)
- Update message in a chat - / [PATCH] [A] - (localId?, messageId, body?) - (message)
- Delete message in a chat - / [DELETE] [A] - (messageId) - (id, localId)

# Ambassador - /ambassador

= ambassadorrequest = (id, userId, instituteId, reason, shortinstitute)

## Request - /request

**Model** - Request(AmbassadorRequest)[
id : uuid,
userId : uuid, ref to profile,
instituteId : uuid, ref to institute
reason : string, null, 1-2000,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
create request for processing,
update request if pending,
delete request if pending,
get request status by userId,
]

**Aggregate Actions** - [
add institute to ambassador
]

- Request for ambassador position - / [POST] [A] - (instituteId, reason?) - (ambassadorrequest)
- Update request - / [PATCH] [A] - (requestId, reason?, instituteId?) - (ambassadorrequest)
- Withdraw request - / [DELETE] [A] - (requestId) - (id)
- Get my request/status - /status [GET] [A] - () - (ambassadorrequest)

## Ambassador - /

**Model** - Ambassador(Ambassador)[
userId : uuid, ref to profile,
instituteId : uuid, ref to institute,
createdAt : string,
updatedAt : string
]

**Service Actions** - [
get users by instituteId
]

- Get institute's ambassadors - /institute [GET] - (instituteId) - (shortusers)
