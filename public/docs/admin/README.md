# API Documentation

> Auto-generated. Do not edit manually.

## Admin Register

### Register

**POST** `/admin/auth/register`

Register as admin

**Body :**
```ts
{
  email: string;
  password: string;
  adminCode: string;
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

## Admin Login

### Login

**POST** `/admin/auth/login`

Login as admin

**Body :**
```ts
{
  email: string;
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

## Admin Recovery

### Recover Account

**POST** `/admin/auth/recovery/reset-password`

Reset the password of admin account

**Body :**
```ts
{
  adminCode: string;
  email: string;
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

## Institute

### Get Institutes

**GET** `/admin/institute`  **( Login Required )**

Get institutes by filter

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  aisheCode?: string | null;
  name?: string;
  nameNormalized?: string;
  shortName?: string | null;
  about?: string | null;
  district?: string | null;
  state?: string | null;
  country?: string | null;
  address?: string | null;
  pinCode?: number | null;
  yearOfEstablishment?: number | null;
  website?: string | null;
  location?: string | null;
  category?: string | null;
  administrativeMinistry?: string | null;
  standaloneType?: string | null;
  management?: string | null;
  collegeType?: string | null;
  universityName?: string | null;
  universityType?: string | null;
  phone?: string | null;
  landline?: string | null;
  imageUrl?: string | null;
  rating?: number;
  reviewsCount?: number;
  order: string;
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
      nameNormalized: string;
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
    }[];
  };
}
```

---

### Create institute

**POST** `/admin/institute`  **( Login Required )**

Create institute

**Body :**
```ts
{
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
      nameNormalized: string;
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

### Update institute

**PATCH** `/admin/institute`  **( Login Required )**

Update institute by Id

**Body :**
```ts
{
  aisheCode?: string | null;
  name?: string;
  shortName?: string | null;
  about?: string | null;
  district?: string | null;
  state?: string | null;
  country?: string | null;
  address?: string | null;
  pinCode?: number | null;
  yearOfEstablishment?: number | null;
  website?: string | null;
  location?: string | null;
  category?: string | null;
  administrativeMinistry?: string | null;
  standaloneType?: string | null;
  management?: string | null;
  collegeType?: string | null;
  universityName?: string | null;
  universityType?: string | null;
  phone?: string | null;
  landline?: string | null;
  imageUrl?: string | null;
  id: string;
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
      title: string;
      body: string;
      hindiTitle: string;
      hindiBody: string;
      imageUrl: string | null;
      newsUrl: string | null;
      categoryId: string;
      status: string;
    };
  };
}
```

---

### Delete institute

**DELETE** `/admin/institute`  **( Login Required )**

Delete institute by Id

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

## Insights Post

### Get posts

**GET** `/admin/insight/post`  **( Login Required )**

Get posts by filtering

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  title?: string | null;
  body?: string | null;
  hindiTitle?: string | null;
  hindiBody?: string | null;
  imageUrl?: string | null;
  categoryId?: string | null;
  status?: string;
  page: number;
  order: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    posts: {
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

### Create post

**POST** `/admin/insight/post`  **( Login Required )**

Create post

**Body :**
```ts
{
  title: string | null;
  body: string | null;
  hindiTitle: string | null;
  hindiBody: string | null;
  imageUrl: string | null;
  categoryId: string | null;
  status: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    post: {
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

### Update post

**PATCH** `/admin/insight/post`  **( Login Required )**

Update post by Id

**Body :**
```ts
{
  title?: string | null;
  body?: string | null;
  hindiTitle?: string | null;
  hindiBody?: string | null;
  imageUrl?: string | null;
  categoryId?: string | null;
  status?: string;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    post: {
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

### Delete post

**DELETE** `/admin/insight/post`  **( Login Required )**

Delete post by Id

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

## Insights Category

### Get Categories

**GET** `/admin/insight/category`  **( Login Required )**

Get categories by filter

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  name?: string;
  page: number;
  order: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    categories: {
      createDate: number;
      updateDate: number;
      id: string;
      name: string;
    }[];
  };
}
```

---

### Create category

**POST** `/admin/insight/category`  **( Login Required )**

Create category

**Body :**
```ts
{
  name: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    category: {
      createDate: number;
      updateDate: number;
      id: string;
      name: string;
    };
  };
}
```

---

### Update category

**PATCH** `/admin/insight/category`  **( Login Required )**

Update category by Id

**Body :**
```ts
{
  name?: string;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    category: {
      createDate: number;
      updateDate: number;
      id: string;
      name: string;
    };
  };
}
```

---

### Delete category

**DELETE** `/admin/insight/category`  **( Login Required )**

Delete category by Id

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

## Profile

### Get users

**GET** `/admin/user`  **( Login Required )**

Get users by profile

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  username?: string | null;
  fullName?: string;
  about?: string | null;
  avatarUrl?: string | null;
  gender?: string | null;
  dob?: number | null;
  page: number;
  order: string;
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
      email: string;
      passwordHash: string | null;
      fcmToken: string | null;
      referralCode: string;
      role: string;
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
      };
    }[];
  };
}
```

---

## Report

### Get reports

**GET** `/admin/user/report`  **( Login Required )**

Get reports by filters

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  userId?: string;
  reportedBy?: string;
  reason?: string | null;
  page: number;
  order: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    reports: {
      createDate: number;
      updateDate: number;
      id: string;
      userId: string;
      reportedBy: string;
      reason: string | null;
      user: {
        createDate: number;
        updateDate: number;
        id: string;
        email: string;
        passwordHash: string | null;
        fcmToken: string | null;
        referralCode: string;
        role: string;
      };
    }[];
  };
}
```

