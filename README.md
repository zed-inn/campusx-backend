# API Documentation

> Auto-generated. Do not edit manually.

## OTP

### Get Otp

**post** `/auth/otp/get`

Get auto generated otp on email

**Body :**
```ts
{
  email: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

### Verify Otp

**post** `/auth/otp/verify`

Verify otp sent on email

**Body :**
```ts
{
  email: string;
  otp: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    otpToken: string;
  };
}
```

---

## Login

### Login Basic

**post** `/auth/login/basic`

Login with email and password

**Body :**
```ts
{
  email?: string;
  username?: string | null;
  password: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    authToken: string;
    user: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    } | null;
  };
}
```

---

### Login Google

**post** `/auth/login/google`

Login with google mail

**Body :**
```ts
{
  referralCode: string | null;
  deviceId: string | null;
  fullName: string;
  avatarUrl: string | null;
  email: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    authToken: string;
    user: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    } | null;
  };
}
```

---

## Register/Signup

### Register basic

**post** `/auth/register/basic`

Register using email and password

**Body :**
```ts
{
  referralCode: string | null;
  deviceId: string | null;
  otpToken: string;
  password: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    authToken: string;
    user: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    } | null;
  };
}
```

---

### Register Google

**post** `/auth/register/google`

Register with google mail

**Body :**
```ts
{
  referralCode: string | null;
  deviceId: string | null;
  fullName: string;
  avatarUrl: string | null;
  email: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    authToken: string;
    user: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    } | null;
  };
}
```

---

## Account Recovery

### Recover password : Basic Account

**post** `/auth/recovery/basic`

Reset password of an account with password after getting and verifying otp

**Body :**
```ts
{
  otpToken: string;
  password: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

## Logout

### Logout

**get** `/auth/logout/`  **( Login Required )**

logout

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

## User Profile

### Check username

**get** `/profile/check-username`

Check if a username is available or not

**Query Parameters :**
```ts
{
  username: string | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

### Get user's profile

**get** `/profile/`

Get a specific user's profile

**Query Parameters :**
```ts
{
  userId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    user: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    };
  };
}
```

---

### Get my profile

**get** `/profile/me`  **( Login Required )**

Get the profile of the current logged in user

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    user: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    };
  };
}
```

---

### Get users

**get** `/profile/users`

Get short profiles of recommended/random users

**Query Parameters :**
```ts
{
  name?: any;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    users: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    }[];
  };
}
```

---

### Create profile

**post** `/profile/`  **( Login Required )**

Create profile for the current logged in user after registering

**Body :**
```ts
{
  fullName: string;
  username?: string | null;
  about?: string | null;
  avatarUrl?: string | null;
  gender?: string | null;
  dob?: number | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    user: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    };
  };
}
```

---

### Update profile

**patch** `/profile/`  **( Login Required )**

Update any field of profile, remaining other unaffected

**Body :**
```ts
{
  fullName?: string;
  username?: string | null;
  about?: string | null;
  avatarUrl?: string | null;
  gender?: string | null;
  dob?: number | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    user: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      isFollowed: boolean;
      stats: {
        followers: number;
        following: number;
      };
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    };
  };
}
```

---

## User Report

### Report User

**post** `/user/report/`  **( Login Required )**

Reports a user

**Body :**
```ts
{
  userId: string;
  reason: string | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

## User

### Get Wallet Info

**get** `/user/wallet/me`  **( Login Required )**

Get the referral Code and the wallet balance of the current logged in user

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    referralCode: string;
    wallet: {
      balance: number;
    };
  };
}
```

---

## Follow

### Follow User

**post** `/follow/`  **( Login Required )**

Start following a target user to see their updates.

