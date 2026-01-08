```python
from rest_framework import serializers

# this line import django's built-in function authenticate that checks if a user's login details are correct or not
# it already knows how to find the user, check the password and return the user if everything is correct
from django.contrib.auth import authenticate

# importing UserModel
from .models import UserModel


# =========================
# SIGNUP SERIALIZER
# =========================


class RegisterSerializer(serializers.ModelSerializer):

    # the api must accept a password otherwise signup is impossible but in our model we did not manually define password, it comes internally from AbstractUser and we should never expose it or return it, so we define password only in hte serializer as an input field

    # serializers.CharField expect text input and validate it as a string and raise error if input is not valid
    # so this line tells DRF that the signup api expexts a text field called password

    # write_only=True means the client can send password but api will never return passwors in response (password is hidden for security)

    # We did not manually create a password field in the model because Django’s AbstractUser already provides a secure password field and authentication system, which is present internally and stores the hashed passwords only (creating password field manually can store the password as plain text and this could be dangerous). The serializer temporarily accepts the password as input, and create_user() safely hashes and stores it in the existing model field.
    password = serializers.CharField(write_only=True)


    # this is a configuration class that tells the serializer which model to use and which fields to accept
    class Meta:

        # connect this serializer to UserModel (means data will be saved in db and validation is based on UserModel fields)
        model = UserModel

        # only fields allowed during signup and prevents unwanted fields from being passed. Keeps the api clean and secure
        fields = ['email', 'username', 'password']

    def create(self, validated_data):

        # we override default .create() with .create_user() bcoz .create() stores the password in plan text whereas .create_user() hashes the password and sets proper auth fields

        # validated_data contains cleaned and validated input, it comes after is_valid() is called (in views). Data is safe to use here
        user = UserModel.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],

            # the serializer does not save password directly, it passes password to this line and this line stores it safely in the model's password field
            password=validated_data['password']
        )

        # returns the newly created user. DRF uses this object for response and for further processing
        return user


# =========================
# LOGIN SERIALIZER
# =========================

# this is a normal serializer and not a model serializer bcoz login does not create or update a model, we only accept credentials and verify them (no database involvement)
class LoginSerializer(serializers.Serializer):

    # expects a valid email format. Automatically validates email structure, domain, etc. This is input only
    email = serializers.EmailField()

    # accept password as text. password is accepte but is neve returned in response
    password = serializers.CharField(write_only=True)


    # here django calls authenticate built-in function and find user by email, hashes the entered password and compare with the stored hash. If valid then returns the user object else returns none 
    # here data is a dictionary and it contains validated input fields
    def validate(self, data):
        user = authenticate(
            email=data['email'],
            password=data['password']
        )


        # this handles the invalid credentials. If auth fails then this raise an error and serializer becomes invalid
        if not user:
            raise serializers.ValidationError("Invalid credentials")

        # adding the validate user into the dictionary (data)
        # this line attaches the authenticated user object to the validated data so the view can access it and complete the login process (like generating tokens)
        data['user'] = user
        return data

```

Model → defines what is stored
Serializer → defines what data is accepted and returned by the API

So a serializer can:
have fields that don’t exist in the model
ignore some model fields
control input/output behavior

> We create model fields to store data in the database.
We create serializers to convert data between Python objects and JSON and to validate input. 
We created a temporary password field in the serializer so the frontend can show a password input.
The serializer only validates the password, it does not store it directly.
The password is then passed to create_user(), which hashes the password and stores it securely in the database.

> When we use AbstractUser, the password field already exists internally in the model, so we must NOT redefine it.
Redefining it can cause serious problems like overriding Django’s secure password handling or storing passwords in plain text.
Therefore, we create a temporary password field in the serializer.
This field is only used to accept and validate the password entered by the user.
Once validation passes, the serializer sends the password to create_user(), which hashes the password and stores it in the already-existing password field in the database.







# Serializers
---

## 🔹 What is a Serializer? (Core Idea)

A **serializer** in Django REST Framework is a **bridge** between:

> **Python objects ⇄ JSON data**

In simple words:
* Frontend speaks **JSON**
* Backend works with **Python objects**
* **Serializer translates between them**

---

# 🔹 Why serializers exist at all?

Without serializers:
* Backend would accept **raw JSON**
* No validation
* No structure
* No security

Serializer gives:
✔ validation
✔ clean data
✔ controlled input
✔ controlled output

---

# 🔹 What exactly does a serializer do?

A serializer has **4 main jobs** :

---

## 1️⃣ Convert JSON → Python (Deserialization)