---

### Get reports

**GET** `/admin/forums/report`  **( Login Required )**

Get reports by filter

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  postId?: string;
  userId?: string;
  reason?: string | null;
  page: number;
  order: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    reports: {
      createDate: number;
      updateDate: number;
      id: string;
      postId: string;
      userId: string;
      reason: string | null;
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
      };
    }[];
  };
}
```

---

### Update report

**PATCH** `/admin/forums/report`  **( Login Required )**

Update report by Id

**Body :**
```ts
{
  postId?: string;
  userId?: string;
  reason?: string | null;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    report: {
      createDate: number;
      updateDate: number;
      id: string;
      postId: string;
      userId: string;
      reason: string | null;
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
      };
    };
  };
}
```

---

### Delete report

**DELETE** `/admin/forums/report`  **( Login Required )**

Delete report by Id

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

## Notification

### Push notification

**POST** `/admin/notification`  **( Login Required )**

Send notification to some/all users

**Body :**
```ts
{
  title: string;
  body: string | null;
  userIds: {
    id: string;
  }[] | null;
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

## Event

### Get Events

**GET** `/admin/competition/event`  **( Login Required )**

Get events by filter

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  name?: string;
  description?: string;
  rules?: string[];
  prizes?: {
    position: string;
    amount: number;
    description: string;
  }[];
  startDate?: number;
  endDate?: number;
  posterUrl?: string | null;
  status?: string;
  category?: string;
  organizer?: string;
  page: number;
  order: string;
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
    }[];
  };
}
```

---

### Create event

**POST** `/admin/competition/event`  **( Login Required )**

Create event

**Body :**
```ts
{
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
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    event: {
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
    };
  };
}
```

---

### Update event

**POST** `/admin/competition/event`  **( Login Required )**

Update event by Id

**Body :**
```ts
{
  name?: string;
  description?: string;
  rules?: string[];
  prizes?: {
    position: string;
    amount: number;
    description: string;
  }[];
  startDate?: number;
  endDate?: number;
  posterUrl?: string | null;
  status?: string;
  category?: string;
  organizer?: string;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    event: {
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
    };
  };
}
```

---

### Delete event

**DELETE** `/admin/competition/event`  **( Login Required )**

Delete event by Id

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

## Post

### Get forum posts

**GET** `/admin/forums/post`  **( Login Required )**

Get forum posts by filter

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  localId?: string | null;
  userId?: string;
  title?: string;
  body?: string | null;
  imageUrl?: string | null;
  page: number;
  order: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    posts: {
      createDate: number;
      updateDate: number;
      id: string;
      localId: string | null;
      userId: string;
      title: string;
      body: string | null;
      imageUrl: string | null;
      user: {
        createDate: number;
        updateDate: number;
        id: string;
        email: string;
        passwordHash: string | null;
        fcmToken: string | null;
        referralCode: string;
        role: string;
      };
      stats: {
        likes: number;
        comments: number;
      };
    }[];
  };
}
```

