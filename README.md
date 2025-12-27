# API Documentation

> Auto-generated. Do not edit manually.

## Profile

### Get user's profile

**GET** `/user/profile`

Gets user's display attributes, like dob, name, etc.

**Query Parameters :**
```ts
{
  id: string; // user id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    profile: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      followersCount: number;
      followingCount: number;
      isFollowed: boolean;
    };
  };
}
```

---

### Get my profile

**GET** `/user/profile/me`  **( Login Required )**

Get the profile of currently logged in user

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    profile: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      followersCount: number;
      followingCount: number;
      isFollowed: boolean;
    };
  };
}
```

---

### Create profile (after signup)

**POST** `/user/profile`  **( Login Required )**

Create profile for the user after signing up

**Body :**
```ts
{
  avatarUrl: string | null;
  fullName: string;
  username: string | null;
  about: string | null;
  gender: string | null;
  dob: number | null;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    profile: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      followersCount: number;
      followingCount: number;
      isFollowed: boolean;
    };
  };
}
```

---

### Update profile

**PUT** `/user/profile`  **( Login Required )**

Update profile of currently logged in user
Only updates the fields sent
Does not update if no fields given

**Body :**
```ts
{
  avatarUrl?: string | null;
  fullName?: string;
  username?: string | null;
  about?: string | null;
  gender?: string | null;
  dob?: number | null;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    profile: {
      createDate: number;
      updateDate: number;
      id: string;
      username: string | null;
      fullName: string;
      about: string | null;
      avatarUrl: string | null;
      gender: string | null;
      dob: number | null;
      followersCount: number;
      followingCount: number;
      isFollowed: boolean;
    };
  };
}
```

---

## User

### Get users

**GET** `/user/all`

Get all users.

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    users: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    }[];
  };
}
```

---

### Report user

**POST** `/user/report`  **( Login Required )**

Report a user with reason

**Body :**
```ts
{
  id: string; // user id
  reason: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

## Follow

### Get user's followers

**GET** `/user/followers`

Get followers of a user with their id

**Query Parameters :**
```ts
{
  id: string; // user id
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    followers: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    }[];
  };
}
```

---

### Get my followers

**GET** `/user/followers/me`  **( Login Required )**

Get followers of currently logged in user

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    followers: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    }[];
  };
}
```

---

### Get user's following

**GET** `/user/following`

Get follwoings of a user with thier id

**Query Parameters :**
```ts
{
  id: string; // user id
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    followers: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    }[];
  };
}
```

---

### Get my following

**GET** `/user/following/me`  **( Login Required )**

Get following of currently logged in user

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    followers: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    }[];
  };
}
```

---

### Follow user

**POST** `/user/follow`  **( Login Required )**

Follow a user

**Body :**
```ts
{
  id: string; // user id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

### Unfollow user

**POST** `/user/unfollow`  **( Login Required )**

Unfollow a user

**Body :**
```ts
{
  id: string; // user id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

## Institute

### Get institute

**GET** `/institute`

Get details about one specific institute

**Query Parameters :**
```ts
{
  id: string; // institute id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    institute: {
      id: string;
      about: string | null;
      address: string | null;
      administrativeMinistry: string | null;
      aisheCode: string | null;
      category: string | null;
      collegeType: string | null;
      country: string | null;
      createDate: number;
      district: string | null;
      imageUrl: string | null;
      landline: string | null;
      location: string | null;
      management: string | null;
      name: string;
      phone: string | null;
      pinCode: number | null;
      rating: number;
      reviewsCount: number;
      shortName: string | null;
      standaloneType: string | null;
      state: string | null;
      universityName: string | null;
      universityType: string | null;
      updateDate: number;
      website: string | null;
      yearOfEstablishment: number | null;
    };
  };
}
```

---

### Get all institutes

**GET** `/institute/all`

Get institutes arranged in descending order per updateDate

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    institutes: {
      id: string;
      name: string;
      aisheCode: string | null;
      shortName: string | null;
      about: string | null;
      district: string | null;
      state: string | null;
      country: string | null;
      yearOfEstablishment: number | null;
      website: string | null;
      imageUrl: string | null;
      category: string | null;
    }[];
  };
}
```

