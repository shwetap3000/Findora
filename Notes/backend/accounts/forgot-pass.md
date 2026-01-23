# What “Forgot Password” Really Means

## PHASE 0 – Understand the Flow (DO NOT SKIP)

Before touching code, understand this:
**Forgot password = token-based authentication**

We do **NOT**:
* send old password
* reset password directly

We **DO**:
1. Generate a **reset token**
2. Email the token as a **link**
3. Verify token
4. Allow password change

Keep this mental model always.

---

## PHASE 1 – Backend Preparation (Django)

## STEP 1.1 – Decide where this logic lives

Usually inside:
```
accounts / users / auth app
```

If you already have:
```
accounts/
  models.py
  serializers.py
  views.py
  urls.py
```

Good, we’ll continue there.

---

## STEP 1.2 – Create Password Reset Token Model

Why?

* We need to track:
  * token
  * expiry
  * which user
  * whether used

### Model logic (conceptual)

Each reset request creates **one record**.

Fields you need:
* user (ForeignKey)
* token (random string)
* created_at
* expires_at
* is_used

This ensures:
* one-time usage
* time-limited access

> At this stage, just **understand why** we need a model.

---

## STEP 1.3 – Run migrations

Any time you add a model:
```
makemigrations
migrate
```

✔ Backend can now store reset tokens.

---

## PHASE 2 – Forgot Password API (Request Reset)

This is when user **enters email**.

---

## STEP 2.1 – Create Forgot Password API endpoint

### Endpoint
```
POST /auth/forgot-password/
```

### Input
```json
{
  "email": "user@example.com"
}
```

---

## STEP 2.2 – Backend Logic (VERY IMPORTANT)

Inside your view:
1️⃣ Extract email
2️⃣ Try to find user
3️⃣ If user exists:
* generate token
* save token in DB
* send email
  4️⃣ If user does NOT exist:
* still return success response

Why?
**Security** (email enumeration protection)

---

## STEP 2.3 – Generate Secure Token

Token must be:
* random
* unpredictable
* unique

Examples:
* UUID
* secrets.token_urlsafe()

Also calculate:
```
expires_at = now + 15 minutes
```

---

## STEP 2.4 – Send Reset Email

Email contains:
```
https://your-frontend/reset-password/<token>
```

IMPORTANT
The link must go to **React frontend**, NOT Django backend.

---

## STEP 2.5 – API Response

Always return:
```json
{
  "message": "If the email exists, a reset link has been sent."
}
```

✔ Phase 2 complete.

---

## PHASE 3 – Forgot Password Page (Frontend)

Now React comes in.

---

## STEP 3.1 – Create Forgot Password Page

Route example:
```
/forgot-password
```

UI elements:
* Email input
* Submit button

---

## STEP 3.2 – Handle Submit (React)

On submit:
1️⃣ Validate email
2️⃣ Send POST request to backend
3️⃣ Show success message
4️⃣ Disable button / show loader

DO NOT:
* show “email not registered”

---

## STEP 3.3 – UX Improvement (Optional but GOOD)

After success:
* Show message
* Redirect to login after few seconds

---

## PHASE 4 – Reset Password Page (Frontend)

This page opens **from email link**.

---

## STEP 4.1 – Create Reset Password Route

Example:
```
/reset-password/:token
```

React extracts:
```
token = useParams().token
```

---

## STEP 4.2 – Reset Password UI

Inputs:
* New password
* Confirm password

Validations:
* Length
* Match check

---

## STEP 4.3 – Submit Reset Request

Send:
```
POST /auth/reset-password/
{
  "token": "abc123",
  "new_password": "Strong@123"
}
```

---

## PHASE 5 – Reset Password API (Backend)

This is the **most critical phase**.

---

## STEP 5.1 – Backend Receives Token

Backend must check:

✔ Token exists
✔ Token not expired
✔ Token not used
✔ Token linked to a user

If ANY fail → error

---

## STEP 5.2 – Update Password Securely

If token valid:

1️⃣ Hash password (`set_password`)
2️⃣ Save user
3️⃣ Mark token as used
4️⃣ Optionally delete token

Return:

```json
{
  "message": "Password reset successful"
}
```

---

# 🔄 PHASE 6 – Final UX Flow

Frontend:

* Show success message
* Redirect to login
* User logs in with new password

---

## PHASE 7 – Security Checklist (VERY IMPORTANT)

Make sure you have:

✅ Token expiry (15–30 min)
✅ Single-use tokens
✅ Same response for all emails
✅ Strong password validation
✅ HTTPS only
✅ No token logging

---

## How YOU Should Implement This (Recommended Order)

Follow this exact order:

1️⃣ Create token model
2️⃣ Forgot password backend API
3️⃣ Email sending
4️⃣ Forgot password React page
5️⃣ Reset password React page
6️⃣ Reset password backend API

---






---

# 🔹 STEP 1: PASSWORD RESET TOKEN MODEL (DJANGO)

## First: WHY do we need this model?

Ask yourself:
* How will we know **who** is resetting the password?
* How will we know **if the link is expired**?
* How will we prevent **reusing the same link**?

Answer: **store reset requests in DB**

That’s exactly what this model does.

---

## STEP 1.1: Where to create this model?

Go to the app where your **User model / auth logic** lives.
```
accounts/models.py
```

---

## STEP 1.2: What fields do we need? (VERY IMPORTANT)

We are designing this **before writing code**.

### Required fields (with reason):

