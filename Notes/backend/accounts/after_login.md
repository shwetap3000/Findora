## What “successful login” really means

After this API runs:
```python
refresh = RefreshToken.for_user(user)

return Response({
    "refresh": str(refresh),
    "access": str(refresh.access_token)
})
```

Your backend has said:
> “Yes, this user is real. Here is a cryptographic proof (token).
> Use this token in every future request.”

The **server will never remember the user again**.
The **token is the memory**.

---

## Step 1 — Store token in React

In your React login success handler:

```js
const res = await axios.post("http://127.0.0.1:8000/accounts/login/", data);

localStorage.setItem("access", res.data.access);
localStorage.setItem("refresh", res.data.refresh);
```

Now the browser remembers who the user is.

---

## Step 2 — Use token on every private request

Whenever React talks to a **protected Django API**, it must send:

```
Authorization: Bearer <access_token>
```

Example:

```js
const token = localStorage.getItem("access");

await axios.get("http://127.0.0.1:8000/accounts/profile/", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

# Step 3 — Django verifies token automatically

Because you configured JWT in settings:

```python
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    )
}
```

When request hits:
```python
@permission_classes([IsAuthenticated])
def ProfileView(request):
    user = request.user
```

Django will:
1. Read the token
2. Decode it
3. Find the user
4. Put it into `request.user`

This is how Django “knows” who you are.

---

# Step 4 — This enables everything

Now you can build:

| Feature                  | How it works                 |
| ------------------------ | ---------------------------- |
| Profile page             | `/profile` API reads token   |
| Private routes           | React checks if token exists |
| Logout                   | Delete token                 |
| Protected APIs           | `IsAuthenticated`            |
| Chat, orders, notes, etc | Token identifies user        |

---

# Real full-stack auth flow

```
Signup → user created
Login → token issued
React saves token
React sends token
Django verifies token
request.user becomes the logged-in user
```

That’s the entire system.

No sessions. No memory. No server storage.
Only cryptographic proof.

---

Now tell me:
Do you want to build **Profile Page next** or **Private Route system in React**?
