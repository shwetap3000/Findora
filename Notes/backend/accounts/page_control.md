# Big Picture (What we have built)

We currently have:

| Layer                 | We built |
| --------------------- | --------- |
| Django User model     | ✅         |
| Register API          | ✅         |
| Login API             | ✅         |
| JWT token system      | ✅         |
| Protected Profile API | ✅         |

Now React becomes the **client**.

---

## Full Stack Authentication Flow

This is how app will work when it is live:

```
User opens website
↓
React shows Login / Signup
↓
User enters email & password
↓
React sends request to Django
↓
Django returns JWT
↓
React stores JWT
↓
Every future API request sends JWT
↓
Django identifies user from JWT
```

No sessions.
No server memory.
Stateless & scalable.

---

#  Step-by-Step Frontend Flow

## 1️⃣ User signs up

React sends:
```
POST /accounts/register/
```

Body:
```json
{
  "email": "...",
  "username": "...",
  "password": "..."
}
```

Backend:
* Creates user
* Hashes password
* Creates profile

React:
* Shows “Account created”
* Redirects to login

---

## 2️⃣ User logs in

React sends:
```
POST /accounts/login/
```

Backend returns:
```json
{
  "access": "...",
  "refresh": "..."
}
```

React now:
```js
localStorage.setItem("access", token)
localStorage.setItem("refresh", refresh)
```

This is how the browser remembers login.

---

## 3️⃣ User visits dashboard

React sends:
```
GET /accounts/profile/
```

With header:
```
Authorization: Bearer <access_token>
```

Backend:
* Decodes token
* Sets `request.user`
* Returns profile

React:
* Shows username, email, etc

---

## 4️⃣ Any API call (posts, orders, chats…)

React always sends:
```
Authorization: Bearer <token>
```

So Django always knows:
> who is making the request

---

# 🔁 Token Expiry (Very important)

Your access token expires (ex: 5 minutes).

So when Django sends:
```
401 Unauthorized
```

React will:
```
POST /token/refresh/
```

with refresh token → get new access token → retry original request.

User stays logged in without knowing.

This is how Netflix, Amazon, etc do auth.

---

## Logout

React simply deletes tokens:

```js
localStorage.clear()
```

Backend doesn’t need to do anything.

JWT is stateless.

---

## What makes this a **real full-stack project**

You now have:

| Thing       | Why companies love it  |
| ----------- | ---------------------- |
| JWT         | Scalable               |
| No sessions | Cloud friendly         |
| Token auth  | Works with mobile apps |
| DRF + React | Industry standard      |

This is **not a toy project** — this is how SaaS products are built.

---
---


# The Private vs Public pages” in React.
---

## 1️⃣ Concept: Pages vs Routes

* **Page / Route** = React component (UI)
  Example: `/dashboard`, `/login`, `/products`, `/orders`

* **Private page** = user must be logged in
  Example: `/dashboard`, `/profile`, `/orders`

* **Public page** = anyone can visit
  Example: `/login`, `/register`, `/products`

So the “record” of which routes are private or public is **managed in your React app**.

---

## 2️⃣ How to manage it in React

### Step 1: Store authentication state

When user logs in:

```js
// e.g., in context or redux
const [user, setUser] = useState(null)
const [accessToken, setAccessToken] = useState(null)
```

* `accessToken` = stored token (memory / localStorage)
* `user` = optional, can be fetched from `/api/profile/`

---

### Step 2: Create a “PrivateRoute” component

```jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken"); // or context

  if (!accessToken) {
    // User not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  // User logged in → show the page
  return children;
};
```

---

### Step 3: Use it in your routing

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<Router>
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/products" element={<ProductsPage />} />

    {/* Private Routes */}
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      }
    />
    <Route
      path="/orders"
      element={
        <PrivateRoute>
          <OrdersPage />
        </PrivateRoute>
      }
    />
  </Routes>
</Router>
```

---

## 3️⃣ Important notes

1. Even with private routes in frontend, **backend must still verify tokens**.

   * Frontend check is only for UX (redirecting to login page).
   * Backend check (`@permission_classes([IsAuthenticated])`) is **mandatory for security**.

2. You can make a list of routes in an array if you want dynamic mapping:

```js
const publicRoutes = ["/login", "/register", "/products"];
const privateRoutes = ["/dashboard", "/profile", "/orders"];
```

Then use it for `map` or `switch` in your routing system.

---

## Summary

* **Frontend** → manages which routes require login (`PrivateRoute`)
* **Backend** → manages which APIs require login (`IsAuthenticated`)
* Private pages call **protected APIs** using JWT token
* Public pages call **public APIs**

> This is exactly how apps like Instagram, LinkedIn, and Netflix manage private vs public pages.

---
---


### 1️⃣ Frontend controls **private vs public pages**

* React decides which pages require login (private) and which don’t (public).
* Example:

  * Private: `/dashboard`, `/profile`, `/orders`
  * Public: `/login`, `/register`, `/products`

---

### 2️⃣ Backend controls **data access**

* APIs like `/api/profile/` or `/api/orders/` are protected by JWT.
* Backend will **always verify the token** before sending any data.
* Frontend can try to hide the page, but **backend security is the ultimate guard**.

---

### 3️⃣ Access token = proof of login

* Frontend stores the **access token** after login.
* Whenever a private page loads, frontend checks for the token:

  * If token exists → allow page to render and call private APIs.
  * If token missing or invalid → redirect to `/login`.

---

### 4️⃣ Workflow (full flow)

1. User logs in → backend returns **access + refresh tokens**
2. Frontend stores token
3. User navigates to `/dashboard`:

   * React checks token → page allowed
   * React calls `/api/profile/` with token
   * Backend validates token → returns data
4. If token is invalid → backend returns 401 → React redirects to login

---
---
