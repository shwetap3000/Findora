## INDEX
1. AbstractUser
2. USERNAME_FIELD
3. user = models.OneToOneField(User, on_delete=models.CASCADE)


# 1. AbstractUser
## What is AbstractUser in Django Model ?

AbstractUser is a **base class provided by Django to create a user model that already knows how authentication works**.


Let’s break this down very clearly and slowly:

First: what AbstractUser actually is
AbstractUser is **not a field** and not a normal model.
It is a **pre-built user blueprint** that already contains:

* username
* email
* password (securely hashed)
* first name / last name
* permissions
* groups
* staff / superuser flags
* login–logout support

Django itself uses this structure to create its default User model.

So when you inherit from AbstractUser, you are saying:
“I want a user model, but I may want to add or slightly customize fields.”

---

Why do we use AbstractUser?

We use AbstractUser when:

* We want authentication (login, logout, permissions)
* We want Django to handle password security
* We want admin panel support
* We want to add extra fields like phone, college, role, etc.
* We want compatibility with JWT, DRF, admin, permissions

AbstractUser gives all of this **without forcing us to build auth from scratch**.

---

How is AbstractUser different from a normal model?

When you create a normal model like:

class Product(models.Model):
    name = models.CharField(...)
    price = models.IntegerField(...)

This model:

* Is only for storing data
* Has no idea about authentication
* Cannot log in
* Cannot have permissions
* Cannot be used with Django auth or JWT

A normal model is just a database table.

AbstractUser, on the other hand:

* Is recognized by Django as “THE user”
* Works with login, logout, authentication backends
* Has password hashing built-in
* Works with permissions and admin
* Works with JWT out of the box

Both create database tables, but **their purpose is completely different**.

---

Simple mental model (very important)

models.Model
→ “This is just data”

AbstractUser
→ “This is a human who can log in and be authenticated”

---

Why not just use models.Model for users?

If you try to do this:

class User(models.Model):
    email = models.EmailField()
    password = models.CharField()

You will break:

* Security (password not hashed)
* Authentication
* Admin login
* JWT integration
* Permission system

That’s why Django enforces using AbstractUser or AbstractBaseUser.

---

AbstractUser vs AbstractBaseUser (quick clarity)

AbstractUser:

* Already built user system
* Easy to use
* Best for 90% of projects

AbstractBaseUser:

* Only password logic
* You build everything
* Advanced and risky for beginners

---

First statement:
“we use AbstractUser to know the actual user (who is authenticated and logged in), not just any random user”

✔️ **Correct**, but with one important refinement:

AbstractUser is used to **define what a “user” is** in your system.
Once a user logs in (via session or JWT), Django can then say:
“This request is coming from THIS specific user.”

So AbstractUser:

* Represents real users of your app
* Allows Django to identify **who is authenticated**
* Makes `request.user` meaningful

Without AbstractUser (or AbstractBaseUser), Django cannot reliably know who is logged in.

---

Second statement:
“it is different from normal models.Model because it keeps record of the user which normal models don’t”

✔️ **Correct**, and here is the clean explanation:

A normal `models.Model`:

* Stores data only
* Has no concept of identity
* Has no concept of login
* Has no concept of authentication

Example:

* Product
* Post
* LostItem

They don’t represent *people who can log in*.

AbstractUser:

* Represents **identity**
* Stores users who can log in
* Integrates with authentication
* Tracks login state
* Works with permissions and security

---

Very important clarification (small but powerful)

AbstractUser does NOT magically track logged-in users all the time.
What it does is:

* Defines the **user table**
* Works with Django auth system
* Allows Django/JWT to say:
  “This token/session belongs to THIS user row in the database”

---

Simple final mental model

models.Model
→ “This is data”

AbstractUser
→ “This is a person with an identity”

---

One-line final confirmation

Yes, AbstractUser is used to represent real authenticated users and their identity, while normal Django models are only for storing data and cannot represent logged-in users or authentication state.

You’re thinking in the right direction — this is exactly the core idea behind Django’s user system.

---

Final clear answer in one line

AbstractUser is a ready-made, authentication-aware user model that Django provides so you can safely and easily create users, handle login, and extend user data—something a normal Django model can never do.


---
---