When frontend sends request:
```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

Serializer:
* Reads JSON
* Converts it into Python types
* Checks correctness

```python
serializer = LoginSerializer(data=request.data)
serializer.is_valid()
```

After validation:
```python
serializer.validated_data
```

```python
{
  'email': 'user@gmail.com',
  'password': '123456'
}
```

---

## 2️⃣ Convert Python → JSON (Serialization)

When backend sends response:

```python
user = request.user
```

Serializer converts it to JSON:

```json
{
  "id": 1,
  "email": "user@gmail.com"
}
```

This prevents:
* exposing passwords
* exposing internal fields

---

## 3️⃣ Validate data (MOST IMPORTANT)

Serializer is your **security guard** 

It checks:
* required fields
* data type
* format
* length
* custom rules

Example:

```python
email = serializers.EmailField()
```

 valid email required
 random string rejected

---

## 4️⃣ Control what data is allowed

Serializer decides:
* what comes **IN**
* what goes **OUT**

Example:
```python
password = serializers.CharField(write_only=True)
```

 password accepted
 password never sent in response

---

# 🔹 How serializer fits in request flow

### Complete API flow:

```
Frontend → JSON → Serializer → View → Model → Serializer → JSON → Frontend
```

---

# 🔹 Serializer in AUTH SYSTEM (Very Important)

Let’s map this clearly:

| Auth Feature    | Serializer Role             |
| --------------- | --------------------------- |
| Signup          | Validate + create user      |
| Login           | Validate input only         |
| JWT refresh     | Validate token              |
| Change password | Validate old & new password |
| Profile         | Control visible fields      |

---

# 🔹 What serializer DOES NOT do 

It does NOT:
* talk to database directly (unless ModelSerializer)
* handle HTTP requests
* authenticate user

Serializer only **prepares data safely**

---

# 🔹 Important internal methods (conceptual)

You don’t need to memorize all now, but understand purpose:

| Method           | Meaning             |
| ---------------- | ------------------- |
| `is_valid()`     | Run validation      |
| `validated_data` | Clean safe data     |
| `save()`         | Create/update model |
| `create()`       | Create object       |
| `update()`       | Update object       |

---

# 🔹 One-line summary (very important)

> **Serializer is responsible for validating, transforming, and controlling API data between frontend and backend.**

---
---


# TYPES OF SERIALIZERS

Yes, **we *can* create serializers without creating a model** in Django REST Framework.
These are called **non-model serializers** (or plain `Serializer` classes).

---

## 1️⃣ Two types of serializers in DRF

### 1. `ModelSerializer`

* Directly connected to a **Django model**
* Used when data is **stored in database**

### 2. `Serializer` (without model)

* **NOT connected to any database table**
* Used only for **validation + data transformation**

---

## 2️⃣ Yes — Serializer WITHOUT model is allowed

Example:
```python
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
```

 **No model is created here**
 **No database table exists for this serializer**

Yet this serializer is **100% valid and useful**

---

## 3️⃣ WHY do we create serializers without models?

Because **not all data needs to be saved in the database**.

---

## 4️⃣ MOST IMPORTANT USE CASES (Very Common in Auth System)

### 1. LOGIN

Think carefully:

* During **login**, user:

  * enters email
  * enters password
 Do we store this login request in DB?
 NO

We only:
* validate input
* authenticate user
* generate tokens

So we use:
```python
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
```

✔ validates input
✔ does NOT create a table
✔ does NOT save anything

---

### 2. TOKEN REFRESH / LOGOUT / OTP / PASSWORD RESET

Examples where **no model is needed**:

| Feature         | Reason                       |
| --------------- | ---------------------------- |
| JWT refresh     | Just validates token         |
| Logout          | Just blacklists token        |
| Forgot password | Validates email              |
| OTP verify      | Validates OTP                |
| Change password | Validates old & new password |

Example:
```python
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
```

---

## 5️⃣ Serializer ≠ Database

**Very important concept**

A serializer is NOT equal to a model.

| Model                | Serializer               |
| -------------------- | ------------------------ |
| Defines DB schema    | Defines API input/output |
| Stored in database   | Used in request/response |
| Persistent           | Temporary                |
| Mandatory for saving | Optional                 |

 Serializer = **gatekeeper**
 Model = **storage**

---

## 6️⃣ WHAT serializer WITHOUT model actually does

It helps in:

### 🔹 Input Validation

```python
serializer.is_valid()
```

### 🔹 Type checking

* email format
* string length
* required fields

### 🔹 Clean data access

```python
serializer.validated_data
```

---

## 7️⃣ REAL AUTH FLOW (Very Important)

### Login flow:

1. User sends request

```json
{
  "email": "abc@gmail.com",
  "password": "123456"
}
```

2. Serializer:
* validates email
* validates password exists

3. View:
* checks user exists
* checks password
* generates JWT

 No DB write
 No model used
✔ Serializer used

---

## 8️⃣ When SHOULD you NOT create a model?

 When:
* Data is temporary
* Data is only for validation
* Data should not persist

 Examples:
* login
* logout
* verify email
* resend OTP

---

## 9️⃣ When MUST you create a model?

 When:
* Data needs to be stored
* Data must persist

Examples:
* User
* Profile
* Orders
* Messages

---

## 🔟 Simple Rule (Remember this)

> **If data is only coming → validated → used → discarded**
>  Use **Serializer without model**

> **If data is coming → validated → stored**
>  Use **ModelSerializer**

---

## One-line summary

> **Yes, serializers can be created without models.
> They are used when data is required only for validation and processing (like login, password change, token handling) and does not need to be stored in the database.**

---
