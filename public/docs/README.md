# CampusX Backend Documentation

## Models

### User Data

**Name** : userObj \

```ts
{
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
}
```

### Small User Data

**Name** : smallUserObj \

```ts
{
  id: string;
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
}
```

## Authentication

### [Signup] Get OTP

**Endpoint** : /signup/get-otp \
**Method** : POST \
\- Sends an OTP to the given contact (email)

**Body :**

```ts
{
  email: string; // required
}
```

**Response (200 OK) :**

```ts
{
  message: "Otp sent.";
}
```

### [Signup] Verify OTP

**Endpoint** : /signup/verify-otp \
**Method** : POST \
\- Verifies the OTP sent to the email in _Send OTP_ step

**Body :**

```ts
{
  email: string; // required
  otp: string; // required
}
```

**Response (200 OK) :**

```ts
{
  message: "OTP verified";
  data: {
    otpToken: string;
  }
}
```

### [Signup] Create Password

**Endpoint** : /signup/create-password \
**Method** : POST \
\- Creates password for the email given in _Send OTP_ step.

**Body :**

```ts
{
  otpToken: string; // required;
  password: string; // required
}
```

**Response (200 OK) :**

```ts
{
  message: "Signed up.";
  data: {
    user: null;
    authToken: string;
  }
}
```

### [Login] Email and Password

**Endpoint** : /login/basic \
**Method** : POST \
\- Login with email and password

**Body :**

```ts
{
  email: string; // required
  password: string; // required
}
```

**Response (200 OK) :**

```ts
{
  message: "Logged in.";
  data: {
    authToken: string;
    user: {
      id: string;
      fullName: string;
    } | null
  }
}
```

### [Logout] Logout

**Endpoint** : /logout \
**Method** : GET \
\- Logs out the current user, `authToken` will become invalid after this.

**Response (200 OK) :**

```ts
{
  message: "Logged out succesfully";
}
```

## User

### [User] Get User Profile

**Endpoint** : /user/profile \
**Method** : GET \
\- Gets the user profile

**Query :**

```ts
{
  id: string; // required
}
```

**Response (200 OK) :**

```ts
{
  message: "User found.";
  data: {
    profile: userObj;
  }
}
```

### [User] Get All Users

**Endpoint** : /user/all \
**Method** : GET \
\- Gets all the users, will upgrade this endpoint towards recommended users

**Query :**

```ts
{
  page: number; // default 1
}
```

**Response (200 OK) :**

```ts
{
  message: "Users found.";
  data: {
    users: [userObj];
  }
}
```

### [User] Get My Information

**Endpoint** : /user/me \
**Method** : GET \
\- Get the information for the current logged in user.

**Response (200 OK) :**

```ts
{
  message: "User found.";
  data: {
    profile: userObj;
  }
}
```

### [User] Create Profile

**Endpoint** : /user/profile \
**Method** : GET \
\- Creates user profile if already not made

**Body :**

```ts
{
  username: string | null;
  fullName: string; // required
  about: string | null;
  avatarUrl: string | null;
  gender: string | null;
  dob: number | null;
}
```

**Response (200 OK) :**

```ts
{
  message: "User created.";
  data: {
    profile: userObj;
  }
}
```

### [User] Update Profile

**Endpoint** : /user/profile \
**Method** : PUT \
\- Updates the user profile.\
 Only updates the field given.

**Body :**

```ts
{
  username: string | null; // optional
  fullName: string; // optional
  about: string | null; // optional
  avatarUrl: string | null; // optional
  gender: string | null; // optional
  dob: number | null; // optional
}
```

**Response (200 OK) :**

```ts
{
  message: "User updated.";
  data: {
    profile: userObj;
  }
}
```

### [Follow] Get Followers

**Endpoint** : /user/followers \
**Method** : GET \
\- Gets the list of users that follow the requested user

**Query :**

```ts
{
  id: string; // required
  page: number; // default 1
}
```

**Response (200 OK) :**

```ts
{
  message: "Followers fetched.";
  data: {
    followers: [smallUserObj];
  }
}
```
