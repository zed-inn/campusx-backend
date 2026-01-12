# API Documentation

> Auto-generated. Do not edit manually.

## OTP

### Get Otp

**POST** `/auth/otp/get`

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

**POST** `/auth/otp/verify`

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

**POST** `/auth/login/basic`

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
        yearOfEstablishment: string | null;
      } | null;
    } | null;
  };
}
```

---

### Login Google

**POST** `/auth/login/google`

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
        yearOfEstablishment: string | null;
      } | null;
    } | null;
  };
}
```

---

## Register/Signup

### Register basic

**POST** `/auth/register/basic`

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
        yearOfEstablishment: string | null;
      } | null;
    } | null;
  };
}
```

---

### Register Google

**POST** `/auth/register/google`

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
        yearOfEstablishment: string | null;
      } | null;
    } | null;
  };
}
```

---

## Account Recovery

### Recover password : Basic Account

**POST** `/auth/recovery/basic`

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

**GET** `/auth/logout`  **( Login Required )**

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

**GET** `/profile/check-username`

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

**GET** `/profile`

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
        yearOfEstablishment: string | null;
      } | null;
    };
  };
}
```

---

### Get my profile

**GET** `/profile/me`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      } | null;
    };
  };
}
```

---

### Get users

**GET** `/profile/users`

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
        yearOfEstablishment: string | null;
      } | null;
    }[];
  };
}
```

---

### Create profile

**POST** `/profile`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      } | null;
    };
  };
}
```

---

### Update profile

**PATCH** `/profile`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      } | null;
    };
  };
}
```

---

## User Report

### Report User

**POST** `/user/report`  **( Login Required )**

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

**GET** `/user/wallet/me`  **( Login Required )**

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

**POST** `/follow`  **( Login Required )**

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

**DELETE** `/follow`  **( Login Required )**

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

**GET** `/follow/followers`

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
        yearOfEstablishment: string | null;
      } | null;
    }[];
  };
}
```

---

### Get My Followers

**GET** `/follow/followers/me`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      } | null;
    }[];
  };
}
```

---

### Get Following

**GET** `/follow/following`

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
        yearOfEstablishment: string | null;
      } | null;
    }[];
  };
}
```

---

### Get My Following

**GET** `/follow/following/me`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      } | null;
    }[];
  };
}
```

---

## Forums

### Create Post

**POST** `/forums/post`  **( Login Required )**

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
          yearOfEstablishment: string | null;
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

**PATCH** `/forums/post`  **( Login Required )**

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
          yearOfEstablishment: string | null;
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

**DELETE** `/forums/post`  **( Login Required )**

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
    id: string;
    localId?: string | null;
  };
}
```

---

### Get Latest Posts

**GET** `/forums/post/latest`

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
          yearOfEstablishment: string | null;
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

**GET** `/forums/post/user`

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
          yearOfEstablishment: string | null;
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

**GET** `/forums/post/user/me`  **( Login Required )**

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
          yearOfEstablishment: string | null;
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

### Get One

**GET** `/forums/post`

Get one forum by Id

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
          yearOfEstablishment: string | null;
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

## Forum Comments

### Create Comment

**POST** `/forums/comment`  **( Login Required )**

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
          yearOfEstablishment: string | null;
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
            yearOfEstablishment: string | null;
          } | null;
        };
      } | null;
    };
  };
}
```

---

### Update Comment

**PATCH** `/forums/comment`  **( Login Required )**

Edit the content of an existing comment.

**Body :**
```ts
{
  localId?: string | null;
  body?: string;
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
          yearOfEstablishment: string | null;
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
            yearOfEstablishment: string | null;
          } | null;
        };
      } | null;
    };
  };
}
```

---

### Delete Comment

**DELETE** `/forums/comment`  **( Login Required )**

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
    id: string;
    localId?: string | null;
  };
}
```

---

### Get Post Comments

**GET** `/forums/comment`

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
          yearOfEstablishment: string | null;
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
            yearOfEstablishment: string | null;
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

