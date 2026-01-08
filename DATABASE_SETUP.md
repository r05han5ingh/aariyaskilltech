# 🎓 AARIYA SKILLTECH ACADEMY - DATABASE SETUP GUIDE

## 📋 Complete Database and Backend System

This guide will help you set up the complete database and backend server for your academy website.

---

## 🗂️ FILES CREATED

### Backend Files:
- ✅ `package.json` - Node.js dependencies
- ✅ `server.js` - Main Express server
- ✅ `.env` - Environment configuration
- ✅ `.gitignore` - Git ignore rules

### Database Files:
- ✅ `database_schema.sql` - Complete database structure with tables
- ✅ `db/config.js` - Database connection configuration
- ✅ `db/setup.js` - Automated database setup script

### API Routes:
- ✅ `routes/students.js` - Student management API
- ✅ `routes/courses.js` - Course management API
- ✅ `routes/certificates.js` - Certificate management API
- ✅ `routes/enrollments.js` - Enrollment management API
- ✅ `routes/attendance.js` - Attendance tracking API
- ✅ `routes/payments.js` - Fee payment management API
- ✅ `routes/admin.js` - Admin authentication API
- ✅ `routes/dashboard.js` - Dashboard statistics API
- ✅ `routes/contact.js` - Contact messages API

---

## 📊 DATABASE STRUCTURE

### Tables Created:
1. **students** - Student information and enrollment details
2. **courses** - Course catalog and information
3. **certificates** - Issued certificates with verification
4. **enrollments** - New enrollment applications
5. **attendance** - Student attendance records
6. **fee_payments** - Payment transactions and receipts
7. **admins** - Admin user accounts
8. **contact_messages** - Contact form submissions
9. **notifications** - System notifications

---

## 🚀 INSTALLATION STEPS

### Step 1: Install MySQL Database

#### For Windows:
1. Download MySQL from: https://dev.mysql.com/downloads/installer/
2. Install MySQL Server and MySQL Workbench
3. During installation, set root password (remember this!)
4. Start MySQL service

#### Verify MySQL Installation:
```powershell
mysql --version
```

### Step 2: Install Node.js

1. Download from: https://nodejs.org/ (LTS version recommended)
2. Install Node.js
3. Verify installation:
```powershell
node --version
npm --version
```

### Step 3: Install Dependencies

Open PowerShell in your project folder and run:

```powershell
npm install
```

This will install all required packages:
- express
- mysql2
- dotenv
- cors
- body-parser
- bcryptjs
- jsonwebtoken
- multer
- express-validator
- nodemailer

### Step 4: Configure Database

1. Open `.env` file
2. Update database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=aariya_skilltech_academy
PORT=3000
```

### Step 5: Setup Database

Run the automated database setup:

```powershell
npm run db:setup
```

This will:
- ✅ Create database: `aariya_skilltech_academy`
- ✅ Create all 9 tables
- ✅ Insert sample data (students, courses, etc.)
- ✅ Create database views

---

## 🎯 START THE SERVER

### Start Server:
```powershell
npm start
```

### Start in Development Mode (with auto-reload):
```powershell
npm run dev
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

---

## 🌐 API ENDPOINTS

### Base URL: `http://localhost:3000/api`

### Students API (`/api/students`)
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/roll/:rollNumber` - Get student by roll number
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/stats/overview` - Get student statistics

### Courses API (`/api/courses`)
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/courses/stats/enrollment` - Get course statistics

### Certificates API (`/api/certificates`)
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get certificate by ID
- `GET /api/certificates/verify/:certificateNumber` - Verify certificate
- `POST /api/certificates` - Issue new certificate
- `PUT /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate

### Enrollments API (`/api/enrollments`)
- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Submit new enrollment
- `PUT /api/enrollments/:id` - Update enrollment
- `POST /api/enrollments/:id/approve` - Approve and convert to student

### Attendance API (`/api/attendance`)
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/summary/:studentId` - Get attendance summary

### Payments API (`/api/payments`)
- `GET /api/payments` - Get all payments
- `GET /api/payments/receipt/:receiptNumber` - Get payment by receipt
- `POST /api/payments` - Record new payment
- `GET /api/payments/summary/overview` - Get payment summary

### Dashboard API (`/api/dashboard`)
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/revenue` - Get revenue statistics
- `GET /api/dashboard/course-enrollment` - Get course-wise enrollment
- `GET /api/dashboard/enrollment-trend` - Get monthly enrollment trend

### Admin API (`/api/admin`)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/create` - Create new admin
- `GET /api/admin` - Get all admins

### Contact API (`/api/contact`)
- `GET /api/contact` - Get all messages
- `POST /api/contact` - Submit contact message
- `PUT /api/contact/:id` - Update message status

---

