PHASE 1: USER EXISTS
- Custom User model
- Migrations
- Admin panel
- Superuser

PHASE 2: USER ENTERS SYSTEM
- Register API
- Login API
- Password check

PHASE 3: SERVER REMEMBERS USER
- JWT (access + refresh)

PHASE 4: SERVER PROTECTS DATA
- Permissions
- IsAuthenticated
- Role-based access

PHASE 5: FRONTEND INTEGRATION
- Store token
- Attach token
- Change UI



PHASE 0 → What is authentication?
PHASE 1 → Who is the user?
PHASE 2 → Can admin manage users?
PHASE 3 → Can users register & login?
PHASE 4 → How does server remember users?
PHASE 5 → Protect APIs
PHASE 6 → Frontend integration


WHY DEFAULT USER IS NOT ENOUGH

Django default user:
username
email optional

But modern apps use:
email as login
no username

So we create custom user model.




