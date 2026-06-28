# Backend Database Setup & Verification

## Overview
This guide helps you verify and fix the Memory Game backend database. The frontend is getting 401 errors because the admin user "Henk" doesn't exist in the database. Follow the steps below to ensure all tables are created and the user exists.

---

## Step 1: Check Database Exists

```bash
# In backend folder (webtech-admin)
ls -la var/data.db
# or Windows:
dir var\data.db
```

**Expected**: File exists (SQLite database)
**If missing**: Run Step 2

---

## Step 2: Create/Update Database Schema

Run this to ensure ALL tables exist:

```bash
# In backend folder
php bin/console doctrine:schema:update --force --complete
```

**Output should show**: 
- Creating tables for: Player, Game, PlayerAvatar
- Or "Nothing to update"

**Result**: Database with all required tables ✅

---

## Step 3: Verify All Tables Exist

Check that database has all 3 required tables:

```bash
# View all tables
sqlite3 var/data.db ".tables"
```

**Expected output**:
```
game  player  player_avatar
```

**If missing tables**: Run Step 2 again

---

## Step 4: Create Admin User "Henk"

Create the test admin user for frontend login:

```bash
# Method 1 (Recommended - if command exists)
php bin/console app:create-user Henk henk@admin.local ROLE_ADMIN
# When prompted for password, type: password

# Method 2 (Alternative)
php bin/console make:user
# Username: Henk
# Email: henk@admin.local  
# Make admin? (y/n): y
# Password: password
```

**Result**: User created with ROLE_ADMIN ✅

---

## Step 5: Verify User Exists

Check if user was created:

```bash
# Query database
sqlite3 var/data.db "SELECT username, email, roles FROM player WHERE username='Henk';"
```

**Expected output**:
```
Henk|henk@admin.local|["ROLE_ADMIN"]
```

**If empty**: User doesn't exist, try Step 4 again

---

## Step 6: Check Database Schema

Verify Player table has correct structure:

```bash
# View table structure
sqlite3 var/data.db ".schema player"
```

**Should include columns**:
- id (INTEGER PRIMARY KEY)
- username (VARCHAR)
- email (VARCHAR)
- password (VARCHAR)
- roles (JSON)
- created_at (DATETIME)

---

## Step 7: Start Backend Server

Once database is verified:

```bash
# Start backend server
php -S localhost:8000 -t public

# Should see:
# [Wed Jun 27 22:00:00 2026] PHP 7.4.0 Development Server started...
# [Wed Jun 27 22:00:00 2026] Listening on http://127.0.0.1:8000
```

---

## Step 8: Test Login Endpoint

From another terminal, test if login works:

```bash
# Test login endpoint
curl -X POST http://localhost:8000/memory/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Henk","password":"password"}'
```

**Expected response**: JSON with JWT token
```json
{"token":"eyJ0eXAiOiJKV1QiLCJhbGc..."}
```

**If 401 error**: User doesn't exist in database, go back to Step 4

---

## Troubleshooting

### Issue: "SQLSTATE[HY000]: General error: 1 no such table: player"
**Cause**: Database tables not created
**Fix**: Run `php bin/console doctrine:schema:update --force --complete`

### Issue: "SQLSTATE[HY000]: General error: 7 database disk image is malformed"
**Cause**: Database file corrupted
**Fix**: Delete `var/data.db` and start over with Step 2

### Issue: "User already exists" error
**Cause**: User was already created
**Fix**: That's OK! Just verify with Step 5

### Issue: "Invalid credentials" / 401 error
**Cause**: User doesn't exist or password wrong
**Fix**: Run Step 4 to create user, verify with Step 5

### Issue: "CORS error" in frontend
**Cause**: Backend not running or wrong port
**Fix**: Verify backend running on `http://localhost:8000`

---

## Quick Verification Checklist

Run these commands to verify everything:

```bash
# 1. Database exists?
test -f var/data.db && echo "✅ Database exists" || echo "❌ Database missing"

# 2. All tables exist?
sqlite3 var/data.db ".tables"
# Should show: game  player  player_avatar

# 3. Henk user exists?
sqlite3 var/data.db "SELECT username FROM player WHERE username='Henk';"
# Should show: Henk

# 4. Backend running?
curl http://localhost:8000/frontend
# Should show HTML or date, not error

# 5. Login works?
curl -X POST http://localhost:8000/memory/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Henk","password":"password"}'
# Should return JWT token
```

---

## What Each Component Needs

### Frontend (memory-admin)
- ✅ Needs backend running on port 8000
- ✅ Needs admin user "Henk" in database
- ✅ Needs valid JWT token on login

### Backend (webtech-admin)
- ✅ Needs database with all 3 tables
- ✅ Needs admin user "Henk" created
- ✅ Needs to be running on port 8000

### Database (var/data.db)
- ✅ Needs `player` table with user data
- ✅ Needs `game` table for gameplay records
- ✅ Needs `player_avatar` table for avatars

---

## Complete Setup Flow

```
1. Check database exists
   └─ var/data.db

2. Create/update schema
   └─ All 3 tables created

3. Verify tables
   └─ player, game, player_avatar

4. Create admin user
   └─ Henk / password

5. Verify user exists
   └─ Query returns Henk

6. Start backend
   └─ php -S localhost:8000 -t public

7. Test login
   └─ curl returns JWT token

8. Frontend can login!
   └─ http://localhost:4200 → Henk / password
```

---

## Final Test

Once everything is set up, the frontend login should work:

```
1. Frontend running: http://localhost:4200
2. Backend running: http://localhost:8000
3. Enter: Username = Henk
4. Enter: Password = password
5. Click: Login
6. Result: Dashboard loads ✅
```

---

## Help with Copilot/Claude

You can give Copilot this prompt if you need help:

> "I'm using the Memory Game backend. My frontend is getting 401 errors because the admin user doesn't exist. Please help me:
> 1. Check if database tables are created (player, game, player_avatar)
> 2. Create the admin user 'Henk' with password 'password' and role ROLE_ADMIN
> 3. Verify the user was created in the database
> 4. Give me a test command to verify login works"

---

## Quick Commands Summary

```bash
# Create/update database schema
php bin/console doctrine:schema:update --force --complete

# Create admin user
php bin/console app:create-user Henk henk@admin.local ROLE_ADMIN

# Verify database
sqlite3 var/data.db ".tables"

# Verify user exists
sqlite3 var/data.db "SELECT username FROM player WHERE username='Henk';"

# Start backend
php -S localhost:8000 -t public

# Test login
curl -X POST http://localhost:8000/memory/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Henk","password":"password"}'
```

---

## Status

- **Frontend**: ✅ Ready (Angular dashboard at localhost:4200)
- **Backend Code**: ✅ Ready (Symfony API at localhost:8000)
- **Database**: ⏳ Check with Step 1-3
- **Admin User**: ⏳ Create with Step 4
- **Login**: ⏳ Works after Steps 1-5

**Next**: Follow steps 1-8 in order, test at the end. The 401 error will be fixed! ✅