---

## Admin Feedback

### Get feedbacks

**GET** `/admin/feedback`  **( Login Required )**

Get feedbacks by filter

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  userId?: string | null;
  message?: string;
  platformUsed?: string;
  status?: string;
  page: number;
  order: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    feedbacks: {
      createDate: number;
      updateDate: number;
      id: string;
      userId: string | null;
      message: string;
      platformUsed: string;
      status: string;
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
      } | null;
    }[];
  };
}
```

---

### Update feedback

**PATCH** `/admin/feedback`  **( Login Required )**

Update feedback by Id

**Body :**
```ts
{
  userId?: string | null;
  message?: string;
  platformUsed?: string;
  status?: string;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    feedback: {
      createDate: number;
      updateDate: number;
      id: string;
      userId: string | null;
      message: string;
      platformUsed: string;
      status: string;
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
      } | null;
    };
  };
}
```

---

### Delete feedback

**DELETE** `/admin/feedback`  **( Login Required )**

Delete feedback by Id

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

## Admin Job

### Get jobs

**GET** `/admin/job`  **( Login Required )**

Get jobs by filter

**Query Parameters :**
```ts
{
  createDate?: number;
  updateDate?: number;
  id?: string;
  source?: {
    originalId: string | null;
    name: string | null;
    string: string | null;
    dateFetched: number | null;
  } | null;
  title?: string;
  slug?: string | null;
  type?: string | null;
  locations?: {
    district: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    lat: string | null;
    lon: string | null;
  }[] | null;
  isRemote?: boolean | null;
  workMode?: string[] | null;
  salaryConfig?: {
    min: number | null;
    max: number | null;
    currency: string | null;
    period: string | null;
    negotiable: boolean | null;
  } | null;
  role?: string[] | null;
  subRole?: string[] | null;
  meta?: any | null;
  description?: {
    full: string | null;
    short: string | null;
  } | null;
  company?: {
    name: string | null;
    logo: string | null;
    website: string | null;
    industry: string | null;
    foundedYear: string | null;
    meta: any | null;
  } | null;
  applyLink?: string | null;
  status?: string | null;
  expiresAt?: number | null;
  requirements?: {
    relevantSkills: string[] | null;
    relevantDegrees: string[] | null;
    targetColleges: string[] | null;
    isCampusDrive: boolean | null;
    meta?: any | null;
  } | null;
  datePosted?: number | null;
  page: number;
  order: string;
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
      source: {
        originalId: string | null;
        name: string | null;
        string: string | null;
        dateFetched: number | null;
      } | null;
      title: string;
      slug: string | null;
      type: string | null;
      locations: {
        district: string | null;
        city: string | null;
        state: string | null;
        country: string | null;
        lat: string | null;
        lon: string | null;
      }[] | null;
      isRemote: boolean | null;
      workMode: string[] | null;
      salaryConfig?: {
        min: number | null;
        max: number | null;
        currency: string | null;
        period: string | null;
        negotiable: boolean | null;
      } | null;
      role: string[] | null;
      subRole: string[] | null;
      meta?: any | null;
      description: {
        full: string | null;
        short: string | null;
      } | null;
      company: {
        name: string | null;
        logo: string | null;
        website: string | null;
        industry: string | null;
        foundedYear: string | null;
        meta: any | null;
      } | null;
      applyLink: string | null;
      status: string | null;
      expiresAt: number | null;
      requirements: {
        relevantSkills: string[] | null;
        relevantDegrees: string[] | null;
        targetColleges: string[] | null;
        isCampusDrive: boolean | null;
        meta?: any | null;
      } | null;
      datePosted: number | null;
    }[];
  };
}
```

---

### Create job

**POST** `/admin/job`  **( Login Required )**

Create job

**Body :**
```ts
{
  source: {
    originalId: string | null;
    name: string | null;
    string: string | null;
    dateFetched: number | null;
  } | null;
  title: string;
  type: string | null;
  locations: {
    district: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    lat: string | null;
    lon: string | null;
  }[] | null;
  isRemote: boolean | null;
  workMode: string[] | null;
  salaryConfig?: {
    min: number | null;
    max: number | null;
    currency: string | null;
    period: string | null;
    negotiable: boolean | null;
  } | null;
  role: string[] | null;
  subRole: string[] | null;
  meta?: any | null;
  description: {
    full: string | null;
    short: string | null;
  } | null;
  company: {
    name: string | null;
    logo: string | null;
    website: string | null;
    industry: string | null;
    foundedYear: string | null;
    meta: any | null;
  } | null;
  applyLink: string | null;
  status: string | null;
  expiresAt: number | null;
  requirements: {
    relevantSkills: string[] | null;
    relevantDegrees: string[] | null;
    targetColleges: string[] | null;
    isCampusDrive: boolean | null;
    meta?: any | null;
  } | null;
  datePosted: number | null;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    job: {
      createDate: number;
      updateDate: number;
      id: string;
      source: {
        originalId: string | null;
        name: string | null;
        string: string | null;
        dateFetched: number | null;
      } | null;
      title: string;
      slug: string | null;
      type: string | null;
      locations: {
        district: string | null;
        city: string | null;
        state: string | null;
        country: string | null;
        lat: string | null;
        lon: string | null;
      }[] | null;
      isRemote: boolean | null;
      workMode: string[] | null;
      salaryConfig?: {
        min: number | null;
        max: number | null;
        currency: string | null;
        period: string | null;
        negotiable: boolean | null;
      } | null;
      role: string[] | null;
      subRole: string[] | null;
      meta?: any | null;
      description: {
        full: string | null;
        short: string | null;
      } | null;
      company: {
        name: string | null;
        logo: string | null;
        website: string | null;
        industry: string | null;
        foundedYear: string | null;
        meta: any | null;
      } | null;
      applyLink: string | null;
      status: string | null;
      expiresAt: number | null;
      requirements: {
        relevantSkills: string[] | null;
        relevantDegrees: string[] | null;
        targetColleges: string[] | null;
        isCampusDrive: boolean | null;
        meta?: any | null;
      } | null;
      datePosted: number | null;
    };
  };
}
```

---

### Create jobs

**POST** `/admin/job/bulk`  **( Login Required )**

Create jobs

**Body :**
```ts
{
  jobs: {
    source: {
      originalId: string | null;
      name: string | null;
      string: string | null;
      dateFetched: number | null;
    } | null;
    title: string;
    type: string | null;
    locations: {
      district: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
      lat: string | null;
      lon: string | null;
    }[] | null;
    isRemote: boolean | null;
    workMode: string[] | null;
    salaryConfig?: {
      min: number | null;
      max: number | null;
      currency: string | null;
      period: string | null;
      negotiable: boolean | null;
    } | null;
    role: string[] | null;
    subRole: string[] | null;
    meta?: any | null;
    description: {
      full: string | null;
      short: string | null;
    } | null;
    company: {
      name: string | null;
      logo: string | null;
      website: string | null;
      industry: string | null;
      foundedYear: string | null;
      meta: any | null;
    } | null;
    applyLink: string | null;
    status: string | null;
    expiresAt: number | null;
    requirements: {
      relevantSkills: string[] | null;
      relevantDegrees: string[] | null;
      targetColleges: string[] | null;
      isCampusDrive: boolean | null;
      meta?: any | null;
    } | null;
    datePosted: number | null;
  }[];
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
      source: {
        originalId: string | null;
        name: string | null;
        string: string | null;
        dateFetched: number | null;
      } | null;
      title: string;
      slug: string | null;
      type: string | null;
      locations: {
        district: string | null;
        city: string | null;
        state: string | null;
        country: string | null;
        lat: string | null;
        lon: string | null;
      }[] | null;
      isRemote: boolean | null;
      workMode: string[] | null;
      salaryConfig?: {
        min: number | null;
        max: number | null;
        currency: string | null;
        period: string | null;
        negotiable: boolean | null;
      } | null;
      role: string[] | null;
      subRole: string[] | null;
      meta?: any | null;
      description: {
        full: string | null;
        short: string | null;
      } | null;
      company: {
        name: string | null;
        logo: string | null;
        website: string | null;
        industry: string | null;
        foundedYear: string | null;
        meta: any | null;
      } | null;
      applyLink: string | null;
      status: string | null;
      expiresAt: number | null;
      requirements: {
        relevantSkills: string[] | null;
        relevantDegrees: string[] | null;
        targetColleges: string[] | null;
        isCampusDrive: boolean | null;
        meta?: any | null;
      } | null;
      datePosted: number | null;
    }[];
  };
}
```

---

### Update job

**PATCH** `/admin/job`  **( Login Required )**

Update job by Id

**Body :**
```ts
{
  source?: {
    originalId: string | null;
    name: string | null;
    string: string | null;
    dateFetched: number | null;
  } | null;
  title?: string;
  type?: string | null;
  locations?: {
    district: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    lat: string | null;
    lon: string | null;
  }[] | null;
  isRemote?: boolean | null;
  workMode?: string[] | null;
  salaryConfig?: {
    min: number | null;
    max: number | null;
    currency: string | null;
    period: string | null;
    negotiable: boolean | null;
  } | null;
  role?: string[] | null;
  subRole?: string[] | null;
  meta?: any | null;
  description?: {
    full: string | null;
    short: string | null;
  } | null;
  company?: {
    name: string | null;
    logo: string | null;
    website: string | null;
    industry: string | null;
    foundedYear: string | null;
    meta: any | null;
  } | null;
  applyLink?: string | null;
  status?: string | null;
  expiresAt?: number | null;
  requirements?: {
    relevantSkills: string[] | null;
    relevantDegrees: string[] | null;
    targetColleges: string[] | null;
    isCampusDrive: boolean | null;
    meta?: any | null;
  } | null;
  datePosted?: number | null;
  id: string;
}
```

**Response (200 OK) :**
```ts
{
  message: string;
  data: {
    job: {
      createDate: number;
      updateDate: number;
      id: string;
      source: {
        originalId: string | null;
        name: string | null;
        string: string | null;
        dateFetched: number | null;
      } | null;
      title: string;
      slug: string | null;
      type: string | null;
      locations: {
        district: string | null;
        city: string | null;
        state: string | null;
        country: string | null;
        lat: string | null;
        lon: string | null;
      }[] | null;
      isRemote: boolean | null;
      workMode: string[] | null;
      salaryConfig?: {
        min: number | null;
        max: number | null;
        currency: string | null;
        period: string | null;
        negotiable: boolean | null;
      } | null;
      role: string[] | null;
      subRole: string[] | null;
      meta?: any | null;
      description: {
        full: string | null;
        short: string | null;
      } | null;
      company: {
        name: string | null;
        logo: string | null;
        website: string | null;
        industry: string | null;
        foundedYear: string | null;
        meta: any | null;
      } | null;
      applyLink: string | null;
      status: string | null;
      expiresAt: number | null;
      requirements: {
        relevantSkills: string[] | null;
        relevantDegrees: string[] | null;
        targetColleges: string[] | null;
        isCampusDrive: boolean | null;
        meta?: any | null;
      } | null;
      datePosted: number | null;
    };
  };
}
```

---

### Delete job

**DELETE** `/admin/job`  **( Login Required )**

Delete job by Id

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