# 2. USERNAME_FIELD

USERNAME_FIELD is **not a field in the database**.
It is a **setting inside a User model** that tells Django **how to identify a user for authentication**.

## What USERNAME_FIELD means ?
USERNAME_FIELD tells Django:
“This is the field that uniquely identifies a user when logging in.”

In simple words:

* It tells Django **what value the user will type to log in**
* It tells Django **how to recognize one user from another**

---

Why does Django need USERNAME_FIELD?

During login or JWT token generation, Django must answer:
“Which user is this?”

To answer that, it needs:

* One unique identifier
* One guaranteed field

USERNAME_FIELD provides that identifier.

---

Default behavior (important)

In Django’s default User model:

* USERNAME_FIELD = "username"

That’s why:

* You log in using username by default

---

Using email instead of username

If you want users to log in using email, you do:

class User(AbstractUser):
    USERNAME_FIELD = "email"

Now Django understands:

* Email is the identity
* Username is no longer required (or can be optional)

---

Very important rule

USERNAME_FIELD must:

* Be unique
* Never be null
* Always identify exactly one user

Common valid choices:

* email
* phone number
* username

Invalid choices:

* first_name
* last_name
* age

---

How USERNAME_FIELD works with JWT

When JWT is used:

1. User logs in (email + password)
2. Django authenticates using USERNAME_FIELD
3. JWT token is created for that user
4. Token stores user_id internally
5. On every request, token → user lookup happens

So JWT doesn’t care what USERNAME_FIELD is — Django does.

---

What USERNAME_FIELD does NOT do

It does NOT:

* Create a database column
* Automatically validate uniqueness
* Replace authentication logic by itself

It only tells Django **which field to use**.

---

One-line summary

USERNAME_FIELD tells Django which field uniquely identifies a user during authentication and login, and it must point to a unique field like email or username.


---
---


# 3. user = models.OneToOneField(User, on_delete=models.CASCADE)

To use a OneToOneField, you must have two different models.
A one-to-one relationship only makes sense when one model is linked to another model.

First, what this line is doing (big picture):

This line creates a **relationship between two models**:

* Profile model
* User model

It means:
“Each Profile belongs to exactly ONE User, and each User has exactly ONE Profile.”

That’s why it’s called **OneToOneField**.

---

What is OneToOneField?

OneToOneField means:

* One object in this model ↔ one object in another model
* No duplicates allowed on either side

In your case:

* One User → one Profile
* One Profile → one User

So this is perfect for:

* User + Profile
* Account + AccountDetails
* Employee + EmployeeID

---

Why not ForeignKey?

If you used ForeignKey instead:

user = models.ForeignKey(User, on_delete=models.CASCADE)

Then:

* One User could have MANY Profiles ❌
* Which makes no sense for user profiles

So:

* ForeignKey = many-to-one
* OneToOneField = one-to-one

---

What does CASCADE mean?

on_delete=models.CASCADE means:
“When the referenced User is deleted, delete this Profile too.”

So:

* Delete User → Profile is automatically deleted
* Prevents orphan data

Without CASCADE:

* Profile might exist without a User
* That’s bad data

---

Why is on_delete required?

Django asks:
“What should happen if the related object is deleted?”

Possible answers:

* CASCADE → delete dependent object
* SET_NULL → set field to null
* PROTECT → block deletion
* DO_NOTHING → dangerous (leaves broken references)

CASCADE is the **safest choice** for Profile.

---

How Django stores this internally

Django adds:

* A `user_id` column in Profile table
* This column is unique
* It points to the User table’s primary key

So internally:
Profile.user_id → User.id

---

How this behaves in code

If you have:

profile.user
→ gives the User object

user.profile
→ gives the Profile object (reverse relation)

---

Real-life analogy (very important)

User = Bank Account
Profile = Account Holder Details

If the account is deleted, the details should disappear too → CASCADE.

---

One-line summary

OneToOneField creates a strict one-to-one relationship between two models, and CASCADE ensures that when the parent object (User) is deleted, the dependent object (Profile) is automatically deleted to keep data consistent.

If you want, next I can explain:

* Difference between OneToOneField, ForeignKey, and ManyToManyField
* How Django creates reverse relations
* Why Profile is not merged into User
