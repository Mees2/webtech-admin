# Memory Game Admin Dashboard

## 🎯 Quick Start

### Frontend Setup
```bash
cd memory-admin
npm install
ng serve
# Opens at http://localhost:4200
```

### Backend Setup
See: **BACKEND_DATABASE_SETUP.md** for database initialization

### Login Credentials (after backend setup)
- **Username**: Henk
- **Password**: password

---

## 📁 Files

| File | Purpose |
|------|---------|
| **BACKEND_DATABASE_SETUP.md** | Database setup guide - **START HERE IF GETTING 401 ERRORS** |
| **READMESYMFONY.md** | Backend documentation |
| **memory-admin/README.md** | Frontend detailed setup |

---

## 🚀 The Issue (Getting 401 Errors?)

The frontend login returns 401 because:
1. Backend database tables not created
2. Admin user "Henk" doesn't exist

**Solution**: Follow steps in **BACKEND_DATABASE_SETUP.md**

---

## ✅ What You Have

- ✅ Complete Angular admin dashboard (frontend)
- ✅ 7 reusable components with charts and statistics
- ✅ JWT authentication system
- ✅ Responsive mobile design
- ✅ Setup guide for backend database

---

## 📊 Architecture

```
Frontend (Angular)          Backend (Symfony)
http://localhost:4200  →    http://localhost:8000
  │                            │
  ├─ Login                      ├─ /memory/login
  ├─ Dashboard                  ├─ /admin/aggregate
  ├─ Charts                      ├─ /admin/players
  └─ Player List                └─ /admin/games
```

---

## 🔧 What To Do

1. **Verify frontend** - `ng serve` at localhost:4200 ✅
2. **Fix backend** - Follow BACKEND_DATABASE_SETUP.md
3. **Test login** - Use credentials: Henk / password
4. **Enjoy** - Dashboard with charts and stats!

---

## 📚 Documentation

- **Frontend**: See `memory-admin/README.md`
- **Backend**: See `READMESYMFONY.md`
- **Database Setup**: See `BACKEND_DATABASE_SETUP.md` ← **MOST IMPORTANT**

---


**Status**: Frontend ✅ Ready | Backend ⏳ Setup Needed | Database ⏳ See Guide