## 🧪 TESTING THE API

### Using PowerShell:

#### Test API Connection:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api" -Method GET
```

#### Get All Students:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/students" -Method GET
```

#### Get Student by Roll Number:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/students/roll/AST-2026-0001" -Method GET
```

#### Create New Student:
```powershell
$body = @{
    first_name = "John"
    last_name = "Doe"
    email = "john.doe@email.com"
    phone = "9876543215"
    course_name = "DCA"
    enrollment_date = "2026-01-07"
    status = "active"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/students" -Method POST -Body $body -ContentType "application/json"
```

---

## 🔐 ADMIN CREDENTIALS

### Default Admin Login:
- **Username:** `admin`
- **Password:** `admin@123`

**⚠️ IMPORTANT:** Change this password in production!

---

## 📝 SAMPLE DATA INCLUDED

The database comes with sample data:

### Sample Students:
- AST-2026-0001 - Rahul Kumar
- AST-2026-0002 - Priya Sharma
- AST-2026-0003 - Amit Patel
- AST-2026-0004 - Anjali Verma
- AST-2026-0005 - Vikash Singh

### Sample Courses:
- Office Automation with Advance (3 months)
- Tally ERP 9 with GST (3 months)
- Web Development (3 months)
- DCA (6-8 months)
- ADCA (12 months)
- And 8 more courses...

---

## 🔗 CONNECTING FRONTEND TO BACKEND

### Update your JavaScript files to use the API:

#### Example: Fetch Students
```javascript
// In your admin.js or script.js
async function loadStudents() {
    try {
        const response = await fetch('http://localhost:3000/api/students');
        const data = await response.json();
        
        if (data.success) {
            console.log('Students:', data.students);
            // Display students in your UI
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

#### Example: Submit Enrollment
```javascript
// In your enrollment form
async function submitEnrollment(formData) {
    try {
        const response = await fetch('http://localhost:3000/api/enrollments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Enrollment submitted! Application No: ' + data.applicationNumber);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 🛠️ TROUBLESHOOTING

### Issue: Database Connection Failed

**Solution:**
1. Make sure MySQL service is running
2. Check username/password in `.env` file
3. Verify database exists: `npm run db:setup`

### Issue: Port 3000 Already in Use

**Solution:**
Change port in `.env` file:
```env
PORT=3001
```

### Issue: Module Not Found

**Solution:**
Reinstall dependencies:
```powershell
Remove-Item node_modules -Recurse -Force
npm install
```

---

## 📚 MYSQL QUERIES

### Direct Database Access:

```sql
-- Login to MySQL
mysql -u root -p

-- Use database
USE aariya_skilltech_academy;

-- View all tables
SHOW TABLES;

-- View students
SELECT * FROM students;

-- View courses
SELECT * FROM courses;

-- View certificates
SELECT * FROM certificates;

-- Get student count by course
SELECT course_name, COUNT(*) as total 
FROM students 
GROUP BY course_name;

-- Get revenue statistics
SELECT 
    SUM(course_fee) as total_fees,
    SUM(fee_paid) as collected,
    SUM(fee_remaining) as pending
FROM students;
```

---

## 🔒 SECURITY RECOMMENDATIONS

### For Production:

1. **Change Admin Password**
2. **Use Strong JWT Secret** (in `.env`)
3. **Enable HTTPS**
4. **Add Rate Limiting**
5. **Implement Input Validation**
6. **Use Prepared Statements** (already implemented)
7. **Regular Database Backups**

---

## 📱 NEXT STEPS

1. ✅ Test all API endpoints
2. ✅ Connect your HTML forms to API
3. ✅ Update admin dashboard to fetch from database
4. ✅ Implement certificate verification on website
5. ✅ Add file upload for student photos
6. ✅ Set up email notifications
7. ✅ Deploy to production server

---

## 🌟 FEATURES INCLUDED

✅ Complete REST API
✅ MySQL Database with 9 tables
✅ Student Management System
✅ Course Management
✅ Certificate Issuance & Verification
✅ Enrollment Processing
✅ Attendance Tracking
✅ Fee Payment Management
✅ Admin Dashboard Statistics
✅ Contact Form Management
✅ Automatic Roll Number Generation
✅ Automatic Certificate Number Generation
✅ Automatic Receipt Number Generation
✅ Revenue Tracking
✅ Course-wise Analytics

---

## 💡 SUPPORT

If you need help:
1. Check error messages in PowerShell
2. Verify database connection
3. Test API endpoints one by one
4. Check browser console for errors

---

## 📞 CONTACT

For technical support or queries:
- Email: admin@aariyaskilltech.com
- Phone: +91 XXXXX XXXXX

---

**Created: January 2026**
**Version: 1.0.0**
**Status: Production Ready** ✨