| Field        | Why                        |
| ------------ | -------------------------- |
| `user`       | Which user requested reset |
| `token`      | Unique reset identifier    |
| `created_at` | For tracking               |
| `expires_at` | Token should expire        |
| `is_used`    | Prevent reuse              |

This already covers **security + logic**.

---

## STEP 1.3: Write the Model Code

Open `accounts/models.py`

```python
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
```

Now the model 

```python
class PasswordResetToken(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="password_reset_tokens"
    )

    token = models.CharField(max_length=255, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    expires_at = models.DateTimeField()

    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"Password reset token for {self.user.email}"
```

---

## STEP 1.4: Understand EVERY line

### 🔹 `ForeignKey(User)`
* Links token to exactly **one user**
* If user is deleted → tokens auto-delete (`CASCADE`)

---

### 🔹 `token = CharField(unique=True)`
* This is what goes in the email URL
* `unique=True` ensures no collisions

---

### 🔹 `created_at`
* Auto-set when object is created
* Helpful for debugging + logs

---

### 🔹 `expires_at`
* We’ll manually set this to:
  ```
  now + 15 minutes
  ```
* Used to **invalidate old links**

---

### 🔹 `is_used`

* Once password reset is successful → set `True`
* Prevents replay attacks

---

## STEP 1.5: (Optional but GOOD) Add helper method

This makes token validation clean later.

Add this inside the model:

```python
def is_expired(self):
    return timezone.now() > self.expires_at
```

Now later you can simply say:

```python
if token.is_expired():
    # reject
```

---

## STEP 1.6: Make & Run Migrations

Run these commands:

```bash
python manage.py makemigrations
python manage.py migrate
```

If no errors → model created successfully.
 
--- 

## **Create the “Forgot Password” API (request reset link)**

Why?
* We already have a place to **store tokens**
* Now we need a way to **create them**
* Email + token generation happens here

So yes — **this is the right next step**.

---

# 🔹 STEP 2: FORGOT PASSWORD API (STEP-BY-STEP)

## What this API must do (clear goal)

When user submits email:
1️⃣ Receive email
2️⃣ Find user (if exists)
3️⃣ Generate secure token
4️⃣ Save token in DB with expiry
5️⃣ Send email with reset link
6️⃣ Return generic success response

---

## 📁 STEP 2.1: Decide API location

Inside your auth app:

```
accounts/
  views.py
  serializers.py   (optional)
  urls.py
```

We’ll start with **views.py**.

---

## 🔐 STEP 2.2: Token generation logic (VERY IMPORTANT)

### Why not random strings manually?

Because security.

### Best practice in Python:

```python
import secrets
```

Use:

```python
secrets.token_urlsafe(32)
```

* Cryptographically secure
* URL-safe
* Practically impossible to guess

---

## ⏱️ STEP 2.3: Token expiry logic

We’ll give token **15 minutes** life.

```python
from django.utils import timezone
from datetime import timedelta

expires_at = timezone.now() + timedelta(minutes=15)
```

---

## 🧱 STEP 2.4: Write the Forgot Password View

I’ll give you the **clean version first**, then explain line by line.

### `accounts/views.py`

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
import secrets

from .models import PasswordResetToken

User = get_user_model()


class ForgotPasswordAPIView(APIView):

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response(
                {"error": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # IMPORTANT: don't reveal whether user exists
            return Response(
                {"message": "If the email exists, a reset link has been sent."},
                status=status.HTTP_200_OK
            )

        # Generate secure token
        token = secrets.token_urlsafe(32)

        # Set expiry time
        expires_at = timezone.now() + timedelta(minutes=15)

        # Save token
        PasswordResetToken.objects.create(
            user=user,
            token=token,
            expires_at=expires_at
        )

        # TODO: Send email (we'll do this next)

        return Response(
            {"message": "If the email exists, a reset link has been sent."},
            status=status.HTTP_200_OK
        )
```

---

## 🔍 STEP 2.5: Understand Every Important Part

### 🔹 Why `try/except`?

To avoid:

> “Email not registered”

This is **security best practice**.

---

### 🔹 Why same response for success + failure?

Prevents attackers from checking which emails exist.

---

### 🔹 Why store expiry in DB?

So we can invalidate links later.

---

### 🔹 Why not delete old tokens here?

We’ll handle that later (optional cleanup).

---

## 🌐 STEP 2.6: Add URL

### `accounts/urls.py`

```python
from django.urls import path
from .views import ForgotPasswordAPIView

urlpatterns = [
    path("forgot-password/", ForgotPasswordAPIView.as_view()),
]
```

---

## 🧪 STEP 2.7: Test with Postman / Thunder Client

### Request

```
POST /auth/forgot-password/
```

```json
{
  "email": "test@example.com"
}
```

### Expected response (always same)

```json
{
  "message": "If the email exists, a reset link has been sent."
}
```

### Check DB

* New row in `PasswordResetToken`
* Correct user
* Expiry set

---

## ✅ STEP 2 COMPLETE

At this point:

* ✔ Token generated securely
* ✔ Stored in DB
* ✔ Safe response logic
* ❌ Email not yet sent (next)

---

## 👉 NEXT STEP (IMPORTANT)

Reply with **one**:

1️⃣ **“Teach me how to send the reset email”**
2️⃣ **“Teach me reset password API (token verification)”**
3️⃣ **“Teach me frontend forgot password page”**

We’ll keep building this cleanly 💪