**Body :**
```ts
{
  userId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

### Unfollow User

**delete** `/follow/`  **( Login Required )**

Stop following a target user.

**Query Parameters :**
```ts
{
  userId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

### Get Followers

**get** `/follow/followers`

Retrieve a paginated list of followers for a specific user.

**Query Parameters :**
```ts
{
  page: number;
  userId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    followers: {
      id: string;
      fullName: string;
      username: string | null;
      avatarUrl: string | null;
      isFollowed: boolean;
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    }[];
  };
}
```

---

### Get My Followers

**get** `/follow/followers/me`  **( Login Required )**

Retrieve a paginated list of the current user's followers.

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    followers: {
      id: string;
      fullName: string;
      username: string | null;
      avatarUrl: string | null;
      isFollowed: boolean;
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    }[];
  };
}
```

---

### Get Following

**get** `/follow/following`

Retrieve a list of users that a specific user is following.

**Query Parameters :**
```ts
{
  page: number;
  userId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    following: {
      id: string;
      fullName: string;
      username: string | null;
      avatarUrl: string | null;
      isFollowed: boolean;
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    }[];
  };
}
```

---

### Get My Following

**get** `/follow/following/me`  **( Login Required )**

Retrieve the list of users the current user is following.

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    following: {
      id: string;
      fullName: string;
      username: string | null;
      avatarUrl: string | null;
      isFollowed: boolean;
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    }[];
  };
}
```

---

## Forums

### Create Post

**post** `/forums/post/`  **( Login Required )**

Publish a new post to the feed.

**Body :**
```ts
{
  localId: string | null;
  title: string;
  body: string | null;
  imageUrl: string | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    forum: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      title: string;
      body: string | null;
      imageUrl: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      isLiked: boolean;
      stats: {
        likes: number;
        comments: number;
      };
    };
  };
}
```

---

### Update Post

**patch** `/forums/post/`  **( Login Required )**

Edit the content of an existing post.

**Body :**
```ts
{
  localId?: string | null;
  title?: string;
  body?: string | null;
  imageUrl?: string | null;
  forumId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    forum: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      title: string;
      body: string | null;
      imageUrl: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      isLiked: boolean;
      stats: {
        likes: number;
        comments: number;
      };
    };
  };
}
```

---

### Delete Post

**delete** `/forums/post/`  **( Login Required )**

Permanently remove a post.

**Query Parameters :**
```ts
{
  forumId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    forum: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      title: string;
      body: string | null;
      imageUrl: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      isLiked: boolean;
      stats: {
        likes: number;
        comments: number;
      };
    };
  };
}
```

---

### Get Latest Posts

**get** `/forums/post/latest`

Retrieve a stream of the most recent posts.

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    forums: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      title: string;
      body: string | null;
      imageUrl: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      isLiked: boolean;
      stats: {
        likes: number;
        comments: number;
      };
    }[];
  };
}
```

---

### Get User Posts

**get** `/forums/post/user`

Retrieve posts belonging to a specific user.

**Query Parameters :**
```ts
{
  userId: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    forums: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      title: string;
      body: string | null;
      imageUrl: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      isLiked: boolean;
      stats: {
        likes: number;
        comments: number;
      };
    }[];
  };
}
```

---

### Get My Posts

**get** `/forums/post/user/me`  **( Login Required )**

Retrieve the current user's post history.

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    forums: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      title: string;
      body: string | null;
      imageUrl: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      isLiked: boolean;
      stats: {
        likes: number;
        comments: number;
      };
    }[];
  };
}
```

---

## Forum Comments

### Create Comment

**post** `/forums/comment/`  **( Login Required )**

Add a new comment to a specific post.

**Body :**
```ts
{
  localId: string | null;
  body: string;
  replyingTo: string | null;
  forumId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    comment: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      postId: string;
      replyingTo: string | null;
      body: string;
      repliesCount: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      parentComment: {
        id: string;
        body: string;
        writer: {
          id: string;
          fullName: string;
          username: string | null;
          avatarUrl: string | null;
          isFollowed: boolean;
          ambassadorOf: {
            id: string;
            name: string;
            shortName: string | null;
            district: string | null;
            state: string | null;
            country: string | null;
            yearOfEstablishment: number | null;
          } | null;
        };
      } | null;
    };
  };
}
```

---

### Update Comment

**patch** `/forums/comment/`  **( Login Required )**

Edit the content of an existing comment.

