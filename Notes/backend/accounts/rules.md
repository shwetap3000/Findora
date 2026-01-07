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

✔ Signup works
✔ Login verifies identity
❌ User is NOT remembered

This is **not a bug** — it’s how HTTP works.

---

## NEXT CHUNK (THE BIG ONE)

Now we finally answer:

> **“How does the server remember a logged-in user?”**

This is where **JWT** comes in.

But we’ll do it the same way:

* concept first
* then implementation
* then protection

---

### Before we move on, answer ONE thing:

Why is login alone **not enough** to keep a user authenticated across requests?

Once you answer, we open **JWT from zero** 🔐