**POST** `/forums/reaction/like`  **( Login Required )**

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

**DELETE** `/forums/reaction/like`  **( Login Required )**

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

**POST** `/forums/report`  **( Login Required )**

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

**GET** `/insights/category`

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

### Get insights

**GET** `/insights/post/filter`

Retrieve a paginated list of insights.

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
      category: string | null;
    }[];
  };
}
```

---

### Get one insights

**GET** `/insights/post`

Retrieve one insight by Id

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
    insight: {
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
      category: string | null;
    };
  };
}
```

---

## User Education

### Get user's education

**GET** `/education`

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
        yearOfEstablishment: string | null;
      };
    }[];
  };
}
```

---

### Get my education

**GET** `/education/me`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      };
    }[];
  };
}
```

---

### Get Institute Students

**GET** `/education/students`

Get students for a specific institute

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
        yearOfEstablishment: string | null;
      } | null;
    }[];
  };
}
```

---

### Add Educations

**POST** `/education`  **( Login Required )**

Add educations

**Body :**
```ts
{
  educations: {
    localId: string | null;
    instituteId: string;
    startYear: number;
    startMonth: number | null;
    endYear: number | null;
    endMonth: number | null;
    description: string | null;
    uniqueId: number;
  }[];
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    processed: {
      uniqueId: number;
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
          yearOfEstablishment: string | null;
        };
      };
    }[];
    unprocessed: number[];
  };
}
```

---

### Update Education

**PATCH** `/education`  **( Login Required )**

Update a specific education

**Body :**
```ts
{
  description?: string | null;
  localId?: string | null;
  instituteId?: string;
  startMonth?: number | null;
  startYear?: number;
  endMonth?: number | null;
  endYear?: number | null;
  id: string;
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
        yearOfEstablishment: string | null;
      };
    };
  };
}
```

---

### Delete Education

**DELETE** `/education`  **( Login Required )**

Remove education for your profile

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
    id: string;
    localId?: string | null;
  };
}
```

---

## Institute

### Get institute

**GET** `/institute`

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
      yearOfEstablishment: string | null;
    };
  };
}
```

---

### Get institutes

**GET** `/institute/filter`

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
      yearOfEstablishment: string | null;
    }[];
  };
}
```

---

### Get Map: country-state

**GET** `/institute/state`

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

**GET** `/institute/district`

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

**GET** `/institute/review`

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
          yearOfEstablishment: string | null;
        } | null;
      };
    }[];
  };
}
```

---

### Get My Review

**GET** `/institute/review/me`  **( Login Required )**

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
          yearOfEstablishment: string | null;
        } | null;
      };
    };
  };
}
```

---

### Create Review

**POST** `/institute/review`  **( Login Required )**

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
          yearOfEstablishment: string | null;
        } | null;
      };
    };
  };
}
```

---

### Update Review

**PATCH** `/institute/review`  **( Login Required )**

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
          yearOfEstablishment: string | null;
        } | null;
      };
    };
  };
}
```

---

### Delete Review

**DELETE** `/institute/review`  **( Login Required )**

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
    id: string;
    localId?: string | null;
  };
}
```

---

## Institute Community Chat Messages

### Get Messages

**GET** `/institute/community-chat/message`

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
          yearOfEstablishment: string | null;
        } | null;
      };
      stats: {
        likes: number;
      };
      isLiked: boolean;
      parentMessage: {
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
            yearOfEstablishment: string | null;
          } | null;
        };
      } | null;
    }[];
  };
}
```

---

### Send Message

**POST** `/institute/community-chat/message`  **( Login Required )**

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
          yearOfEstablishment: string | null;
        } | null;
      };
      stats: {
        likes: number;
      };
      isLiked: boolean;
      parentMessage: {
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
            yearOfEstablishment: string | null;
          } | null;
        };
      } | null;
    };
  };
}
```

---

### Update Message

**PATCH** `/institute/community-chat/message`  **( Login Required )**

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
          yearOfEstablishment: string | null;
        } | null;
      };
      stats: {
        likes: number;
      };
      isLiked: boolean;
      parentMessage: {
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
            yearOfEstablishment: string | null;
          } | null;
        };
      } | null;
    };
  };
}
```