**Body :**
```ts
{
  localId: string | null;
  body: string;
  commentId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    comment: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      postId: string;
      replyingTo: string | null;
      body: string;
      repliesCount: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      parentComment: {
        id: string;
        body: string;
        writer: {
          id: string;
          fullName: string;
          username: string | null;
          avatarUrl: string | null;
          isFollowed: boolean;
          ambassadorOf: {
            id: string;
            name: string;
            shortName: string | null;
            district: string | null;
            state: string | null;
            country: string | null;
            yearOfEstablishment: number | null;
          } | null;
        };
      } | null;
    };
  };
}
```

---

### Delete Comment

**delete** `/forums/comment/`  **( Login Required )**

Permanently remove a comment.

**Query Parameters :**
```ts
{
  commentId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    comment: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      postId: string;
      replyingTo: string | null;
      body: string;
      repliesCount: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      parentComment: {
        id: string;
        body: string;
        writer: {
          id: string;
          fullName: string;
          username: string | null;
          avatarUrl: string | null;
          isFollowed: boolean;
          ambassadorOf: {
            id: string;
            name: string;
            shortName: string | null;
            district: string | null;
            state: string | null;
            country: string | null;
            yearOfEstablishment: number | null;
          } | null;
        };
      } | null;
    };
  };
}
```

---

### Get Post Comments

**get** `/forums/comment/`

Retrieve a paginated list of comments for a specific post.

**Query Parameters :**
```ts
{
  forumId: string;
  page: number;
  parentCommentId: string | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    comments: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      postId: string;
      replyingTo: string | null;
      body: string;
      repliesCount: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      parentComment: {
        id: string;
        body: string;
        writer: {
          id: string;
          fullName: string;
          username: string | null;
          avatarUrl: string | null;
          isFollowed: boolean;
          ambassadorOf: {
            id: string;
            name: string;
            shortName: string | null;
            district: string | null;
            state: string | null;
            country: string | null;
            yearOfEstablishment: number | null;
          } | null;
        };
      } | null;
    }[];
  };
}
```

---

## Forum Reactions

### Like Post

**post** `/forums/reaction/like`  **( Login Required )**

Add a like reaction to a specific post.

**Body :**
```ts
{
  forumId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

### Unlike Post

**delete** `/forums/reaction/like`  **( Login Required )**

Remove a like reaction from a specific post.

**Query Parameters :**
```ts
{
  forumId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

## Forum Report

### Report Post

**post** `/forums/report/`  **( Login Required )**

Flags a forum post for administrative review due to content violations.

**Body :**
```ts
{
  forumId: string;
  reason: string | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

## Insight Categories

### Get Categories

**get** `/insights/category/`

Retrieve a paginated list of available forum categories.

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    categories: string[];
  };
}
```

---

## Insight Posts

### Get Published Posts

**get** `/insights/post/`

Retrieve a paginated list of general published posts.

**Query Parameters :**
```ts
{
  categories?: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    insights: {
      createDate: number;
      updateDate: number;
      id: string;
      title: string | null;
      body: string | null;
      hindiTitle: string | null;
      hindiBody: string | null;
      imageUrl: string | null;
      categoryId: string | null;
      status: string;
      category: string;
    }[];
  };
}
```

---

## User Education

### Get user's education

**get** `/education/`

Get education for a specific user

**Query Parameters :**
```ts
{
  userId: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    educations: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      description: string | null;
      startYear: number;
      startMonth: number | null;
      endYear: number | null;
      endMonth: number | null;
      institute: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      };
    }[];
  };
}
```

---

### Get my education

**get** `/education/me`  **( Login Required )**

Get education for the current logged in user

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    educations: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      description: string | null;
      startYear: number;
      startMonth: number | null;
      endYear: number | null;
      endMonth: number | null;
      institute: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      };
    }[];
  };
}
```

---

### Get user's education

**get** `/education/students`

Get education for a specific user

**Query Parameters :**
```ts
{
  instituteId: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    students: {
      id: string;
      fullName: string;
      username: string | null;
      avatarUrl: string | null;
      isFollowed: boolean;
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    }[];
  };
}
```

---

### Add Education

**post** `/education/`  **( Login Required )**

Add education

**Body :**
```ts
{
  localId: string | null;
  instituteId: string;
  startYear: number;
  startMonth: number | null;
  endYear: number | null;
  endMonth: number | null;
  description: string | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    education: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      description: string | null;
      startYear: number;
      startMonth: number | null;
      endYear: number | null;
      endMonth: number | null;
      institute: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      };
    };
  };
}
```

---

### Add Education

**put** `/education/`  **( Login Required )**

Add education

**Body :**
```ts
{
  id: string;
  description: string | null;
  localId: string | null;
  instituteId: string;
  startMonth: number | null;
  startYear: number;
  endMonth: number | null;
  endYear: number | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    education: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      description: string | null;
      startYear: number;
      startMonth: number | null;
      endYear: number | null;
      endMonth: number | null;
      institute: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      };
    };
  };
}
```

---

### Add Education

**delete** `/education/`  **( Login Required )**

Add education

**Query Parameters :**
```ts
{
  educationId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    education: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      description: string | null;
      startYear: number;
      startMonth: number | null;
      endYear: number | null;
      endMonth: number | null;
      institute: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      };
    };
  };
}
```

---

## Institute

### Get institute

**get** `/institute/`

Get details of a specific institute

**Query Parameters :**
```ts
{
  instituteId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    institute: {
      createDate: number;
      updateDate: number;
      id: string;
      aisheCode: string | null;
      name: string;
      shortName: string | null;
      about: string | null;
      district: string | null;
      state: string | null;
      country: string | null;
      address: string | null;
      pinCode: number | null;
      yearOfEstablishment: number | null;
      website: string | null;
      location: string | null;
      category: string | null;
      administrativeMinistry: string | null;
      standaloneType: string | null;
      management: string | null;
      collegeType: string | null;
      universityName: string | null;
      universityType: string | null;
      phone: string | null;
      landline: string | null;
      imageUrl: string | null;
      rating: number;
      reviewsCount: number;
    };
  };
}
```

---

### Get institutes

**get** `/institute/filter`

Get short institutes with

**Query Parameters :**
```ts
{
  name?: string;
  district?: string | null;
  state?: string | null;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    institutes: {
      id: string;
      name: string;
      shortName: string | null;
      district: string | null;
      state: string | null;
      country: string | null;
      yearOfEstablishment: number | null;
    }[];
  };
}
```

---

### Get Map: country-state

**get** `/institute/state`

Get country state map in format {country: state}[]

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    states: any[];
  };
}
```

