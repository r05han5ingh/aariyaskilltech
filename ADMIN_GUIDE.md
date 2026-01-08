# ADMIN PANEL - USAGE GUIDE

## 🔐 Admin Panel Access

Your website now has a complete Admin Panel for managing students!

### Access URL:
**Admin Login:** Open `admin-login.html`

### Default Credentials:
- **Username:** `admin`
- **Password:** `admin@123`

---

## 📊 Admin Panel Features

### 1. Dashboard
- View total students count
- Active students statistics
- New admissions today
- Recent students list
- Quick action buttons

### 2. Students Management
- View all enrolled students in a table
- Search students by name, roll number, or course
- **View** student details (👁️ eye icon)
- **Print** registration form (🖨️ print icon)
- **Edit** student information (✏️ edit icon)
- **Delete** students (🗑️ trash icon)

### 3. Add New Student
Complete form to add student with:
- **Personal Information:** Name, Email, Phone, DOB, Gender
- **Address:** Full address, City, State, PIN code
- **Academic Info:** Roll Number (auto-generate available), Course, Batch, Enrollment Date, Qualification, Status
- **Additional Notes:** Optional remarks
- **After saving:** System will prompt you to print the registration form

### 4. Print Registration Form (NEW! 🎉)
**Automatic Print Prompt:**
- After adding a new student, you'll get a confirmation dialog
- Click "OK" to immediately print the registration form
- Click "Cancel" to skip printing

**Manual Printing:**
- Click the purple **Print** button (🖨️) next to any student in the students list
- Opens a professional A4-sized registration form
- Form includes:
  - Student photo placeholder
  - Complete personal details
  - Course information
  - Important instructions
  - Signature sections (Student, Parent, Authorized)
  - Institute branding and contact details

**Print Format:**
- Standard A4 size (210mm × 297mm)
- Professional layout ready for printing
- Single page document
- Can be saved as PDF using browser's print dialog

### 4. Roll Number Auto-Generation
- Click "Auto Generate" button to create unique roll number
- Format: `AST-YYYY-XXXX` (e.g., AST-2026-0001)
- System automatically increments numbers

### 5. Student Verification Integration
- All students added through Admin Panel automatically appear in the Verify Admission page
- Students can verify their admission using their roll number
- Real-time data synchronization

---

## 🎯 How to Use

### Adding a Student:
1. Login to Admin Panel
2. Click "Add Student" from sidebar or dashboard
3. Fill in all required fields (marked with *)
4. Use "Auto Generate" for Roll Number (or enter manually)
5. Select Course, Batch, and Status
6. Click "Save Student"

### Verifying Student:
1. Student visits "Verify Admission" page
2. Enters their Roll Number (e.g., AST-2026-0001)
3. Clicks "Verify Now"
4. All details are displayed if roll number exists

### Managing Students:
- **View:** Click eye icon to see quick details
- **Edit:** Click edit icon to modify information
- **Delete:** Click delete icon (confirmation required)
- **Search:** Use search box to find specific students

---

## 💾 Data Management

### Export Data:
- Click "Export Data" in Dashboard or Settings
- Downloads JSON file with all student data
- Use for backup or migration

### Import Data:
- Click "Import Data" in Settings
- Select JSON file (previously exported)
- All data will be restored

### Clear All Data:
- Use "Clear All Data" button in Dashboard
- ⚠️ **Warning:** This deletes everything permanently!

---

## 🔄 Data Storage

- All student data is stored in browser's **localStorage**
- Data persists even after closing browser
- No backend server needed
- Each browser stores its own data

**Important:** 
- Clearing browser data will delete all students
- Always export data regularly for backup
- For production, consider moving to a backend database

---

## 📋 Available Courses in System

1. Python Programming
2. Java Programming
3. C/C++ Programming
4. Full Stack Web Development
5. React.js Development
6. Node.js & Backend
7. Data Science & AI
8. Database Management
9. Machine Learning
10. UI/UX Design
11. Graphic Design
12. Digital Marketing
13. Cloud Computing
14. Cyber Security

---

## 🎨 Student Status Options

- **Active:** Currently enrolled and attending
- **Inactive:** Not currently attending
- **Completed:** Finished the course
- **Pending:** Enrollment pending

---

## 🔧 Settings

### Change Password:
1. Go to Settings section
2. Enter current password: `admin@123`
3. Enter new password (min 6 characters)
4. Confirm new password
5. Click "Update Password"

---

## 📱 Responsive Design

Admin Panel works on:
- Desktop computers
- Laptops
- Tablets
- Mobile phones (with adapted layout)

---

## 🚀 Sample Students Included

The system comes with 3 sample students:

1. **AST-2026-0001** - Rahul Kumar (Full Stack Web Development)
2. **AST-2026-0002** - Priya Sharma (Data Science & AI)
3. **AST-2026-0003** - Amit Patel (Python Programming)

You can test the verification system with these roll numbers.

---

## 🔒 Security Notes

**For Production Use:**
1. Change default admin password immediately
2. Use backend authentication (not just localStorage)
3. Implement proper session management
4. Add role-based access control
5. Use HTTPS for secure connection
6. Implement rate limiting for login attempts
7. Add 2-factor authentication

---

## 💡 Tips

1. **Regular Backups:** Export data weekly
2. **Roll Numbers:** Use auto-generate to avoid duplicates
3. **Search Function:** Very useful when you have many students
4. **Status Updates:** Keep student status current
5. **Notes Field:** Use for important student information

---

## 🆘 Troubleshooting

### Can't login?
- Check username: `admin` (lowercase)
- Check password: `admin@123`
- Clear browser cache and try again

### Students not showing in verification?
- Make sure you saved the student in Admin Panel
- Check roll number format (uppercase)
- Refresh the verification page

### Data disappeared?
- Check if browser data was cleared
- Restore from exported backup file
- Sample data will reload automatically

---

## 📞 Admin Panel Navigation

**Pages:**
- `admin-login.html` - Login page
- `admin-dashboard.html` - Main admin interface

**Quick Access:**
- Small admin icon (🛡️) in main website navigation
- Direct URL access

---

**Admin Panel Ready to Use!** 🎉

Start adding your students and they'll automatically appear in the verification system!

---

*Created: January 7, 2026*
*For: Aariya SkillTech Academy*
*Managed by: Roshan Singh*