---

### Delete Message

**DELETE** `/institute/community-chat/message`  **( Login Required )**

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
    id: string;
    localId?: string | null;
  };
}
```

---

## Institute Community Chat Message Reactions

### Like Message

**POST** `/institute/community-chat/reaction/like`  **( Login Required )**

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

**DELETE** `/institute/community-chat/reaction/like`  **( Login Required )**

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

**POST** `/feedback`

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

### Get Chat

**GET** `/chats`  **( Login Required )**

Get chat details by chatId

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
    chat: {
      createDate: number;
      updateDate: number;
      id: string;
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
          yearOfEstablishment: string | null;
        } | null;
      };
    };
  };
}
```

---

### Get active chats

**GET** `/chats/active`  **( Login Required )**

Get chats in order of latest activity

**Query Parameters :**
```ts
{
  timestamp: number | null;
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
          yearOfEstablishment: string | null;
        } | null;
      };
    }[];
  };
}
```

---

## Chat Messages

### Get chat messages

**GET** `/chats/message`  **( Login Required )**

Get messages of a chat

**Query Parameters :**
```ts
{
  chatId: string;
  timestamp: number | null;
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
      createDateLocal: number | null;
    }[];
  };
}
```

---

### Get initial messages

**GET** `/chats/message/latest`  **( Login Required )**

Get messages of a chat

**Query Parameters :**
```ts
{
  timestamp: number | null;
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
      createDateLocal: number | null;
    }[];
  };
}
```

---

## Ambassador

### Get Institute's Ambassadors

**GET** `/ambassador/institute`

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
        yearOfEstablishment: string | null;
      } | null;
    }[];
  };
}
```

---

## Ambassador Request

### Get Request Status

**GET** `/ambassador/request/me`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      };
    };
  };
}
```

---

### Request for ambassador position

**POST** `/ambassador/request`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      };
    };
  };
}
```

---

### Update Request

**PATCH** `/ambassador/request`  **( Login Required )**

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
        yearOfEstablishment: string | null;
      };
    };
  };
}
```

---

### Withdraw Request

**DELETE** `/ambassador/request`  **( Login Required )**

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
  data: {
    id: string;
    localId?: string | null;
  };
}
```

---

## Upload Files

### Upload Image

**POST** `/upload`  **( Login Required )**

Upload image

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    url: string;
  };
}
```

---

## Notification

### Get notifications

**GET** `/notification`  **( Login Required )**

Get notifications of a user.
Type allowed: `LIKE`, `COMMENT`, `MESSAGE`

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
    notitifications: {
      createDate: number;
      updateDate: number;
      id: string;
      userId: string;
      title: string;
      body: string | null;
      type: string;
    }[];
  };
}
```

---

## Competition Event

### Get events

**GET** `/competition/event`

Get events by page

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
    events: {
      createDate: number;
      updateDate: number;
      id: string;
      name: string;
      description: string;
      rules: string[];
      prizes: {
        position: string;
        amount: number;
        description: string;
      }[];
      startDate: number;
      endDate: number;
      posterUrl: string | null;
      status: string;
      category: string;
      organizer: string;
      isRegistered: boolean;
    };
  };
}
```

---

## Competition Event Leaderboard

### Get Top Participants

**GET** `/competition/event/participants/top`

Get participants with thier points to arrange in any order

**Query Parameters :**
```ts
{
  eventId: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    leaderboard: {
      createDate: number;
      updateDate: number;
      userId: string;
      eventId: string;
      points: number;
      user: {
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
          yearOfEstablishment: string | null;
        } | null;
      };
    }[];
  };
}
```

---

### Register for event

**POST** `/competition/event/register`  **( Login Required )**

Register current logged in user for an event

