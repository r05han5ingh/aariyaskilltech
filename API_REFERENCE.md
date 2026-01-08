# 📡 API REFERENCE - QUICK GUIDE

## Base URL
```
http://localhost:3000/api
```

---

## 🎓 STUDENTS API

### Get All Students
```http
GET /api/students
Query Parameters:
  - status: active|completed|discontinued|suspended
  - course: course name to filter
  - search: search in name, roll number, email
  - limit: number of records (default: 100)
  - offset: pagination offset (default: 0)
```

### Get Student by ID
```http
GET /api/students/:id
```

### Get Student by Roll Number
```http
GET /api/students/roll/:rollNumber
Example: GET /api/students/roll/AST-2026-0001
```

### Create Student
```http
POST /api/students
Content-Type: application/json

Body:
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@email.com",
  "phone": "9876543210",
  "address": "123 Street",
  "city": "Delhi",
  "state": "Delhi",
  "pincode": "110001",
  "course_name": "DCA",
  "enrollment_date": "2026-01-07",
  "course_fee": 12000,
  "status": "active"
}
```

### Update Student
```http
PUT /api/students/:id
Content-Type: application/json

Body: (any fields to update)
{
  "phone": "9999999999",
  "fee_paid": 5000
}
```

### Delete Student
```http
DELETE /api/students/:id
```

### Get Statistics
```http
GET /api/students/stats/overview
```

---

## 📚 COURSES API

### Get All Courses
```http
GET /api/courses
Query Parameters:
  - category: course category to filter
  - active: true|false
```

### Get Course by ID
```http
GET /api/courses/:id
```

### Create Course
```http
POST /api/courses
Content-Type: application/json

Body:
{
  "course_code": "WD-3M",
  "course_name": "Web Development",
  "course_category": "Web Design",
  "duration": "3 months",
  "duration_months": 3,
  "course_fee": 8000,
  "is_active": true
}
```

### Update Course
```http
PUT /api/courses/:id
```

### Delete Course
```http
DELETE /api/courses/:id
```

### Get Course Statistics
```http
GET /api/courses/stats/enrollment
```

---

## 🏆 CERTIFICATES API

### Get All Certificates
```http
GET /api/certificates
Query Parameters:
  - student_id: filter by student
  - issued: true|false
  - limit: number of records
```

### Verify Certificate
```http
GET /api/certificates/verify/:certificateNumber
Example: GET /api/certificates/verify/CERT-2025-0001
```

### Get Certificate by ID
```http
GET /api/certificates/:id
```

### Issue Certificate
```http
POST /api/certificates
Content-Type: application/json

Body:
{
  "student_id": 1,
  "roll_number": "AST-2026-0001",
  "student_name": "John Doe",
  "course_name": "DCA",
  "course_duration": "8 months",
  "issue_date": "2026-01-07",
  "completion_date": "2026-01-01",
  "grade": "A",
  "percentage": 85.50,
  "is_issued": true
}
```

### Update Certificate
```http
PUT /api/certificates/:id
```

### Delete Certificate
```http
DELETE /api/certificates/:id
```

---

## 📝 ENROLLMENTS API

### Get All Enrollments
```http
GET /api/enrollments
Query Parameters:
  - status: pending|approved|rejected|converted
  - limit: number of records
```

### Submit Enrollment
```http
POST /api/enrollments
Content-Type: application/json

Body:
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@email.com",
  "phone": "9876543210",
  "address": "123 Street",
  "city": "Delhi",
  "course": "DCA",
  "batch_time": "morning",
  "start_date": "2026-02-01"
}
```

### Update Enrollment
```http
PUT /api/enrollments/:id
Body: { "status": "approved" }
```

### Approve Enrollment (Creates Student)
```http
POST /api/enrollments/:id/approve
```

---

## 📅 ATTENDANCE API

### Get Attendance
```http
GET /api/attendance
Query Parameters:
  - student_id: filter by student
  - date: specific date (YYYY-MM-DD)
  - month: specific month (YYYY-MM)
```

### Mark Attendance
```http
POST /api/attendance
Content-Type: application/json

Body:
{
  "student_id": 1,
  "roll_number": "AST-2026-0001",
  "attendance_date": "2026-01-07",
  "status": "present",
  "marked_by": "Admin"
}
```

### Get Attendance Summary
```http
GET /api/attendance/summary/:studentId
```

---

## 💰 PAYMENTS API

### Get All Payments
```http
GET /api/payments
Query Parameters:
  - student_id: filter by student
  - date_from: start date (YYYY-MM-DD)
  - date_to: end date (YYYY-MM-DD)
  - limit: number of records
```

### Get Payment by Receipt
```http
GET /api/payments/receipt/:receiptNumber
Example: GET /api/payments/receipt/RCP-2026-00001
```

### Record Payment
```http
POST /api/payments
Content-Type: application/json

Body:
{
  "student_id": 1,
  "roll_number": "AST-2026-0001",
  "amount": 5000,
  "payment_mode": "cash",
  "payment_date": "2026-01-07",
  "payment_type": "installment",
  "collected_by": "Admin"
}
```

### Get Payment Summary
```http
GET /api/payments/summary/overview
Query Parameters:
  - date_from: start date
  - date_to: end date
```

---

## 🔐 ADMIN API

### Admin Login
```http
POST /api/admin/login
Content-Type: application/json

Body:
{
  "username": "admin",
  "password": "admin@123"
}
```

### Create Admin
```http
POST /api/admin/create
Content-Type: application/json

Body:
{
  "username": "newadmin",
  "password": "password123",
  "full_name": "Admin Name",
  "email": "admin@email.com",
  "role": "staff"
}
```

### Get All Admins
```http
GET /api/admin
```

---

## 📊 DASHBOARD API

### Get Dashboard Statistics
```http
GET /api/dashboard/stats
Returns: Complete dashboard overview
```

### Get Revenue Statistics
```http
GET /api/dashboard/revenue
```

### Get Course-wise Enrollment
```http
GET /api/dashboard/course-enrollment
```

### Get Enrollment Trend
```http
GET /api/dashboard/enrollment-trend
Returns: Last 12 months enrollment data
```

---

## 📧 CONTACT API

### Get All Messages
```http
GET /api/contact
Query Parameters:
  - status: new|read|replied|archived
  - limit: number of records
```

### Submit Contact Message
```http
POST /api/contact
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@email.com",
  "phone": "9876543210",
  "subject": "Inquiry",
  "message": "I want to know about courses"
}
```

### Update Message Status
```http
PUT /api/contact/:id
Body: { "status": "read" }
```

---

## 📝 RESPONSE FORMAT

### Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🧪 TESTING WITH POWERSHELL

### GET Request:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/students" -Method GET
```

### POST Request:
```powershell
$body = @{
    first_name = "John"
    last_name = "Doe"
    email = "john@email.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/students" -Method POST -Body $body -ContentType "application/json"
```

### PUT Request:
```powershell
$body = @{ phone = "9999999999" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/students/1" -Method PUT -Body $body -ContentType "application/json"
```

### DELETE Request:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/students/1" -Method DELETE
```

---

## 🔧 TESTING WITH CURL (Alternative)

### GET:
```bash
curl http://localhost:3000/api/students
```

### POST:
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe","email":"john@email.com"}'
```

---

**📚 For detailed setup instructions, see [DATABASE_SETUP.md](DATABASE_SETUP.md)**
