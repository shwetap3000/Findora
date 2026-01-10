# AUTH SYSTEM 

## We are using:
   * Django
   * Django REST Framework
   * `AbstractUser`
   * JWT

---

## CHUNK 0: WHAT PROBLEM ARE WE SOLVING ?

Let’s start with a simple question.

### What is authentication?

Authentication answers **only one thing**:
> “Who is making this request?”

Not:
* what data to return
* what logic to run

Just **identity**.

---

## CHUNK 1: WHY AUTH IS NEEDED (real-world analogy)

Imagine a college library.

* Anyone can **enter** the library
* Only students can **borrow books**
* Only admins can **manage records**

So the librarian must know:

* Who are you?
* Are you allowed?

Web apps work the same way.

---

## CHUNK 2: WHY BACKEND CAN’T “REMEMBER” USERS

This is the most important mental model.

### HTTP is stateless

Each request is independent:

```
Request 1 → server
Request 2 → server
Request 3 → server
```

The server **does not remember** previous requests.

So if you log in once:
* That login request ends
* Server memory is gone

 This is why “login” alone is useless.

---

## CHUNK 3: WHAT LOGIN ACTUALLY DOES

Let’s kill a common misconception.
 Login does NOT keep you logged in
 Login does NOT create a session automatically

### Login only does this:

1. You send credentials
2. Server verifies them
3. Server says:

   > “Yes, you are real”

That’s it.

---

## CHUNK 4: THEN HOW DO APPS STAY LOGGED IN?

We need a **proof** that survives between requests.

This proof must:
* Be sent with every request
* Identify the user
* Be verifiable by the server

This proof is called a **token**.

---

## CHUNK 5: WHAT IS A TOKEN (in simplest words)

A token is:
> A **digital ID card** issued by the server

Client carries it.
Server checks it.

No token → stranger
Valid token → trusted user

---

## CHUNK 6: TYPES OF AUTH (big picture)

There are two main approaches:

### 1️⃣ Session-based auth (traditional)

* Server stores session
* Browser stores session ID (cookie)

Used in:
* Django templates
* Old websites

---

### 2️⃣ Token-based auth (modern)

* Server issues token
* Client sends token on every request
* Server validates token

Used in:
* React
* Mobile apps
* APIs

 We use **token-based auth**

---

## CHUNK 7: WHY JWT

JWT is a type of token that:

* Is self-contained
* Has expiry
* Can be verified without DB lookup

This solves:
* Scalability
* Performance
* Stateless APIs

---

## STOP 🛑 — CHECKPOINT 1

Before writing **any code**, you should clearly understand:

1. Why login alone doesn’t keep a user logged in
2. Why a token is needed
3. Why APIs prefer token-based auth

> (as http is a stateless protocol hence it does not remember the previous request hence server doesnt remember the users automatically, so if we use stateful protocols that it consumes so much memory to remember each user hence we avoid them

token solve exactly this problem, instead of remembering each user it provides so =me token to the user, which user can later show to the server and verifies himself that he is authenticated or a valid user)

---

# CHUNK 8: WHAT IS THE FIRST LINE OF CODE IN AUTH?

Before login, tokens, or permissions, the backend must answer:

> **“Who can exist in my system?”**

So the **first technical step** in auth is:

 **Define the User**

Not signup.
Not login.
Not JWT.

Just **identity**.

---

## CHUNK 9: WHY DJANGO HAS A USER MODEL

Django gives us a built-in auth system because:

* Every app needs users
* Password security is hard
* Auth bugs are dangerous

So Django provides:
* Password hashing
* Login verification
* Permissions
* Admin integration

We will **reuse** this instead of reinventing it.

---

## CHUNK 10: WHY WE USE `AbstractUser`

There are 3 choices in Django:

1. `User` (default, rigid)
2. `AbstractUser` (customizable, safe)
3. `AbstractBaseUser` (full control, complex)

You chose **AbstractUser** because:
* Beginner-friendly
* Flexible enough
* Minimal mistakes
* Industry-acceptable

Good choice.

---

## CHUNK 11: WHAT OUR USER NEEDS (MINIMUM)

Let’s define the **minimum identity fields**.

| Field    | Why                   |
| -------- | --------------------- |
| email    | Unique identity       |
| password | Verification          |
| username | Django compatibility  |
| flags    | Admin / active status |

We **do not add profile info here**.

---

## CHUNK 12: WRITING THE USER MODEL (FIRST REAL CODE)

### `accounts/models.py`

```python
from django.db import models
from django.contrib.auth.models import AbstractUser
```

### Why these imports?

* `models` → database structure
* `AbstractUser` → Django’s auth foundation