**Body :**
```ts
{
  eventId: string;
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

### Deregister from event

**DELETE** `/competition/event/deregister`  **( Login Required )**

Deregister current logged in user from an event

**Query Parameters :**
```ts
{
  eventId: string;
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

## Jobs

### Get jobs

**GET** `/jobs`  **( Login Required )**

Get jobs by page | 
Types: `FULL_TIME`, `PART_TIME`, `INTERNSHIP`, `FREELANCE`, `CONTRACT`, `GOVT`, `WALK_IN` | 
Status: `DRAFT`, `ACTIVE`, `CLOSED`, `EXPIRED` | 
Salary Periods: `HOURLY`, `MONTHLY`, `YEARLY`, `ONE_TIME`

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
    jobs: {
      createDate: number;
      updateDate: number;
      id: string;
      title: string;
      slug: string | null;
      type: string;
      locations: string[] | null;
      isRemote: boolean;
      salaryConfig?: {
        min?: number;
        max?: number;
        currency: string;
        period: string;
        negotiable: boolean;
      } | null;
      meta?: any | null;
      description: string;
      companyName: string;
      companyLogo: string | null;
      applyLink: string;
      status: string;
      expiresAt: number | null;
    }[];
  };
}
```

---

## Messaging

### [Server] [ChatId] Send Message

**SOCKET** `chat:message-to`  **( Login Required )**

Send message to server using usedId and the server will forward to users appropriately, A callback is needed for sending user

**Body :**
```ts
{
  payload: {
    localId: string | null;
    chatId?: string | null;
    userId?: string | null;
    body: string;
    createDateLocal: number | null;
  };
  callback: any; // Callback function to act as response for client
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
      createDateLocal: number | null;
    };
  };
}
```

---

### [Server] [UserId] Send Message

**SOCKET** `chat:message-to`  **( Login Required )**

Send message to server using chatId

**Body :**
```ts
{
  payload: {
    localId: string | null;
    chatId?: string | null;
    userId?: string | null;
    body: string;
    createDateLocal: number | null;
  };
  callback: any; // Callback function to act as response for client
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
      createDateLocal: number | null;
    };
    chat: {
      createDate: number;
      updateDate: number;
      id: string;
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
          yearOfEstablishment: string | null;
        } | null;
      };
    };
  };
}
```

---

### [Client] [ChatId] Send Message

**SOCKET** `chat:message-from`

Send Message to user that has been received by server using chatId

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
      createDateLocal: number | null;
    };
  };
}
```

---

### [Client] [UserId] Send Message

**SOCKET** `chat:message-from`

Send Message to user that has been received by server using userId

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
      createDateLocal: number | null;
    };
    chat: {
      createDate: number;
      updateDate: number;
      id: string;
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
          yearOfEstablishment: string | null;
        } | null;
      };
    };
  };
}
```

---

### [Server] Message Recieved

**SOCKET** `chat:message-received`  **( Login Required )**

Send message received if you have received a message from endpoint `chat:message-from` or `chat:message-update-to

**Body :**
```ts
{
  payload: {
    ids: string[];
  };
  callback: any; // Callback function to act as response for client
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
      createDateLocal: number | null;
    }[];
  };
}
```

---

### [Client] Message Received

**SOCKET** `chat:message-received`

Server sends that the message has been received by the other user after `chat:message-to` or `chat:message-update-to`

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
      createDateLocal: number | null;
    }[];
  };
}
```

---

### [Server] Message Update

**SOCKET** `chat:message-update-to`  **( Login Required )**

Update message and gets a response.

**Body :**
```ts
{
  payload: {
    localId?: string | null;
    body?: string;
    id: string;
  };
  callback: any; // Callback function to act as response for client
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
      createDateLocal: number | null;
    };
  };
}
```

---

### [Client] Message Update From

**SOCKET** `chat:message-update-from`

Gets a message update from other user, server sends it.

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
      createDateLocal: number | null;
    };
  };
}
```

---

