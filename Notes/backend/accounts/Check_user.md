# Check for Valid logged-in user

## What “checking valid user” actually means

You **do NOT** check users on the frontend.

The frontend never knows:
* Who is valid
* Whose password is correct

That is the backend’s job.

So your React login form does only this:
```
Collect email + password → send to Django → wait for response
```

Django decides if the user is valid.

---

## Step 1 — User submits login form

Your React form collects:

```js
const data = {
  email,
  password
}
```

React sends:
```
POST http://127.0.0.1:8000/accounts/login/
```

With JSON body.

---

## Step 2 — Django checks validity

Inside your Django login view:
```python
user = authenticate(email=email, password=password)
```

This does:
* Finds user by email
* Hashes entered password
* Compares with stored hash
* Returns user OR None

So:

| Result      | Meaning                   |
| ----------- | ------------------------- |
| User object | Valid credentials         |
| None        | Invalid email or password |

You already implemented this.

---

## Step 3 — Django response

If user invalid:
```json
{
  "error": "Invalid credentials"
}
```

If valid:
```json
{
  "access": "...",
  "refresh": "..."
}
```

---

## Step 4 — React decides UI

React checks the response:

```js
if (response.access) {
   // user is valid
} else {
   // invalid credentials
}
```

If valid:
* Save token
* Redirect to dashboard

If invalid:
* Show error message

---

## The key idea

Your login form **never validates user**.

It only asks Django:
> “Are these credentials correct?”

Django replies with:
* Token → yes
* Error → no

That’s the truth source.

---
---

## Where does React send login data?

React does **not** send data to “Django in general”.
It sends data to **one specific API endpoint**.

That endpoint is:
```
POST  /accounts/login/
```

That is your **login API**.

This URL is mapped in:
```
accounts/urls.py
```

to:
```
LoginView
```

And that view is where:
* email
* password
  are received and processed.

---

## Flow inside Django

When React sends:
```
POST /accounts/login/
{
   email: "...",
   password: "..."
}
```

Django does:

1️⃣ `urls.py`

```python
path("login/", LoginView)
```

→ routes request to LoginView

2️⃣ `views.py`

```python
def LoginView(request):
    email = request.data['email']
    password = request.data['password']
```

This is where Django receives the data.

3️⃣ Django calls:

```python
user = authenticate(email=email, password=password)
```

This is where validation happens.

4️⃣ If valid:

```python
RefreshToken.for_user(user)
```

Token is created.

5️⃣ Response is returned to React.

---

## So your login API is literally this
> “This URL accepts email + password and returns token”

---