---

### Define the user

```python
class UserModel(AbstractUser):
```

This line means:

> “Create my own user, but inherit Django’s auth brain”

So now you automatically get:
* password hashing
* login logic
* permissions
* admin support

---

### Add email field

```python
email = models.EmailField(unique=True)
```

Why?
* Email uniquely identifies a user
* We don’t want duplicate emails

---

### Make email the login identity

```python
USERNAME_FIELD = 'email'
REQUIRED_FIELDS = ['username']
```

Plain English:
* “Login uses email”
* “Username is still required internally”

This avoids breaking Django internals.

---

### String representation

```python
def __str__(self):
    return self.email
```

Used for:
* Admin panel
* Debugging
* Logs

---

## CHUNK 13: TELL DJANGO TO USE THIS USER

This step is **critical**.

### `settings.py`

```python
AUTH_USER_MODEL = 'accounts.UserModel'
```

Why?
* Django must know which user model to use
* This must be done **before migrations**

---

## STOP 🛑 — CHECKPOINT 2

At this point:

✔ We have NOT built signup
✔ We have NOT built login
✔ We have NOT built JWT

We have only answered:

> “What is a user in our system?”

This is intentional.

---

### Before we move on, confirm ONE thing:

Do you clearly understand **why defining the user model comes before signup and login**?
> (the user model comes before signup and login because first there must be an user to perform this operations hence we create user first before signup and login)

---

# CHUNK 14: HOW A USER ENTERS THE SYSTEM (SIGNUP)

Now that **users can exist**, the next question is:

> **How does a new user get created safely?**

This is called **registration / signup**.

We’ll go **concept → flow → code**.

---

## CHUNK 15: WHAT SIGNUP REALLY MEANS (NO CODE)

Signup is **NOT** authentication.

Signup only does this:
1. Accept user data
2. Validate it
3. Store it securely

That’s it.

No tokens
No login
No permissions

Just **creation**.

---

## CHUNK 16: WHY PASSWORDS ARE SPECIAL

Passwords are dangerous.

So:
* Never store plain text
* Never manually hash
* Never write your own crypto

Django already handles:
* Hashing
* Salting
* Secure comparison

Our job is:
> “Give Django the raw password — it handles the rest”

---

## CHUNK 17: HOW SIGNUP WORKS IN AN API (MENTAL FLOW)

Imagine this request:

```
POST /api/signup/
{
  "email": "abc@gmail.com",
  "username": "abc",
  "password": "secret123"
}
```

Backend must:
1. Check data validity
2. Create a User object
3. Hash password
4. Save to DB
5. Return success response

We must **never** return the password.

---

## CHUNK 18: WHY WE NEED SERIALIZERS (DRF)

Django models:
* Talk to database

APIs:
* Talk to JSON

Serializer is the bridge.

Serializer does:
* Input validation
* Output formatting
* Object creation

Without serializers, APIs become messy and unsafe.

---

## CHUNK 19: CREATE SIGNUP SERIALIZER (FIRST API LOGIC)

### `accounts/serializers.py`

```python
from rest_framework import serializers
from .models import UserModel
```

Why?
* `serializers` → input/output validation
* `UserModel` → create user records

---

### Signup serializer

```python
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
```

Why `write_only`?

* Password comes IN
* Never goes OUT

Security rule.

---

### Meta configuration

```python
class Meta:
    model = UserModel
    fields = ['email', 'username', 'password']
```

This tells DRF:
* Which model
* Which fields are allowed

---

### Override create method (IMPORTANT)

```python
def create(self, validated_data):
    user = UserModel.objects.create_user(
        email=validated_data['email'],
        username=validated_data['username'],
        password=validated_data['password']
    )
    return user
```

Why this is critical:
* `create_user()` hashes password
* Using `.create()` would store plain text 

This is the **single most important line** in signup.

---

## CHUNK 20: CREATE SIGNUP API VIEW

### `accounts/views.py`

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
```

Why APIView?
* Full control
* Clear learning path

---

### Signup view

```python
class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

Plain English:
* Accept data
* Validate
* Save user
* Respond

No login. No token.

---

## CHUNK 21: URL ROUTING

### `accounts/urls.py`

```python
from django.urls import path
from .views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view()),
]
```

Include in main `urls.py`.

---

## STOP 🛑 — CHECKPOINT 3

At this point:

✔ Users can be created
✔ Passwords are hashed
✔ No authentication yet

That is **correct and intentional**.

---

### Before we move on, answer ONE question:

Why is it dangerous to use `UserModel.objects.create()` instead of `create_user()` during signup?

---