---

### Get Map: state-district

**get** `/institute/district`

Get state district map in format {state: disctrict}[]

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    states: any[];
  };
}
```

---

## Institute Reviews

### Get Institute Reviews

**get** `/institute/review/`

Retrieve a paginated list of reviews for institutes.

**Query Parameters :**
```ts
{
  instituteId: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    reviews: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
    }[];
  };
}
```

---

### Get My Review

**get** `/institute/review/me`  **( Login Required )**

Retrieve the current user's review on an institute.

**Query Parameters :**
```ts
{
  instituteId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    review: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
    };
  };
}
```

---

### Create Review

**post** `/institute/review/`  **( Login Required )**

Submit a new review for an institute.

**Body :**
```ts
{
  localId: string | null;
  instituteId: string;
  body: string;
  rating: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    review: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
    };
  };
}
```

---

### Update Review

**patch** `/institute/review/`  **( Login Required )**

Edit the content of an existing review.

**Body :**
```ts
{
  body?: string;
  rating?: number;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    review: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
    };
  };
}
```

---

### Delete Review

**delete** `/institute/review/`  **( Login Required )**

Permanently remove a review.

**Query Parameters :**
```ts
{
  reviewId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    review: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
    };
  };
}
```

---

## Institute Community Chat Messages

### Get Messages

**get** `/institute/community-chat/message/`

Retrieve a paginated list of messages.

**Query Parameters :**
```ts
{
  instituteId: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    messages: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      replyingTo: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      stats: {
        likes: number;
      };
      isLiked: boolean;
    }[];
  };
}
```

---

### Send Message

**post** `/institute/community-chat/message/`  **( Login Required )**

Create and send a new message.

**Body :**
```ts
{
  instituteId: string;
  body: string;
  localId: string | null;
  replyingTo: string | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    message: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      replyingTo: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      stats: {
        likes: number;
      };
      isLiked: boolean;
    };
  };
}
```

---

### Update Message

**patch** `/institute/community-chat/message/`  **( Login Required )**

Edit the content of an existing message.

**Body :**
```ts
{
  body?: string;
  localId?: string | null;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    message: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      replyingTo: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      stats: {
        likes: number;
      };
      isLiked: boolean;
    };
  };
}
```

---

### Delete Message

**delete** `/institute/community-chat/message/`  **( Login Required )**

Remove a message.

**Query Parameters :**
```ts
{
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    message: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      instituteId: string;
      body: string;
      replyingTo: string | null;
      writer: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
      stats: {
        likes: number;
      };
      isLiked: boolean;
    };
  };
}
```

---

## Institute Community Chat Message Reactions

### Like Message

**post** `/institute/community-chat/reaction/like`  **( Login Required )**

Add a like reaction to a specific message.

**Body :**
```ts
{
  messageId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

### Unlike Message

**delete** `/institute/community-chat/reaction/like`  **( Login Required )**

Remove a like reaction from a specific message.

**Query Parameters :**
```ts
{
  messageId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

## Feedback

### Give Feedback

**post** `/feedback/`

Give feedback on website or app

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

## Chat/DM

### Get active chats

**get** `/chats/active`  **( Login Required )**

Get chats in order of latest activity

**Query Parameters :**
```ts
{
  userId: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    chats: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userOneId: string;
      userTwoId: string;
      friend: {
        id: string;
        fullName: string;
        username: string | null;
        avatarUrl: string | null;
        isFollowed: boolean;
        ambassadorOf: {
          id: string;
          name: string;
          shortName: string | null;
          district: string | null;
          state: string | null;
          country: string | null;
          yearOfEstablishment: number | null;
        } | null;
      };
    }[];
  };
}
```

---

## Chat Messages

### Get chat messages

**get** `/chats/message/`  **( Login Required )**

Get messages of a chat

**Query Parameters :**
```ts
{
  chatId: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    messages: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      senderId: string;
      chatId: string;
      body: string;
      status: string;
    }[];
  };
}
```

---

### Send Message: Chat

**post** `/chats/message/`  **( Login Required )**

Send message in a chat

**Body :**
```ts
{
  localId: string | null;
  chatId: string;
  body: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    message: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      senderId: string;
      chatId: string;
      body: string;
      status: string;
    };
  };
}
```

---

### Send Message: User

**post** `/chats/message/user`  **( Login Required )**

Send message to a user if not knowing chat

**Body :**
```ts
{
  localId: string | null;
  body: string;
  userId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    message: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      senderId: string;
      chatId: string;
      body: string;
      status: string;
    };
  };
}
```

---

### Get chat messages

**get** `/chats/message/latest`  **( Login Required )**

Get messages of a chat

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    messages: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      senderId: string;
      chatId: string;
      body: string;
      status: string;
    }[];
  };
}
```