---

### Get random institutes

**GET** `/institute/random`

Get random list of institutes

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    institutes: {
      id: string;
      name: string;
      aisheCode: string | null;
      shortName: string | null;
      about: string | null;
      district: string | null;
      state: string | null;
      country: string | null;
      yearOfEstablishment: number | null;
      website: string | null;
      imageUrl: string | null;
      category: string | null;
    }[];
  };
}
```

---

### Get institute students

**GET** `/educations/students`

Get students list of an institute, whether passed or ongoing

**Query Parameters :**
```ts
{
  id: string; // institute id
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    students: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    }[];
  };
}
```

---

## Login

### Basic: email and password

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
```dart
{
  message: string;
  data: {
    authToken: string;
    user: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    };
  };
}
```

---

### Google

**POST** `/auth/login/google`

Login with google from flutter screen

**Body :**
```ts
{
  email: string;
  fullName: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    authToken: string;
    user: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    };
  };
}
```

---

## OTP

### Get otp

**POST** `/auth/otp/get`

Get Otp to desired mail to verify it

**Body :**
```ts
{
  email: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

### Verify otp

**POST** `/auth/otp/verify`

Verify the 'sent' Otp to the given mail in previous step

**Body :**
```ts
{
  email: string;
  otp: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    otpToken: string;
  };
}
```

---

## Signup

### Create password

**POST** `/auth/signup/create-password`

Create password after getting and verifying otp

**Body :**
```ts
{
  otpToken: string;
  password: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    authToken: string;
    user: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    };
  };
}
```

---

## Forgot Password

### Reset password

**POST** `/auth/forgot-password/reset-password`

Reset password after getting and verifying otp

**Body :**
```ts
{
  otpToken: string;
  password: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

## Logout

### Logout

**GET** `/auth/logout`

Logouts the current logged in user
Makes the <authToken> lose its authorization

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

## Education

### Get user's education

**GET** `/education`

Get education list of a specific user

**Query Parameters :**
```ts
{
  id: string; // user id
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    educations: {
      createDate: number;
      endMonth: number | null;
      endYear: number | null;
      id: string;
      isCompleted: boolean;
      startMonth: number;
      startYear: number;
      updateDate: number;
      institute: {
        id: string;
        name: string;
        aisheCode: string | null;
        shortName: string | null;
        about: string | null;
        district: string | null;
        state: string | null;
        country: string | null;
        yearOfEstablishment: number | null;
        website: string | null;
        imageUrl: string | null;
        category: string | null;
      };
      user: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
    }[];
  };
}
```

---

### Add education

**POST** `/education`  **( Login Required )**

Add institute and relevant details as your education

**Body :**
```ts
{
  instituteId: string;
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
  isCompleted: boolean;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    createDate: number;
    endMonth: number | null;
    endYear: number | null;
    id: string;
    isCompleted: boolean;
    startMonth: number;
    startYear: number;
    updateDate: number;
    institute: {
      id: string;
      name: string;
      aisheCode: string | null;
      shortName: string | null;
      about: string | null;
      district: string | null;
      state: string | null;
      country: string | null;
      yearOfEstablishment: number | null;
      website: string | null;
      imageUrl: string | null;
      category: string | null;
    };
    user: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    };
  };
}
```

---

### Update education

**PUT** `/education`  **( Login Required )**

Update relevant details of your education

**Body :**
```ts
{
  id: string;
  startYear?: number;
  startMonth?: number;
  endYear?: number | null;
  endMonth?: number | null;
  isCompleted?: boolean;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    createDate: number;
    endMonth: number | null;
    endYear: number | null;
    id: string;
    isCompleted: boolean;
    startMonth: number;
    startYear: number;
    updateDate: number;
    institute: {
      id: string;
      name: string;
      aisheCode: string | null;
      shortName: string | null;
      about: string | null;
      district: string | null;
      state: string | null;
      country: string | null;
      yearOfEstablishment: number | null;
      website: string | null;
      imageUrl: string | null;
      category: string | null;
    };
    user: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    };
  };
}
```

---

### Remove education

**DELETE** `/education`  **( Login Required )**

Remove an education

**Query Parameters :**
```ts
{
  id: string; // education id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    createDate: number;
    endMonth: number | null;
    endYear: number | null;
    id: string;
    isCompleted: boolean;
    startMonth: number;
    startYear: number;
    updateDate: number;
    institute: {
      id: string;
      name: string;
      aisheCode: string | null;
      shortName: string | null;
      about: string | null;
      district: string | null;
      state: string | null;
      country: string | null;
      yearOfEstablishment: number | null;
      website: string | null;
      imageUrl: string | null;
      category: string | null;
    };
    user: {
      id: string;
      username: string | null;
      fullName: string;
      avatarUrl: string | null;
      isFollowed: boolean;
    };
  };
}
```

---

## Feedback

### Give feedback

**POST** `/feedback`

Give feedback, either by logging in or without

**Query Parameters :**
```ts
{
  message: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

## Forum

### Get user's forums

**GET** `/forums`

Get forums of a specified user

**Query Parameters :**
```ts
{
  id: string; // user id
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    forums: {
      id: string;
      body: string | null;
      commentsCount: number;
      createDate: number;
      updateDate: number;
      likesCount: number;
      imageUrl: string | null;
      localId: string | null;
      title: string;
      isLiked: boolean;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
    }[];
  };
}
```

---

### Get forums (latest)

**GET** `/forums/latest`

Get latest forums, will be upgraded to recommended forums

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    forums: {
      id: string;
      body: string | null;
      commentsCount: number;
      createDate: number;
      updateDate: number;
      likesCount: number;
      imageUrl: string | null;
      localId: string | null;
      title: string;
      isLiked: boolean;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
    }[];
  };
}
```

---

### Get my forums

**GET** `/forums/me`  **( Login Required )**

Get forums of the currently logged in user

**Query Parameters :**
```ts
{
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    forums: {
      id: string;
      body: string | null;
      commentsCount: number;
      createDate: number;
      updateDate: number;
      likesCount: number;
      imageUrl: string | null;
      localId: string | null;
      title: string;
      isLiked: boolean;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
    }[];
  };
}
```

---

### Create forum

**POST** `/forums`  **( Login Required )**

Creates a forum

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
```dart
{
  message: string;
  data: {
    forum: {
      id: string;
      body: string | null;
      commentsCount: number;
      createDate: number;
      updateDate: number;
      likesCount: number;
      imageUrl: string | null;
      localId: string | null;
      title: string;
      isLiked: boolean;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
    };
  };
}
```

---

### Update forum

**PUT** `/forums`  **( Login Required )**

Updates a forum

**Body :**
```ts
{
  id: string;
  localId?: string | null;
  title?: string;
  body?: string | null;
  imageUrl?: string | null;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    forum: {
      id: string;
      body: string | null;
      commentsCount: number;
      createDate: number;
      updateDate: number;
      likesCount: number;
      imageUrl: string | null;
      localId: string | null;
      title: string;
      isLiked: boolean;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
    };
  };
}
```

---

### Delete forum

**DELETE** `/forums`  **( Login Required )**

Deletes a forum

**Query Parameters :**
```ts
{
  id: string; // forum id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    forum: {
      id: string;
      body: string | null;
      commentsCount: number;
      createDate: number;
      updateDate: number;
      likesCount: number;
      imageUrl: string | null;
      localId: string | null;
      title: string;
      isLiked: boolean;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
    };
  };
}
```

---

### Like forum

**POST** `/forums/like`  **( Login Required )**

Likes a forum

**Query Parameters :**
```ts
{
  id: string; // forum id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

### Unlike forum

**POST** `/forums/unlike`  **( Login Required )**

Unlikes a forum

**Query Parameters :**
```ts
{
  id: string; // forum id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

### Report forum

**POST** `/forums/report`  **( Login Required )**

Reports a forum by a currently logged in user

**Body :**
```ts
{
  id: string; // forum id
  reason: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

## Forum Comment

### Get comments/replies

**GET** `/forums/comments`

Get comments on a forum, or replies on a comment of a forum

**Query Parameters :**
```ts
{
  forumId: string;
  commentId: string | null;
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    comments: {
      createDate: number;
      updateDate: number;
      id: string;
      body: string;
      forumId: string;
      localId: string | null;
      repliesCount: number;
      replyingTo: string | null;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      parenComment: {
        id: string;
        body: string;
        writer: {
          id: string;
          username: string | null;
          fullName: string;
          avatarUrl: string | null;
          isFollowed: boolean;
        };
      };
    }[];
  };
}
```

---

### Comment/reply

**POST** `/forums/comments`

Comment on a forum, or reply on a comment

**Body :**
```ts
{
  localId: string | null;
  forumId: string;
  body: string;
  replyingTo: string | null;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    comment: {
      createDate: number;
      updateDate: number;
      id: string;
      body: string;
      forumId: string;
      localId: string | null;
      repliesCount: number;
      replyingTo: string | null;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      parenComment: {
        id: string;
        body: string;
        writer: {
          id: string;
          username: string | null;
          fullName: string;
          avatarUrl: string | null;
          isFollowed: boolean;
        };
      };
    };
  };
}
```

---

### Update comment/reply

**PUT** `/forums/comments`

Update your comment/reply on a forum/comment

**Body :**
```ts
{
  id: string;
  localId: string | null;
  body: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    comment: {
      createDate: number;
      updateDate: number;
      id: string;
      body: string;
      forumId: string;
      localId: string | null;
      repliesCount: number;
      replyingTo: string | null;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      parenComment: {
        id: string;
        body: string;
        writer: {
          id: string;
          username: string | null;
          fullName: string;
          avatarUrl: string | null;
          isFollowed: boolean;
        };
      };
    };
  };
}
```

---

### Delete comment/reply

**DELETE** `/forums/comments`

Deletes your comment/reply on a forum/comment

**Query Parameters :**
```ts
{
  id: string; // comment id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    comment: {
      createDate: number;
      updateDate: number;
      id: string;
      body: string;
      forumId: string;
      localId: string | null;
      repliesCount: number;
      replyingTo: string | null;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      parenComment: {
        id: string;
        body: string;
        writer: {
          id: string;
          username: string | null;
          fullName: string;
          avatarUrl: string | null;
          isFollowed: boolean;
        };
      };
    };
  };
}
```

---

## Insight

### Get categories

**GET** `/insights/categories`

Get category names of insights

**Query Parameters :**
```ts
{
  page: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    categories: string[];
  };
}
```

---

### Get insights

**GET** `/insights`

Get insights

**Query Parameters :**
```ts
{
  page: string;
  category: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    insights: {
      body: string | null;
      createDate: number;
      hindiBody: string | null;
      hindiTitle: string | null;
      id: string;
      imageUrl: string | null;
      title: string | null;
      updateDate: number;
      category: {
        name: string;
      };
    }[];
  };
}
```

---

## Institute Discussion

### Get messages

**GET** `/institute/messages`

Get messages of an institute discussion

**Query Parameters :**
```ts
{
  id: string; // institute id
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    messages: {
      createDate: number;
      id: string;
      isLiked: boolean;
      message: string;
      replyingTo: string | null;
      updateDate: number;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      parentMessage: {
        id: string;
        message: string;
        writer: {
          id: string;
          username: string | null;
          fullName: string;
          avatarUrl: string | null;
          isFollowed: boolean;
        };
      };
      institute: {
        name: string;
      };
    }[];
  };
}
```

---

### Create message

**POST** `/institute/messages`  **( Login Required )**

Message in an insitute discussion

**Body :**
```ts
{
  instituteId: string;
  message: string;
  replyingTo: string | null;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    message: {
      createDate: number;
      id: string;
      isLiked: boolean;
      message: string;
      replyingTo: string | null;
      updateDate: number;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      parentMessage: {
        id: string;
        message: string;
        writer: {
          id: string;
          username: string | null;
          fullName: string;
          avatarUrl: string | null;
          isFollowed: boolean;
        };
      };
      institute: {
        name: string;
      };
    };
  };
}
```

---

### Update message

**PUT** `/institute/messages`  **( Login Required )**

Udpate your message in an insitute discussion

**Body :**
```ts
{
  id: string;
  message: string;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    message: {
      createDate: number;
      id: string;
      isLiked: boolean;
      message: string;
      replyingTo: string | null;
      updateDate: number;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      parentMessage: {
        id: string;
        message: string;
        writer: {
          id: string;
          username: string | null;
          fullName: string;
          avatarUrl: string | null;
          isFollowed: boolean;
        };
      };
      institute: {
        name: string;
      };
    };
  };
}
```

---

### Delete message

**DELETE** `/institute/messages`  **( Login Required )**

Deletes your message in an insitute discussion

**Query Parameters :**
```ts
{
  id: string; // message/discussion id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    message: {
      createDate: number;
      id: string;
      isLiked: boolean;
      message: string;
      replyingTo: string | null;
      updateDate: number;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      parentMessage: {
        id: string;
        message: string;
        writer: {
          id: string;
          username: string | null;
          fullName: string;
          avatarUrl: string | null;
          isFollowed: boolean;
        };
      };
      institute: {
        name: string;
      };
    };
  };
}
```

---

### Like message

**POST** `/institute/messages`  **( Login Required )**

Like a message in an insitute discussion

**Query Parameters :**
```ts
{
  id: string; // message/discussion id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

### Unlike message

**POST** `/institute/messages`  **( Login Required )**

Unlike a liked message in an insitute discussion

**Query Parameters :**
```ts
{
  id: string; // message/discussion id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data?: any;
}
```

---

## Review

### Get reviews

**GET** `/institute/review`

Get reviews for an insitute

**Query Parameters :**
```ts
{
  id: string; // institute id
  page: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    reviews: {
      createDate: number;
      updateDate: number;
      id: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      institute: {
        id: string;
        name: string;
      };
    }[];
  };
}
```

---

### Create review

**POST** `/institute/review`  **( Login Required )**

Review an institute with a rating and some content

**Body :**
```ts
{
  instituteId: string;
  body: string;
  rating: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    review: {
      createDate: number;
      updateDate: number;
      id: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      institute: {
        id: string;
        name: string;
      };
    };
  };
}
```

---

### Update review

**PUT** `/institute/review`  **( Login Required )**

Update a review you have written

**Body :**
```ts
{
  id: string;
  body?: string;
  rating?: number;
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    review: {
      createDate: number;
      updateDate: number;
      id: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      institute: {
        id: string;
        name: string;
      };
    };
  };
}
```

---

### Delete review

**DELETE** `/institute/review`  **( Login Required )**

Deletes a review you have written

**Query Parameters :**
```ts
{
  id: string; // review id
}
```

**Response (200 OK) :**
```dart
{
  message: string;
  data: {
    review: {
      createDate: number;
      updateDate: number;
      id: string;
      body: string;
      rating: number;
      writer: {
        id: string;
        username: string | null;
        fullName: string;
        avatarUrl: string | null;
        isFollowed: boolean;
      };
      institute: {
        id: string;
        name: string;
      };
    };
  };
}
```

---