# CHUNK 22: LOGIN — PROVING IDENTITY (NO JWT YET)

Now we move to the **next logical question**:

> **“How does an existing user prove they are who they say they are?”**

This is **login**.

---

## CHUNK 23: WHAT LOGIN IS (VERY CLEARLY)

Login does **only one thing**:

> **Verifies credentials**

That’s it.

It does **not**:
* keep user logged in
* remember user
* protect future requests

Those come later.

---

## CHUNK 24: HOW DJANGO VERIFIES LOGIN

Django already knows how to:

* hash passwords
* compare hashes securely
* protect against timing attacks

The function used is:

```python
authenticate()
```

This function:
1. Takes credentials
2. Finds user
3. Verifies password
4. Returns user or None

---

## CHUNK 25: LOGIN FLOW (MENTAL MODEL)

Client sends:

```
POST /login/
{
  "email": "...",
  "password": "..."
}
```

Backend:
1. Extracts email & password
2. Calls `authenticate`
3. If user exists → success
4. If not → error

Still **no tokens**.

---

## CHUNK 26: LOGIN SERIALIZER (WHY WE NEED IT)

We need:
* Input validation
* Clean error handling

### `accounts/serializers.py`

```python
from django.contrib.auth import authenticate
```

---

### Login serializer

```python
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
```

Why `Serializer` not `ModelSerializer`?

* We are not creating a model
* We are validating input only

---

### Credential validation

```python
def validate(self, data):
    user = authenticate(
        email=data['email'],
        password=data['password']
    )

    if not user:
        raise serializers.ValidationError("Invalid credentials")

    data['user'] = user
    return data
```

This:

* Calls Django auth system
* Ensures password verification
* Returns authenticated user

---

## CHUNK 27: LOGIN VIEW

### `accounts/views.py`

```python
class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            return Response(
                {"message": "Login successful"},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

At this stage:

* Login works
* User is verified
* But server forgets user immediately after

That’s expected.

---

## STOP 🛑 — CHECKPOINT 4

Right now:

Signup works
Login verifies identity
User is NOT remembered

This is **not a bug** — it’s how HTTP works.

---
---


# JWT - JSON Web Token

---

## CHUNK 1: WHY JWT EXISTS (RECAP + CONNECTION)

You already understood this perfectly:
* HTTP is **stateless**
* Server does **not remember users**
* Storing sessions for millions of users = memory heavy

**JWT solves this** by giving the client a **proof of identity**.
> “Don’t remember me — I’ll carry my identity with me.”

---

## CHUNK 2: WHAT JWT ACTUALLY IS 

JWT = **JSON Web Token**

It is just:
```
a long encoded string
```

Example:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

This token:
* Is generated by **server**
* Stored by **client**
* Sent with **every request**
* Verified by **server**

---

## CHUNK 3: JWT HAS 3 PARTS (VERY IMPORTANT)

A JWT looks like this:
```
HEADER.PAYLOAD.SIGNATURE
```

### 1️⃣ Header

Tells:
* Which algorithm is used

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

---

### 2️⃣ Payload (MOST IMPORTANT)

Contains:
* User identity
* Expiry time

```json
{
  "user_id": 5,
  "email": "test@gmail.com",
  "exp": 1700000000
}
```

Payload is **NOT encrypted**
Anyone can decode it (but not change it).

---

### 3️⃣ Signature (SECURITY PART)

Signature =
```
HEADER + PAYLOAD + SECRET_KEY
```

This ensures:
* Token is not tampered
* Token was created by **your server**

If someone modifies payload → signature breaks → invalid token

---

## CHUNK 4: JWT FLOW

Let’s map this to **login**.

### Step-by-step:

1️⃣ User sends login credentials

```json
{
  "email": "test@gmail.com",
  "password": "1234"
}
```

2️⃣ Server verifies credentials
3️⃣ Server generates JWT
4️⃣ Server returns token

```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "..."
}
```

5️⃣ Client stores token
6️⃣ Client sends token in future requests

```
Authorization: Bearer <token>
```

---

## CHUNK 5: WHY TWO TOKENS? (ACCESS & REFRESH)

### Access Token
* Short-lived (5–15 min)
* Used for API requests

### Refresh Token
* Long-lived (days)
* Used to get new access token

Security + usability balance

---

## CHUNK 6: WHY DJANGO DOESN’T DO JWT BY DEFAULT

Django default auth:
* Session-based
* Cookies
* Stateful

JWT:
* Stateless
* API-friendly
* Frontend-friendly (React, mobile)

So we use:
```
djangorestframework-simplejwt
```

---

## CHUNK 7: INSTALL JWT (FIRST REAL STEP)

```bash
pip install djangorestframework-simplejwt
```

---

## CHUNK 8: TELL DJANGO TO USE JWT

### settings.py

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

```python
from datetime import timedelta

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
```

```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}
```

Don’t memorize this — just understand:
* Token lifetime
* Authorization header format

---

## CHUNK 9: JWT ENDPOINTS (WHAT WE’LL BUILD)

We will create:
* `/login/` → returns token
* `/refresh/` → refresh access token
* Protected APIs

---

## STOP HERE (IMPORTANT)

Before writing login code, you must clearly answer this:

> **What exactly should happen after successful login?**
 Credentials verified
 Token generated
 Token returned

---
---

## CHUNK 1: WHAT PROBLEM ARE WE SOLVING RIGHT NOW?

Up to now:
* User exists in database 
* Password is hashed 
* Login verifies credentials 

But after login:
* Server still doesn’t “remember” user
* Next request is anonymous again

**JWT fixes this by giving a token**

So our **current goal** is:
> After successful login, **generate and return JWT tokens**

Nothing more.

---

## CHUNK 2: WHO CREATES JWT TOKENS?

We do **not** write JWT logic ourselves.

Why?
* Cryptography is error-prone
* Security libraries are battle-tested

So we use:
```python
djangorestframework-simplejwt
```

This library already knows:
* how to create JWT
* how to sign it
* how to expire it

We just **call it correctly**.

---

## CHUNK 3: JWT OBJECT (IMPORTANT IDEA)

SimpleJWT gives us this class:
```python
RefreshToken
```

Think of it as:
> “A token factory for a specific user”

If we give it a user:
```python
RefreshToken.for_user(user)
```

It returns:
* a **refresh token**
* an **access token (inside it)**

---

## CHUNK 4: WHERE LOGIN LOGIC LIVES

Login is an **API endpoint**, so it lives in:

```
accounts/views.py
```

We will:
* receive email + password
* validate them
* generate token
* return response

---
---

## CHUNK 1: WHAT DOES “PROTECT AN API” MEAN?

Right now:
* Anyone can call any API
* Even without login

We want:
> Only users with a **valid JWT token** can access certain APIs

So:
```
No token  →  blocked  
Bad token →  blocked  
Valid token →  allowed
```

That’s **authentication**.

---

## CHUNK 2: HOW JWT AUTHENTICATION WORKS IN DRF

When a request comes in with this header:

```
Authorization: Bearer <JWT_TOKEN>
```

DRF will:
1. Extract the token
2. Decode it
3. Verify signature
4. Check expiry
5. Find user inside payload
6. Set `request.user`

So inside your view:

```python
request.user
```

will be the **logged-in user**

---

## CHUNK 3: TURN ON JWT GLOBALLY

We already added:

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
```

