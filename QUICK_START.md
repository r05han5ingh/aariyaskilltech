# 🚀 QUICK START GUIDE

## Complete Database & Backend Setup in 5 Minutes!

---

## ⚡ PREREQUISITES

Before starting, make sure you have:
- ✅ **MySQL** installed and running
- ✅ **Node.js** (v14 or higher) installed
- ✅ **PowerShell** or Command Prompt access

---

## 📝 STEP-BY-STEP SETUP

### 1️⃣ Install Node.js Dependencies

Open PowerShell in your project folder:

```powershell
npm install
```

**Wait for installation to complete (~2 minutes)**

---

### 2️⃣ Configure Database

Open the `.env` file and update:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=aariya_skilltech_academy
PORT=3000
```

**Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password**

---

### 3️⃣ Setup Database

Run the automated setup:

```powershell
npm run db:setup
```

**This will create database, tables, and add sample data**

You should see:
```
✅ Database schema created successfully!
✅ Tables created successfully!
✅ Sample data inserted successfully!
🎉 Database setup completed!
```

---

### 4️⃣ Start the Server

```powershell
npm start
```

You should see:
```
═══════════════════════════════════════════
  🎓 AARIYA SKILLTECH ACADEMY SERVER
═══════════════════════════════════════════
  🚀 Server running on port 3000
  🌐 Local: http://localhost:3000
  📡 API: http://localhost:3000/api
═══════════════════════════════════════════
```

**✅ Your server is now running!**

---

### 5️⃣ Test the API (Optional)

Open a new PowerShell window:

```powershell
node test-api.js
```

This will run automated tests to verify everything is working.

---

## 🌐 ACCESS YOUR SYSTEM

### Website:
```
http://localhost:3000
```

### Admin Panel:
```
http://localhost:3000/admin-dashboard.html

Username: admin
Password: admin@123
```

### API Endpoints:
```
http://localhost:3000/api
```

---

## 🧪 TEST API MANUALLY

### Test in Browser:

Open these URLs in your browser:

1. **API Info:** http://localhost:3000/api
2. **All Students:** http://localhost:3000/api/students
3. **All Courses:** http://localhost:3000/api/courses
4. **Dashboard Stats:** http://localhost:3000/api/dashboard/stats

### Test in PowerShell:

```powershell
# Get all students
Invoke-RestMethod -Uri "http://localhost:3000/api/students"

# Get student by roll number
Invoke-RestMethod -Uri "http://localhost:3000/api/students/roll/AST-2026-0001"

# Get all courses
Invoke-RestMethod -Uri "http://localhost:3000/api/courses"

# Get dashboard statistics
Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/stats"
```

---

## 📊 SAMPLE DATA INCLUDED

Your database comes with 5 sample students:

| Roll Number    | Name          | Course |
|---------------|---------------|--------|
| AST-2026-0001 | Rahul Kumar   | DCA    |
| AST-2026-0002 | Priya Sharma  | Web Development |
| AST-2026-0003 | Amit Patel    | Tally Prime |
| AST-2026-0004 | Anjali Verma  | Photoshop |
| AST-2026-0005 | Vikash Singh  | ADCA   |

And 13 courses ready to use!

---

## 🔧 COMMON ISSUES & SOLUTIONS

### ❌ Error: "Cannot connect to database"

**Solution:**
1. Make sure MySQL is running
2. Check password in `.env` file
3. Try: `npm run db:setup` again

### ❌ Error: "Port 3000 already in use"

**Solution:**
Change port in `.env`:
```env
PORT=3001
```

### ❌ Error: "Module not found"

**Solution:**
```powershell
npm install
```

---

## 📚 NEXT STEPS

1. ✅ **Connect Frontend to Backend**
   - Update your HTML forms to submit to API
   - Fetch data from API endpoints
   - Display data dynamically

2. ✅ **Customize**
   - Add more courses in database
   - Modify student fields
   - Update API endpoints

3. ✅ **Deploy**
   - Choose hosting provider
   - Deploy database and server
   - Update API URLs in frontend

---

## 📖 DOCUMENTATION

- 📘 **Complete Setup Guide:** [DATABASE_SETUP.md](DATABASE_SETUP.md)
- 📗 **API Reference:** [API_REFERENCE.md](API_REFERENCE.md)
- 📙 **Database Schema:** [database_schema.sql](database_schema.sql)

---

## 🎯 WHAT YOU HAVE NOW

✅ **Complete Backend Server** (Node.js + Express)
✅ **MySQL Database** with 9 tables
✅ **REST API** with 40+ endpoints
✅ **Student Management System**
✅ **Course Management**
✅ **Certificate System**
✅ **Enrollment Processing**
✅ **Attendance Tracking**
✅ **Fee Payment System**
✅ **Admin Dashboard API**
✅ **Sample Data** for testing

---

## 💡 TIPS

- **Keep server running** while working on frontend
- **Use Postman** for advanced API testing
- **Check console** for error messages
- **Backup database** regularly
- **Change default password** before going live

---

## 📞 NEED HELP?

Check these files for detailed help:
1. `DATABASE_SETUP.md` - Complete setup instructions
2. `API_REFERENCE.md` - API documentation
3. `README.md` - General project info

---

**🎉 Congratulations! Your database and backend are ready!**

Now you can start connecting your HTML pages to the API and build a fully functional dynamic website.

---

**Created:** January 2026
**Version:** 1.0.0
**Status:** Ready to Use ✨