---

## Ambassador

### Get Institute's Ambassadors

**get** `/ambassador/institute`

Get users list of ambassadors for queried institute

**Query Parameters :**
```ts
{
  instituteId: string;
  page: number;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    ambassadors: {
      id: string;
      fullName: string;
      username: string | null;
      avatarUrl: string | null;
      isFollowed: boolean;
      ambassadorOf: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      } | null;
    }[];
  };
}
```

---

## Ambassador Request

### Get Request Status

**get** `/ambassador/request/me`  **( Login Required )**

Get status request of the current logged in user

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    request: {
      createDate: number;
      updateDate: number;
      id: string;
      userId: string;
      instituteId: string;
      reason: string | null;
      status: string;
      institute: {
        id: string;
        name: string;
        shortName: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
      };
    };
  };
}
```

---

### Request for ambassador position

**post** `/ambassador/request/`  **( Login Required )**

Request will not happen if already an ambassador or if not a student of applied institute

**Body :**
```ts
{
  instituteId: string;
  reason: string | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

### Update Request

**patch** `/ambassador/request/`  **( Login Required )**

Update request's institute or reason

**Body :**
```ts
{
  instituteId?: string;
  reason?: string | null;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

### Withdraw Request

**delete** `/ambassador/request/`  **( Login Required )**

Withdraw your request of ambassador

**Query Parameters :**
```ts
{
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data?: any;
}
```

---