This tells Django:
> “Use JWT to authenticate every request”

But this alone does NOT block anyone.

---

## CHUNK 4: THE LOCK = PERMISSIONS

To block anonymous users we use:

```python
from rest_framework.permissions import IsAuthenticated
```

This means:
> “Only allow requests where request.user is valid”

---

## CHUNK 5: CREATE A PROTECTED API

Let’s create a test API:

### `accounts/views.py`

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user

    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.username
    })
```

---

## CHUNK 6: WHAT THESE LINES MEAN

### `@permission_classes([IsAuthenticated])`

This is the lock 

Without a valid token:
```
401 Unauthorized
```

With a valid token:
```
request.user = real user
```

---

## CHUNK 7: ADD URL

`accounts/urls.py`

```python
from .views import profile_view

urlpatterns = [
    path('login/', login_user),
    path('profile/', profile_view),
]
```

---

## CHUNK 8: HOW TO TEST 

### Step 1: Login

Get access token

```json
{
  "access": "eyJhbGciOi..."
}
```

---

### Step 2: Open profile API

Click **Headers** tab in DRF

Add:

```
Key: Authorization
Value: Bearer <your_access_token>
```

Example:

```
Authorization: Bearer eyJhbGciOi...
```

---

### Step 3: Click GET

You get:

```json
{
  "id": 1,
  "email": "test@gmail.com",
  "username": "testuser"
}
```

---

## CHUNK 9: TRY WITHOUT TOKEN

Remove header → GET →

```json
{
  "detail": "Authentication credentials were not provided."
}
```

This proves:
> JWT is protecting the API

---

## BIG PICTURE (VERY IMPORTANT)

You just built:

```
Signup → Login → Token → Protected API
```

This is **exactly** how:
* Instagram
* Gmail
* Netflix
* Amazon

work (internally).

---


