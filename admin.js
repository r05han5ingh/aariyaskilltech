// ===================================
// ADMIN PANEL - AUTHENTICATION & FUNCTIONALITY
// ===================================

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('admin-dashboard.html') && !isLoggedIn) {
        window.location.href = 'admin-login.html';
    } else if (currentPage.includes('admin-login.html') && isLoggedIn) {
        window.location.href = 'admin-dashboard.html';
    }
}

// Run auth check on page load
checkAuth();

// ===================================
// LOGIN FORM
// ===================================
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Default credentials (In production, use secure backend authentication)
        if (username === 'admin' && password === 'admin@123') {
            localStorage.setItem('adminLoggedIn', 'true');
            if (rememberMe) {
                localStorage.setItem('rememberAdmin', 'true');
            }
            window.location.href = 'admin-dashboard.html';
        } else {
            document.getElementById('errorMessage').style.display = 'block';
            setTimeout(() => {
                document.getElementById('errorMessage').style.display = 'none';
            }, 3000);
        }
    });
}

// ===================================
// LOGOUT
// ===================================
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    });
}

// ===================================
// SIDEBAR NAVIGATION
// ===================================
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.admin-section');

function switchSection(sectionId) {
    // Remove active class from all menu items and sections
    menuItems.forEach(item => item.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    // Add active class to selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to corresponding menu item
    const menuItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (menuItem) {
        menuItem.classList.add('active');
    }
    
    // Reset form when switching to add-student
    if (sectionId === 'add-student') {
        const form = document.getElementById('addStudentForm');
        const rollNoField = document.getElementById('studentRollNo');
        const titleElement = document.getElementById('addStudentTitle');
        
        if (form) form.reset();
        if (rollNoField) rollNoField.readOnly = false;
        if (titleElement) titleElement.textContent = 'Add New Student';
        
        // Set today's date as default
        const dateField = document.getElementById('studentEnrollmentDate');
        if (dateField) dateField.value = new Date().toISOString().split('T')[0];
    }
    
    // Refresh data if needed
    if (sectionId === 'students') {
        loadStudentsTable();
    } else if (sectionId === 'dashboard') {
        loadDashboard();
    } else if (sectionId === 'certificates') {
        loadCertificatesTable();
    } else if (sectionId === 'enrollment-requests') {
        loadEnrollmentRequestsTable();
    }
}

// Make switchSection globally available
window.switchSection = switchSection;

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        switchSection(sectionId);
        
        // Load signature settings when settings section is opened
        if (sectionId === 'settings') {
            loadSignatureSettings();
        }
    });
});

// ===================================
// STUDENT DATA MANAGEMENT
// ===================================

// Initialize localStorage with sample data if empty
function initializeData() {
    if (!localStorage.getItem('students')) {
        const sampleStudents = {
            'AST-2026-0001': {
                rollNumber: 'AST-2026-0001',
                firstName: 'Rahul',
                lastName: 'Kumar',
                name: 'Rahul Kumar',
                email: 'rahul@example.com',
                phone: '9876543210',
                dob: '2000-05-15',
                gender: 'Male',
                address: 'FCA- 2442, 22 Feet Road, Block-B, SGM Nagar, Faridabad (HR), Zip: 121001',
                city: 'Delhi',
                state: 'Delhi',
                pincode: '110001',
                course: 'Full Stack Web Development',
                batch: 'Morning Batch (9 AM - 12 PM)',
                enrollmentDate: 'January 15, 2026',
                qualification: "Bachelor's Degree",
                status: 'Active',
                notes: '',
                addedDate: new Date().toISOString()
            },
            'AST-2026-0002': {
                rollNumber: 'AST-2026-0002',
                firstName: 'Priya',
                lastName: 'Sharma',
                name: 'Priya Sharma',
                email: 'priya@example.com',
                phone: '9876543211',
                dob: '2001-08-20',
                gender: 'Female',
                address: '456 Park Avenue',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                course: 'Data Science & AI',
                batch: 'Evening Batch (5 PM - 9 PM)',
                enrollmentDate: 'January 10, 2026',
                qualification: "Bachelor's Degree",
                status: 'Active',
                notes: '',
                addedDate: new Date().toISOString()
            },
            'AST-2026-0003': {
                rollNumber: 'AST-2026-0003',
                firstName: 'Amit',
                lastName: 'Patel',
                name: 'Amit Patel',
                email: 'amit@example.com',
                phone: '9876543212',
                dob: '1999-12-10',
                gender: 'Male',
                address: '789 Lake Road',
                city: 'Ahmedabad',
                state: 'Gujarat',
                pincode: '380001',
                course: 'DCA (6-8month)',
                batch: 'Afternoon Batch (1 PM - 4 PM)',
                enrollmentDate: 'January 5, 2026',
                qualification: '12th Standard',
                status: 'Active',
                notes: '',
                addedDate: new Date().toISOString()
            }
        };
        localStorage.setItem('students', JSON.stringify(sampleStudents));
    }
}

// Get all students
function getAllStudents() {
    const students = localStorage.getItem('students');
    return students ? JSON.parse(students) : {};
}

// Save student
function saveStudent(studentData) {
    const students = getAllStudents();
    students[studentData.rollNumber] = studentData;
    localStorage.setItem('students', JSON.stringify(students));
}

// Delete student
function deleteStudent(rollNumber) {
    const students = getAllStudents();
    delete students[rollNumber];
    localStorage.setItem('students', JSON.stringify(students));
}

// ===================================
// GENERATE ROLL NUMBER
// ===================================
function generateRollNumber() {
    const year = new Date().getFullYear();
    const students = getAllStudents();
    const existingNumbers = Object.keys(students).map(roll => {
        const match = roll.match(/AST-\d{4}-(\d{4})/);
        return match ? parseInt(match[1]) : 0;
    });
    
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    const rollNumber = `AST-${year}-${String(nextNumber).padStart(4, '0')}`;
    
    document.getElementById('studentRollNo').value = rollNumber;
    showToast('Roll number generated: ' + rollNumber);
}

window.generateRollNumber = generateRollNumber;

// ===================================
// ADD STUDENT FORM
// ===================================
const addStudentForm = document.getElementById('addStudentForm');
if (addStudentForm) {
    // Set today's date as default enrollment date
    document.getElementById('studentEnrollmentDate').value = new Date().toISOString().split('T')[0];
    
    addStudentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const studentData = {
            roll_number: document.getElementById('studentRollNo').value.toUpperCase(),
            first_name: document.getElementById('studentFirstName').value,
            last_name: document.getElementById('studentLastName').value || '',
            email: document.getElementById('studentEmail').value,
            phone: document.getElementById('studentPhone').value,
            date_of_birth: document.getElementById('studentDOB').value,
            gender: document.getElementById('studentGender').value,
            address: document.getElementById('studentAddress').value,
            city: document.getElementById('studentCity').value,
            state: document.getElementById('studentState').value,
            pincode: document.getElementById('studentPincode').value,
            course_name: document.getElementById('studentCourse').value,
            batch_time: document.getElementById('studentBatch').value,
            enrollment_date: document.getElementById('studentEnrollmentDate').value,
            qualification: document.getElementById('studentQualification').value,
            status: document.getElementById('studentStatus').value,
            notes: document.getElementById('studentNotes').value || ''
        };
        
        try {
            // Try API first
            const response = await fetch('http://localhost:3001/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showToast(`Student added successfully! Roll Number: ${result.rollNumber}`);
                
                // Ask user if they want to print registration form
                if (confirm(`Student ${studentData.first_name} ${studentData.last_name} added successfully!\n\nWould you like to print the registration form now?`)) {
                    printRegistrationForm(result.rollNumber);
                }
                
                // Reset form
                addStudentForm.reset();
                document.getElementById('studentEnrollmentDate').value = new Date().toISOString().split('T')[0];
                
                // Switch to students list
                setTimeout(() => {
                    switchSection('students');
                }, 1500);
            } else {
                throw new Error(result.message || 'Failed to add student');
            }
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to localStorage
            const localStudentData = {
                rollNumber: studentData.roll_number,
                firstName: studentData.first_name,
                lastName: studentData.last_name,
                name: `${studentData.first_name} ${studentData.last_name}`.trim(),
                email: studentData.email,
                phone: studentData.phone,
                dob: studentData.date_of_birth,
                gender: studentData.gender,
                address: studentData.address,
                city: studentData.city,
                state: studentData.state,
                pincode: studentData.pincode,
                course: studentData.course_name,
                batch: studentData.batch_time,
                enrollmentDate: new Date(studentData.enrollment_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                qualification: studentData.qualification,
                status: studentData.status,
                notes: studentData.notes,
                addedDate: new Date().toISOString()
            };
            
            // Check if roll number already exists
            const students = getAllStudents();
            const rollNoField = document.getElementById('studentRollNo');
            const isEditing = rollNoField.readOnly;
            
            if (students[localStudentData.rollNumber] && !isEditing) {
                showToast('Roll number already exists! Please use a different roll number.', 'error');
                return;
            }
            
            // Save student to localStorage
            saveStudent(localStudentData);
            
            // Reset readonly state for next add
            rollNoField.readOnly = false;
            
            const message = isEditing ? 'Student updated successfully!' : 'Student added successfully! (Saved locally - server offline)';
            showToast(message);
            
            // Ask user if they want to print registration form (only for new students)
            if (!isEditing && confirm(`Student ${localStudentData.name} added successfully!\n\nWould you like to print the registration form now?`)) {
                printRegistrationForm(localStudentData.rollNumber);
            }
            
            // Reset form
            addStudentForm.reset();
            document.getElementById('studentEnrollmentDate').value = new Date().toISOString().split('T')[0];
            
            // Switch to students list
            setTimeout(() => {
                switchSection('students');
            }, 1500);
        }
    });
}

// ===================================
// LOAD DASHBOARD
// ===================================
function loadDashboard() {
    initializeData();
    initializeCourses();
    const students = getAllStudents();
    const studentsArray = Object.values(students);
    const courses = getAllCourses();
    
    // Update stats
    document.getElementById('totalStudents').textContent = studentsArray.length;
    document.getElementById('activeStudents').textContent = studentsArray.filter(s => s.status === 'Active').length;
    document.getElementById('totalCourses').textContent = courses.length;
    
    // Count new today
    const today = new Date().toDateString();
    const newToday = studentsArray.filter(s => new Date(s.addedDate).toDateString() === today).length;
    document.getElementById('newToday').textContent = newToday;
    
    // Load recent students
    const recentList = document.getElementById('recentStudentsList');
    if (recentList) {
        const recentStudents = studentsArray.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate)).slice(0, 5);
        
        if (recentStudents.length === 0) {
            recentList.innerHTML = '<div class="no-data"><i class="fas fa-user-graduate"></i><p>No students added yet</p></div>';
        } else {
            recentList.innerHTML = recentStudents.map(student => `
                <div class="recent-item">
                    <div class="recent-info">
                        <h4>${student.name}</h4>
                        <p>${student.rollNumber} • ${student.course}</p>
                    </div>
                    <span class="recent-badge">${student.status}</span>
                </div>
            `).join('');
        }
    }
}

// ===================================
// LOAD STUDENTS TABLE
// ===================================
function loadStudentsTable(searchTerm = '') {
    initializeData();
    const students = getAllStudents();
    const studentsArray = Object.values(students);
    const tbody = document.getElementById('studentsTableBody');
    
    if (!tbody) return;
    
    // Filter by search term
    const filteredStudents = searchTerm
        ? studentsArray.filter(s => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.course.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : studentsArray;
    
    if (filteredStudents.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data"><i class="fas fa-user-graduate"></i><h3>No students found</h3><p>Add your first student to get started</p></td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredStudents.map(student => `
        <tr>
            <td><strong>${student.rollNumber}</strong></td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.batch}</td>
            <td>${student.phone}</td>
            <td><span class="status-badge status-${student.status.toLowerCase()}">${student.status}</span></td>
            <td>
                <button class="action-btn btn-view" onclick="viewStudent('${student.rollNumber}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn btn-success" onclick="printRegistrationForm('${student.rollNumber}')" title="Print Form">
                    <i class="fas fa-print"></i>
                </button>
                <button class="action-btn btn-edit" onclick="editStudent('${student.rollNumber}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-delete" onclick="openDeleteModal('${student.rollNumber}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Search functionality
const searchStudent = document.getElementById('searchStudent');
if (searchStudent) {
    searchStudent.addEventListener('input', function() {
        loadStudentsTable(this.value);
    });
}

// ===================================
// VIEW STUDENT
// ===================================
function viewStudent(rollNumber) {
    const students = getAllStudents();
    const student = students[rollNumber];
    
    if (student) {
        alert(`Student Details:\n\nRoll Number: ${student.rollNumber}\nName: ${student.name}\nEmail: ${student.email}\nPhone: ${student.phone}\nCourse: ${student.course}\nBatch: ${student.batch}\nStatus: ${student.status}\n\nEnrollment Date: ${student.enrollmentDate}`);
    }
}

window.viewStudent = viewStudent;

// ===================================
// EDIT STUDENT
// ===================================
function editStudent(rollNumber) {
    const students = getAllStudents();
    const student = students[rollNumber];
    
    if (student) {
        // Switch to add student section
        switchSection('add-student');
        
        // Change title to Edit Student
        document.getElementById('addStudentTitle').textContent = 'Edit Student';
        
        // Populate form
        document.getElementById('studentRollNo').value = student.rollNumber;
        document.getElementById('studentRollNo').readOnly = true; // Don't allow changing roll number
        document.getElementById('studentFirstName').value = student.firstName;
        document.getElementById('studentLastName').value = student.lastName;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        document.getElementById('studentDOB').value = student.dob;
        document.getElementById('studentGender').value = student.gender;
        document.getElementById('studentAddress').value = student.address;
        document.getElementById('studentCity').value = student.city;
        document.getElementById('studentState').value = student.state;
        document.getElementById('studentPincode').value = student.pincode;
        document.getElementById('studentCourse').value = student.course;
        document.getElementById('studentBatch').value = student.batch;
        
        // Convert date back to input format
        const enrollDate = new Date(student.enrollmentDate);
        document.getElementById('studentEnrollmentDate').value = enrollDate.toISOString().split('T')[0];
        
        document.getElementById('studentQualification').value = student.qualification;
        document.getElementById('studentStatus').value = student.status;
        document.getElementById('studentNotes').value = student.notes || '';
        
        showToast('Editing student: ' + student.name);
    }
}

window.editStudent = editStudent;

// ===================================
// DELETE STUDENT
// ===================================
let studentToDelete = null;

function openDeleteModal(rollNumber) {
    studentToDelete = rollNumber;
    document.getElementById('deleteModal').classList.add('show');
}

window.openDeleteModal = openDeleteModal;

function closeDeleteModal() {
    studentToDelete = null;
    document.getElementById('deleteModal').classList.remove('show');
}

window.closeDeleteModal = closeDeleteModal;

function confirmDelete() {
    if (studentToDelete) {
        deleteStudent(studentToDelete);
        showToast('Student deleted successfully!');
        closeDeleteModal();
        loadStudentsTable();
        loadDashboard();
    }
}

window.confirmDelete = confirmDelete;

// ===================================
// TOAST NOTIFICATION
// ===================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.className = 'toast show';
        
        if (type === 'error') {
            toast.classList.add('error');
        }
        
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.remove('error');
        }, 3000);
    }
}

window.showToast = showToast;

// ===================================
// EXPORT DATA
// ===================================
function exportData() {
    const students = getAllStudents();
    const dataStr = JSON.stringify(students, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `students_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showToast('Data exported successfully!');
}

window.exportData = exportData;

// ===================================
// EXPORT TO EXCEL (.XLSX)
// ===================================
function exportToExcel() {
    try {
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        
        // Export Students
        const students = getAllStudents();
        const studentsArray = Object.values(students).map(s => ({
            'Roll Number': s.rollNumber,
            'First Name': s.firstName,
            'Last Name': s.lastName,
            'Full Name': s.name,
            'Email': s.email,
            'Phone': s.phone,
            'Date of Birth': s.dob,
            'Gender': s.gender,
            'Address': s.address,
            'City': s.city,
            'State': s.state,
            'PIN Code': s.pincode,
            'Course': s.course,
            'Batch': s.batch,
            'Enrollment Date': s.enrollmentDate,
            'Qualification': s.qualification,
            'Status': s.status,
            'Notes': s.notes
        }));
        
        if (studentsArray.length > 0) {
            const ws_students = XLSX.utils.json_to_sheet(studentsArray);
            XLSX.utils.book_append_sheet(wb, ws_students, 'Students');
        }
        
        // Export Courses
        const courses = getAllCourses();
        if (courses.length > 0) {
            const coursesArray = courses.map(c => ({
                'ID': c.id,
                'Course Name': c.name,
                'Icon': c.icon,
                'Duration': c.duration
            }));
            const ws_courses = XLSX.utils.json_to_sheet(coursesArray);
            XLSX.utils.book_append_sheet(wb, ws_courses, 'Courses');
        }
        
        // Export Certificates
        const certificates = getAllCertificates();
        const certificatesArray = Object.values(certificates).map(c => ({
            'Certificate Number': c.certificateNumber,
            'Roll Number': c.rollNumber,
            'Student Name': c.studentName,
            'Course': c.course,
            'Grade': c.grade,
            'Issue Date': c.issueDate,
            'Remarks': c.remarks
        }));
        
        if (certificatesArray.length > 0) {
            const ws_certificates = XLSX.utils.json_to_sheet(certificatesArray);
            XLSX.utils.book_append_sheet(wb, ws_certificates, 'Certificates');
        }
        
        // Export Scholarships
        const scholarships = getAllScholarships();
        const scholarshipsArray = Object.values(scholarships).map(s => ({
            'Serial Number': s.serialNo,
            'Student Name': s.studentName,
            'Father Name': s.fatherName,
            'Mother Name': s.motherName,
            'Date of Birth': s.dob,
            'Gender': s.gender,
            'Email': s.email,
            'Phone': s.phone,
            'Address': s.address,
            'Exam Date': s.examDate,
            'Exam Time': s.examTime,
            'Exam Centre': s.examCentre
        }));
        
        if (scholarshipsArray.length > 0) {
            const ws_scholarships = XLSX.utils.json_to_sheet(scholarshipsArray);
            XLSX.utils.book_append_sheet(wb, ws_scholarships, 'Scholarships');
        }
        
        // Export Scholarship Results
        const results = getAllScholarshipResults();
        const resultsArray = Object.values(results).map(r => ({
            'Serial Number': r.serialNo,
            'Marks': r.marks,
            'Scholarship %': r.scholarship,
            'Monthly Fee': r.monthlyFee,
            'Admission Fee': r.admissionFee,
            'Remarks': r.remarks
        }));
        
        if (resultsArray.length > 0) {
            const ws_results = XLSX.utils.json_to_sheet(resultsArray);
            XLSX.utils.book_append_sheet(wb, ws_results, 'Scholarship Results');
        }
        
        // Generate filename with date
        const filename = `AariyaSkillTech_Data_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        // Write the workbook
        XLSX.writeFile(wb, filename);
        
        showToast('Excel file exported successfully!');
    } catch (error) {
        console.error('Export error:', error);
        showToast('Error exporting to Excel. Please try again.', 'error');
    }
}

window.exportToExcel = exportToExcel;

// ===================================
// IMPORT DATA
// ===================================
function importData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                localStorage.setItem('students', JSON.stringify(data));
                showToast('Data imported successfully!');
                loadDashboard();
                loadStudentsTable();
            } catch (error) {
                showToast('Error importing data. Please check file format.', 'error');
            }
        };
        reader.readAsText(file);
    }
}

window.importData = importData;

// ===================================
// DIRECTOR SIGNATURE MANAGEMENT
// ===================================
function uploadSignature(event) {
    const file = event.target.files[0];
    if (file) {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            showToast('Please upload an image file!', 'error');
            return;
        }

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showToast('Image size should be less than 2MB!', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = async function(e) {
            const imageData = e.target.result;
            try {
                // Save to database via API
                const response = await fetch('http://localhost:3001/api/settings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ director_signature: imageData })
                });
                const result = await response.json();
                if (response.ok && result.success) {
                    displaySignature(imageData);
                    showToast('Director signature uploaded and saved to database!');
                } else {
                    throw new Error(result.message || 'Failed to save signature');
                }
            } catch (error) {
                // Fallback to localStorage
                const settings = JSON.parse(localStorage.getItem('instituteSettings') || '{}');
                settings.directorSignature = imageData;
                localStorage.setItem('instituteSettings', JSON.stringify(settings));
                displaySignature(imageData);
                showToast('Director signature uploaded (saved locally - server offline)!');
            }
        };
        reader.readAsDataURL(file);
    }
}

function displaySignature(imageData) {
    const signatureDisplay = document.getElementById('signatureDisplay');
    if (imageData) {
        signatureDisplay.innerHTML = `
            <img src="${imageData}" alt="Director Signature" style="max-width: 100%; max-height: 150px; object-fit: contain;">
            <p style="color: #059669; margin-top: 10px; font-weight: 500;">
                <i class="fas fa-check-circle"></i> Signature uploaded
            </p>
        `;
    } else {
        signatureDisplay.innerHTML = `
            <i class="fas fa-signature" style="font-size: 48px; color: #ccc;"></i>
            <p style="color: #6b7280; margin-top: 10px;">No signature uploaded</p>
        `;
    }
}

function removeSignature() {
    if (confirm('Are you sure you want to remove the director signature?')) {
        const settings = JSON.parse(localStorage.getItem('instituteSettings') || '{}');
        delete settings.directorSignature;
        localStorage.setItem('instituteSettings', JSON.stringify(settings));
        
        displaySignature(null);
        showToast('Director signature removed!');
    }
}

function loadSignatureSettings() {
    const settings = JSON.parse(localStorage.getItem('instituteSettings') || '{}');
    if (settings.directorSignature) {
        displaySignature(settings.directorSignature);
    }
}

window.uploadSignature = uploadSignature;
window.removeSignature = removeSignature;

// ===================================
// CLEAR ALL DATA
// ===================================
function clearAllData() {
    if (confirm('Are you sure you want to delete all student data? This cannot be undone!')) {
        localStorage.removeItem('students');
        localStorage.removeItem('courses'); // Also clear courses to reinitialize
        showToast('All data cleared!');
        initializeData();
        initializeCourses(); // Reinitialize courses with new list
        loadDashboard();
        loadStudentsTable();
        loadCoursesTable(); // Reload courses table
    }
}

window.clearAllData = clearAllData;

// ===================================
// CHANGE PASSWORD
// ===================================
const changePasswordForm = document.getElementById('changePasswordForm');
if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (currentPassword !== 'admin@123') {
            showToast('Current password is incorrect!', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showToast('New passwords do not match!', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            showToast('Password must be at least 6 characters!', 'error');
            return;
        }
        
        // In production, save new password securely
        showToast('Password updated successfully!');
        changePasswordForm.reset();
    });
}

// ===================================
// PRINT REGISTRATION FORM
// ===================================
function printRegistrationForm(rollNumber) {
    // Open print page in new window with student roll number
    const printWindow = window.open(
        `print-registration.html?roll=${rollNumber}`,
        'PrintRegistration',
        'width=900,height=1200,toolbar=no,menubar=no,location=no,status=no'
    );
    
    // Focus the new window
    if (printWindow) {
        printWindow.focus();
    } else {
        showToast('Please allow pop-ups to print the registration form', 'error');
    }
}

// Make function globally accessible
window.printRegistrationForm = printRegistrationForm;

// ===================================
// COURSE MANAGEMENT
// ===================================

// Initialize default courses
function initializeCourses() {
    if (!localStorage.getItem('courses')) {
        const defaultCourses = [
            { id: 1, name: 'Office Automation with Advance', icon: 'fas fa-desktop', duration: '3 months' },
            { id: 2, name: 'Tally Erp 9 with GST', icon: 'fas fa-calculator', duration: '3 months' },
            { id: 3, name: 'Tally Prime with GST', icon: 'fas fa-file-invoice', duration: '3 months' },
            { id: 4, name: 'Web Development HTML, CSS, JAVA Script', icon: 'fas fa-code', duration: '3 months' },
            { id: 5, name: 'Photoshop', icon: 'fas fa-image', duration: '3 months' },
            { id: 6, name: 'Corel Draw', icon: 'fas fa-pen-nib', duration: '3 months' },
            { id: 7, name: 'DCA', icon: 'fas fa-laptop', duration: '6-8 months' },
            { id: 8, name: 'ADCA', icon: 'fas fa-laptop-code', duration: '12 months' },
            { id: 9, name: 'ADIT', icon: 'fas fa-graduation-cap', duration: '15 months' },
            { id: 10, name: 'CCC', icon: 'fas fa-certificate', duration: '6 months' },
            { id: 11, name: 'AutoCAD', icon: 'fas fa-drafting-compass', duration: '3 months' },
            { id: 12, name: 'Internet & Hardware', icon: 'fas fa-network-wired', duration: '3 months' },
            { id: 13, name: 'AI', icon: 'fas fa-brain', duration: '30 days' }
        ];
        localStorage.setItem('courses', JSON.stringify(defaultCourses));
    }
}

// Get all courses
function getAllCourses() {
    const courses = localStorage.getItem('courses');
    return courses ? JSON.parse(courses) : [];
}

// Save courses
function saveCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Load courses table
function loadCoursesTable() {
    initializeCourses();
    const courses = getAllCourses();
    const tbody = document.getElementById('coursesTableBody');
    
    if (!tbody) return;
    
    if (courses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data"><p>No courses available. Add your first course!</p></td></tr>';
        return;
    }
    
    tbody.innerHTML = courses.map((course, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${course.name}</td>
            <td><i class="${course.icon}"></i> ${course.icon}</td>
            <td>${course.duration}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editCourse(${course.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-delete" onclick="openDeleteCourseModal(${course.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Update course dropdown in add student form
    updateCourseDropdown();
}

// Update course dropdown in student form
function updateCourseDropdown() {
    const courseSelect = document.getElementById('studentCourse');
    if (!courseSelect) return;
    
    const courses = getAllCourses();
    courseSelect.innerHTML = '<option value="">Select Course</option>' + 
        courses.map(course => `<option value="${course.name}">${course.name}</option>`).join('');
}

// Open add course modal
function openAddCourseModal() {
    document.getElementById('courseModalTitle').textContent = 'Add New Course';
    document.getElementById('courseForm').reset();
    document.getElementById('courseId').value = '';
    document.getElementById('courseModal').classList.add('active');
}

window.openAddCourseModal = openAddCourseModal;

// Close course modal
function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('active');
}

window.closeCourseModal = closeCourseModal;

// Edit course
function editCourse(courseId) {
    const courses = getAllCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (course) {
        document.getElementById('courseModalTitle').textContent = 'Edit Course';
        document.getElementById('courseId').value = course.id;
        document.getElementById('courseName').value = course.name;
        document.getElementById('courseIcon').value = course.icon;
        document.getElementById('courseDuration').value = course.duration;
        document.getElementById('courseModal').classList.add('active');
    }
}

window.editCourse = editCourse;

// Course form submit
const courseForm = document.getElementById('courseForm');
if (courseForm) {
    courseForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const courseId = document.getElementById('courseId').value;
        const courseName = document.getElementById('courseName').value.trim();
        const courseIcon = document.getElementById('courseIcon').value.trim();
        const courseDuration = document.getElementById('courseDuration').value.trim();
        
        const courseData = {
            course_name: courseName,
            icon_class: courseIcon,
            duration: courseDuration,
            is_active: true
        };
        
        try {
            let response, result;
            
            if (courseId) {
                // Update existing course
                response = await fetch(`http://localhost:3001/api/courses/${courseId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(courseData)
                });
                
                result = await response.json();
                
                if (response.ok && result.success) {
                    showToast('Course updated successfully!');
                    loadCoursesTable();
                    loadDashboard();
                    closeCourseModal();
                } else {
                    throw new Error(result.message || 'Failed to update course');
                }
            } else {
                // Add new course
                response = await fetch('http://localhost:3001/api/courses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(courseData)
                });
                
                result = await response.json();
                
                if (response.ok && result.success) {
                    showToast('Course added successfully!');
                    loadCoursesTable();
                    loadDashboard();
                    closeCourseModal();
                } else {
                    throw new Error(result.message || 'Failed to add course');
                }
            }
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to localStorage
            let courses = getAllCourses();
            
            if (courseId) {
                // Update existing course
                courses = courses.map(c => 
                    c.id === parseInt(courseId) 
                        ? { ...c, name: courseName, icon: courseIcon, duration: courseDuration }
                        : c
                );
                showToast('Course updated successfully! (Saved locally - server offline)');
            } else {
                // Add new course
                const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
                courses.push({
                    id: newId,
                    name: courseName,
                    icon: courseIcon,
                    duration: courseDuration
                });
                showToast('Course added successfully! (Saved locally - server offline)');
            }
            
            saveCourses(courses);
            loadCoursesTable();
            loadDashboard();
            closeCourseModal();
        }
    });
}

// Open delete course modal
let courseToDelete = null;

function openDeleteCourseModal(courseId) {
    const courses = getAllCourses();
    const course = courses.find(c => c.id === courseId);
    
    if (course) {
        courseToDelete = courseId;
        document.getElementById('deleteCourseNameDisplay').textContent = course.name;
        document.getElementById('deleteCourseModal').classList.add('active');
    }
}

window.openDeleteCourseModal = openDeleteCourseModal;

// Close delete course modal
function closeDeleteCourseModal() {
    courseToDelete = null;
    document.getElementById('deleteCourseModal').classList.remove('active');
}

window.closeDeleteCourseModal = closeDeleteCourseModal;

// Confirm delete course
async function confirmDeleteCourse() {
    if (courseToDelete) {
        try {
            // Try API first
            const response = await fetch(`http://localhost:3001/api/courses/${courseToDelete}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showToast('Course deleted successfully!');
                loadCoursesTable();
                loadDashboard();
                closeDeleteCourseModal();
            } else {
                throw new Error(result.message || 'Failed to delete course');
            }
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to localStorage
            let courses = getAllCourses();
            courses = courses.filter(c => c.id !== courseToDelete);
            saveCourses(courses);
            loadCoursesTable();
            loadDashboard();
            showToast('Course deleted successfully! (Saved locally - server offline)');
            closeDeleteCourseModal();
        }
    }
}

window.confirmDeleteCourse = confirmDeleteCourse;

// ===================================
// CERTIFICATE MANAGEMENT
// ===================================

// Get all certificates
function getAllCertificates() {
    const certificates = localStorage.getItem('certificates');
    return certificates ? JSON.parse(certificates) : {};
}

// Save certificates
function saveCertificates(certificates) {
    localStorage.setItem('certificates', JSON.stringify(certificates));
}

// Generate certificate number
function generateCertificateNumber() {
    const year = new Date().getFullYear();
    const certificates = getAllCertificates();
    const existingNumbers = Object.keys(certificates).map(cert => {
        const match = cert.match(/AST-CERT-\d{4}-(\d{4})/);
        return match ? parseInt(match[1]) : 0;
    });
    
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    return `AST-CERT-${year}-${String(nextNumber).padStart(4, '0')}`;
}

// Load certificates table
function loadCertificatesTable(searchTerm = '') {
    const certificates = getAllCertificates();
    const tbody = document.getElementById('certificatesTableBody');
    
    if (!tbody) return;
    
    const certificatesArray = Object.values(certificates);
    
    // Filter by search term
    const filteredCertificates = certificatesArray.filter(cert =>
        cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredCertificates.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data"><p>No certificates issued yet. Issue your first certificate!</p></td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredCertificates.map(cert => `
        <tr>
            <td><strong>${cert.certificateNumber}</strong></td>
            <td>${cert.studentName}</td>
            <td>${cert.rollNumber}</td>
            <td>${cert.course}</td>
            <td><span class="grade-badge-sm grade-${cert.grade.replace('+', 'plus')}">${cert.grade}</span></td>
            <td>${cert.issueDate}</td>
            <td>
                <button class="action-btn btn-view" onclick="viewCertificate('${cert.certificateNumber}')" title="View Certificate">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn btn-success" onclick="printCertificate('${cert.certificateNumber}')" title="Print Certificate">
                    <i class="fas fa-print"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteCertificate('${cert.certificateNumber}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Search certificates
const searchCertificate = document.getElementById('searchCertificate');
if (searchCertificate) {
    searchCertificate.addEventListener('input', function() {
        loadCertificatesTable(this.value);
    });
}

// Open issue certificate modal
function openIssueCertificateModal() {
    const modal = document.getElementById('issueCertificateModal');
    const studentSelect = document.getElementById('certStudentSelect');
    const dateField = document.getElementById('certIssueDate');
    
    // Populate student dropdown with all students
    const students = getAllStudents();
    const studentsArray = Object.values(students);
    
    if (studentsArray.length === 0) {
        studentSelect.innerHTML = '<option value="">No students available</option>';
        showToast('Please add students first!', 'error');
        return;
    }
    
    studentSelect.innerHTML = '<option value="">Choose a student...</option>' +
        studentsArray.map(s => 
            `<option value="${s.rollNumber}">${s.name} (${s.rollNumber}) - ${s.status}</option>`
        ).join('');
    
    // Set today's date
    dateField.value = new Date().toISOString().split('T')[0];
    
    modal.classList.add('active');
}

window.openIssueCertificateModal = openIssueCertificateModal;

// Close issue certificate modal
function closeIssueCertificateModal() {
    document.getElementById('issueCertificateModal').classList.remove('active');
    document.getElementById('issueCertificateForm').reset();
}

window.closeIssueCertificateModal = closeIssueCertificateModal;

// Student select change - populate course
const certStudentSelect = document.getElementById('certStudentSelect');
if (certStudentSelect) {
    certStudentSelect.addEventListener('change', function() {
        const rollNumber = this.value;
        if (rollNumber) {
            const students = getAllStudents();
            const student = students[rollNumber];
            if (student) {
                document.getElementById('certCourse').value = student.course;
            }
        } else {
            document.getElementById('certCourse').value = '';
        }
    });
}

// Issue certificate form submit
const issueCertificateForm = document.getElementById('issueCertificateForm');
if (issueCertificateForm) {
    issueCertificateForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const rollNumber = document.getElementById('certStudentSelect').value;
        const students = getAllStudents();
        const student = students[rollNumber];
        
        if (!student) {
            showToast('Student not found!', 'error');
            return;
        }
        
        const issueDate = new Date(document.getElementById('certIssueDate').value);
        
        const certificateData = {
            roll_number: rollNumber,
            student_name: student.name || `${student.firstName} ${student.lastName}`.trim(),
            course_name: student.course,
            grade: document.getElementById('certGrade').value,
            issue_date: document.getElementById('certIssueDate').value,
            remarks: document.getElementById('certRemarks').value || '',
            is_issued: true,
            is_verified: true
        };
        
        try {
            // Try API first
            const response = await fetch('http://localhost:3001/api/certificates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(certificateData)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showToast(`Certificate issued successfully! Certificate No: ${result.certificateNumber}`);
                closeIssueCertificateModal();
                loadCertificatesTable();
                
                // Ask if user wants to print
                if (confirm(`Certificate issued successfully!\n\nWould you like to print the certificate now?`)) {
                    printCertificate(result.certificateNumber);
                }
            } else {
                throw new Error(result.message || 'Failed to issue certificate');
            }
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to localStorage
            const certificateNumber = generateCertificateNumber();
            
            const localCertificateData = {
                certificateNumber: certificateNumber,
                rollNumber: rollNumber,
                studentName: student.name || `${student.firstName} ${student.lastName}`.trim(),
                course: student.course,
                grade: document.getElementById('certGrade').value,
                issueDate: issueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                remarks: document.getElementById('certRemarks').value,
                issuedDate: new Date().toISOString()
            };
            
            const certificates = getAllCertificates();
            certificates[certificateNumber] = localCertificateData;
            saveCertificates(certificates);
            
            showToast('Certificate issued successfully! (Saved locally - server offline)');
            closeIssueCertificateModal();
            loadCertificatesTable();
            
            // Ask if user wants to print
            if (confirm(`Certificate issued successfully!\n\nWould you like to print the certificate now?`)) {
                printCertificate(certificateNumber);
            }
        }
    });
}

// View certificate
function viewCertificate(certNumber) {
    window.open(`certificate.html?cert=${certNumber}`, '_blank', 'width=1200,height=800');
}

window.viewCertificate = viewCertificate;

// Print certificate
function printCertificate(certNumber) {
    window.open(`certificate.html?cert=${certNumber}`, 'PrintCertificate', 'width=1200,height=800');
}

window.printCertificate = printCertificate;

// Delete certificate
function deleteCertificate(certNumber) {
    if (confirm('Are you sure you want to delete this certificate?\n\nThis action cannot be undone!')) {
        const certificates = getAllCertificates();
        delete certificates[certNumber];
        saveCertificates(certificates);
        loadCertificatesTable();
        showToast('Certificate deleted successfully!');
    }
}

window.deleteCertificate = deleteCertificate;

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin-dashboard.html')) {
        initializeData();
        initializeCourses();
        loadDashboard();
        loadCoursesTable();
        loadCertificatesTable();
        loadSignatureSettings();
        loadScholarshipTable();
        loadScholarshipResultsTable();
    }
});

// ===================================
// SCHOLARSHIP FORMS MANAGEMENT
// ===================================

// Get all scholarships
function getAllScholarships() {
    return JSON.parse(localStorage.getItem('scholarships') || '{}');
}

// Save scholarships
function saveScholarships(scholarships) {
    localStorage.setItem('scholarships', JSON.stringify(scholarships));
}

// Generate scholarship serial number
function generateScholarshipSerial() {
    const scholarships = getAllScholarships();
    const year = new Date().getFullYear();
    let maxNumber = 0;
    
    Object.keys(scholarships).forEach(key => {
        const parts = key.split('-');
        if (parts[1] === year.toString()) {
            const num = parseInt(parts[2]);
            if (num > maxNumber) maxNumber = num;
        }
    });
    
    const newNumber = (maxNumber + 1).toString().padStart(4, '0');
    const serialNo = `SCH-${year}-${newNumber}`;
    document.getElementById('schSerialNo').value = serialNo;
}

window.generateScholarshipSerial = generateScholarshipSerial;

// Load scholarship table
function loadScholarshipTable(searchTerm = '') {
    const scholarships = getAllScholarships();
    const tbody = document.getElementById('scholarshipTableBody');
    
    const scholarshipsArray = Object.values(scholarships);
    
    if (scholarshipsArray.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <i class="fas fa-graduation-cap" style="font-size: 48px; color: #ddd; margin-bottom: 15px;"></i>
                    <p>No scholarship forms found. Click "Add Scholarship Form" to create one.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    const filteredScholarships = scholarshipsArray.filter(sch => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return sch.serialNo.toLowerCase().includes(search) ||
               sch.studentName.toLowerCase().includes(search) ||
               sch.examCentre.toLowerCase().includes(search);
    });
    
    if (filteredScholarships.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <p>No results found for "${searchTerm}"</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredScholarships.map(sch => `
        <tr>
            <td><strong>${sch.serialNo}</strong></td>
            <td>${sch.studentName}</td>
            <td>${sch.phone}</td>
            <td>${sch.examDate}</td>
            <td>${sch.examTime}</td>
            <td>${sch.examCentre.substring(0, 40)}...</td>
            <td>
                <button class="btn-icon" onclick="viewAdmitCard('${sch.serialNo}')" title="View Admit Card">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="printAdmitCard('${sch.serialNo}')" title="Print Admit Card">
                    <i class="fas fa-print"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteScholarship('${sch.serialNo}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

window.loadScholarshipTable = loadScholarshipTable;

// Open add scholarship modal
function openAddScholarshipModal() {
    document.getElementById('scholarshipModal').style.display = 'flex';
    document.getElementById('scholarshipForm').reset();
    document.getElementById('schPhotoPreview').style.display = 'none';
    generateScholarshipSerial();
    
    // Set minimum date for exam date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('schExamDate').min = tomorrow.toISOString().split('T')[0];
}

window.openAddScholarshipModal = openAddScholarshipModal;

// Close scholarship modal
function closeScholarshipModal() {
    document.getElementById('scholarshipModal').style.display = 'none';
}

window.closeScholarshipModal = closeScholarshipModal;

// Photo preview
document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('schPhoto');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    showToast('Photo size should be less than 2MB!', 'error');
                    this.value = '';
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('schPhotoImg').src = e.target.result;
                    document.getElementById('schPhotoPreview').style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Handle scholarship form submission
const scholarshipForm = document.getElementById('scholarshipForm');
if (scholarshipForm) {
    scholarshipForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const serialNo = document.getElementById('schSerialNo').value.trim();
        const photoFile = document.getElementById('schPhoto').files[0];
        
        if (!photoFile) {
            showToast('Please upload student photo!', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = async function(e) {
            const photoData = e.target.result;
            
            const scholarshipData = {
                serial_number: serialNo,
                student_name: document.getElementById('schStudentName').value.trim(),
                father_name: document.getElementById('schFatherName').value.trim(),
                mother_name: document.getElementById('schMotherName').value.trim(),
                date_of_birth: document.getElementById('schDOB').value,
                gender: document.getElementById('schGender').value,
                email: document.getElementById('schEmail').value.trim() || null,
                phone: document.getElementById('schPhone').value.trim(),
                address: document.getElementById('schAddress').value.trim(),
                photo_url: photoData,
                exam_date: document.getElementById('schExamDate').value,
                exam_time: document.getElementById('schExamTime').value,
                exam_centre: document.getElementById('schExamCentre').value.trim(),
                status: 'pending'
            };
            
            try {
                // Try API first
                const response = await fetch('http://localhost:3001/api/scholarships', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(scholarshipData)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    showToast(`Scholarship form saved successfully! Serial: ${result.serialNumber}`);
                    closeScholarshipModal();
                    loadScholarshipTable();
                    
                    // Ask if want to print admit card
                    if (confirm('Do you want to print the admit card now?')) {
                        printAdmitCard(result.serialNumber);
                    }
                } else {
                    throw new Error(result.message || 'Failed to save scholarship');
                }
            } catch (error) {
                console.error('API Error:', error);
                // Fallback to localStorage
                const localScholarshipData = {
                    serialNo: serialNo,
                    studentName: document.getElementById('schStudentName').value.trim(),
                    fatherName: document.getElementById('schFatherName').value.trim(),
                    motherName: document.getElementById('schMotherName').value.trim(),
                    dob: document.getElementById('schDOB').value,
                    gender: document.getElementById('schGender').value,
                    email: document.getElementById('schEmail').value.trim(),
                    phone: document.getElementById('schPhone').value.trim(),
                    address: document.getElementById('schAddress').value.trim(),
                    photo: photoData,
                    examDate: document.getElementById('schExamDate').value,
                    examTime: document.getElementById('schExamTime').value,
                    examCentre: document.getElementById('schExamCentre').value.trim(),
                    createdDate: new Date().toISOString()
                };
                
                const scholarships = getAllScholarships();
                scholarships[serialNo] = localScholarshipData;
                saveScholarships(scholarships);
                
                showToast('Scholarship form saved successfully! (Saved locally - server offline)');
                closeScholarshipModal();
                loadScholarshipTable();
                
                // Ask if want to print admit card
                if (confirm('Do you want to print the admit card now?')) {
                    printAdmitCard(serialNo);
                }
            }
        };
        reader.readAsDataURL(photoFile);
    });
}

// View admit card
function viewAdmitCard(serialNo) {
    window.open(`scholarship-admit-card.html?serial=${serialNo}`, '_blank');
}

window.viewAdmitCard = viewAdmitCard;

// Print admit card
function printAdmitCard(serialNo) {
    window.open(`scholarship-admit-card.html?serial=${serialNo}`, '_blank');
}

window.printAdmitCard = printAdmitCard;

// Delete scholarship
function deleteScholarship(serialNo) {
    if (confirm(`Are you sure you want to delete scholarship form ${serialNo}?`)) {
        const scholarships = getAllScholarships();
        delete scholarships[serialNo];
        saveScholarships(scholarships);
        showToast('Scholarship form deleted successfully!');
        loadScholarshipTable();
    }
}

window.deleteScholarship = deleteScholarship;
// ===================================
// SCHOLARSHIP RESULTS MANAGEMENT
// ===================================

// Get all scholarship results
function getAllScholarshipResults() {
    return JSON.parse(localStorage.getItem('scholarshipResults') || '{}');
}

// Save scholarship results
function saveScholarshipResults(results) {
    localStorage.setItem('scholarshipResults', JSON.stringify(results));
}

// Load scholarship results table
function loadScholarshipResultsTable(searchTerm = '') {
    const results = getAllScholarshipResults();
    const scholarships = getAllScholarships();
    const tbody = document.getElementById('scholarshipResultsTable');
    
    if (!tbody) return;
    
    const resultsArray = Object.values(results);
    
    if (resultsArray.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No results added yet</td></tr>';
        return;
    }
    
    const filteredResults = resultsArray.filter(result => {
        const scholarship = scholarships[result.serialNo];
        const studentName = scholarship?.studentName || '';
        const searchLower = searchTerm.toLowerCase();
        
        return result.serialNo.toLowerCase().includes(searchLower) ||
               studentName.toLowerCase().includes(searchLower);
    });
    
    if (filteredResults.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No matching results found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredResults.map(result => {
        const scholarship = scholarships[result.serialNo];
        const studentName = scholarship?.studentName || 'Unknown';
        
        return `
            <tr>
                <td>${result.serialNo}</td>
                <td>${studentName}</td>
                <td><span style="color: #3b82f6; font-weight: bold;">${result.marks}/100</span></td>
                <td><span style="color: #10b981; font-weight: bold;">${result.scholarship}%</span></td>
                <td>${result.monthlyFee}</td>
                <td>${result.admissionFee}</td>
                <td class="action-buttons">
                    <button class="btn-icon btn-view" onclick="viewResult('${result.serialNo}')" title="View Result">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-print" onclick="printResult('${result.serialNo}')" title="Print Result">
                        <i class="fas fa-print"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteResult('${result.serialNo}')" title="Delete Result">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Open add result modal
function openAddResultModal() {
    const modal = document.getElementById('scholarshipResultModal');
    const form = document.getElementById('scholarshipResultForm');
    const select = document.getElementById('resultSerialNo');
    
    if (!modal || !form || !select) return;
    
    // Reset form
    form.reset();
    document.getElementById('studentInfoDisplay').style.display = 'none';
    
    // Load available scholarship students (those who don't have results yet)
    const scholarships = getAllScholarships();
    const results = getAllScholarshipResults();
    
    select.innerHTML = '<option value="">-- Select Scholarship Student --</option>';
    
    Object.values(scholarships).forEach(scholarship => {
        // Only show students who don't have results yet
        if (!results[scholarship.serialNo]) {
            select.innerHTML += `<option value="${scholarship.serialNo}">${scholarship.serialNo} - ${scholarship.studentName}</option>`;
        }
    });
    
    modal.style.display = 'flex';
}

window.openAddResultModal = openAddResultModal;

// Close result modal
function closeResultModal() {
    const modal = document.getElementById('scholarshipResultModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.closeResultModal = closeResultModal;

// Handle serial number selection
if (document.getElementById('resultSerialNo')) {
    document.getElementById('resultSerialNo').addEventListener('change', function() {
        const serialNo = this.value;
        const infoDisplay = document.getElementById('studentInfoDisplay');
        
        if (serialNo) {
            const scholarships = getAllScholarships();
            const scholarship = scholarships[serialNo];
            
            if (scholarship) {
                document.getElementById('displayName').textContent = scholarship.studentName;
                document.getElementById('displayExamDate').textContent = scholarship.examDate;
                infoDisplay.style.display = 'block';
            }
        } else {
            infoDisplay.style.display = 'none';
        }
    });
}

// Handle result form submission
const scholarshipResultForm = document.getElementById('scholarshipResultForm');
if (scholarshipResultForm) {
    scholarshipResultForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const serialNo = document.getElementById('resultSerialNo').value;
        const marks = document.getElementById('resultMarks').value;
        const scholarship = document.getElementById('resultScholarship').value;
        const monthlyFee = document.getElementById('resultMonthlyFee').value;
        const admissionFee = document.getElementById('resultAdmissionFee').value;
        const remarks = document.getElementById('resultRemarks').value;
        
        // Validate
        if (!serialNo) {
            alert('Please select a student');
            return;
        }
        
        // Create result data
        const percentage = parseFloat(marks);
        const resultStatus = percentage >= 33 ? 'pass' : 'fail';
        
        const resultData = {
            marks_obtained: parseInt(marks),
            total_marks: 100,
            percentage: percentage,
            result_status: resultStatus,
            scholarship_percentage: parseInt(scholarship),
            monthly_fee: parseInt(monthlyFee),
            admission_fee: parseInt(admissionFee),
            remarks: remarks.trim() || null,
            status: 'completed'
        };
        
        try {
            // First get the scholarship ID by serial number
            const getResponse = await fetch(`http://localhost:3001/api/scholarships/serial/${serialNo}`);
            const getResult = await getResponse.json();
            
            if (!getResponse.ok || !getResult.success) {
                throw new Error('Scholarship not found');
            }
            
            const scholarshipId = getResult.scholarship.id;
            
            // Update the scholarship with result data
            const response = await fetch(`http://localhost:3001/api/scholarships/${scholarshipId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resultData)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showToast('Scholarship result added successfully!');
                closeResultModal();
                loadScholarshipResultsTable();
                
                // Ask if want to print result
                if (confirm('Do you want to print the result certificate now?')) {
                    printResult(serialNo);
                }
            } else {
                throw new Error(result.message || 'Failed to save result');
            }
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to localStorage
            const localResultData = {
                serialNo,
                marks: parseInt(marks),
                scholarship: parseInt(scholarship),
                monthlyFee: parseInt(monthlyFee),
                admissionFee: parseInt(admissionFee),
                remarks: remarks.trim(),
                addedDate: new Date().toISOString()
            };
            
            // Save to localStorage
            const results = getAllScholarshipResults();
            results[serialNo] = localResultData;
            saveScholarshipResults(results);
            
            showToast('Scholarship result added successfully! (Saved locally - server offline)');
            closeResultModal();
            loadScholarshipResultsTable();
            
            // Ask if want to print result
            if (confirm('Do you want to print the result certificate now?')) {
                printResult(serialNo);
            }
        }
    });
}

// Search functionality
if (document.getElementById('searchScholarshipResult')) {
    document.getElementById('searchScholarshipResult').addEventListener('input', function() {
        loadScholarshipResultsTable(this.value);
    });
}

// View result
function viewResult(serialNo) {
    window.open(`scholarship-result.html?serial=${serialNo}`, '_blank');
}

window.viewResult = viewResult;

// Print result
function printResult(serialNo) {
    window.open(`scholarship-result.html?serial=${serialNo}`, '_blank');
}

window.printResult = printResult;

// Delete result
function deleteResult(serialNo) {
    if (confirm(`Are you sure you want to delete the result for ${serialNo}?`)) {
        const results = getAllScholarshipResults();
        delete results[serialNo];
        saveScholarshipResults(results);
        showToast('Result deleted successfully!');
        loadScholarshipResultsTable();
    }
}

window.deleteResult = deleteResult;

// ===================================
// ENROLLMENT REQUESTS MANAGEMENT
// ===================================

// Get all enrollment requests
function getAllEnrollmentRequests() {
    return JSON.parse(localStorage.getItem('enrollmentRequests') || '{}');
}

// Save enrollment requests
function saveEnrollmentRequests(requests) {
    localStorage.setItem('enrollmentRequests', JSON.stringify(requests));
}

// Load enrollment requests table
async function loadEnrollmentRequestsTable(searchTerm = '') {
    const tbody = document.getElementById('enrollmentRequestsTable');
    
    if (!tbody) return;
    
    try {
        let requests = [];

        // Try to fetch from API if available (API returns array)
        if (typeof API !== 'undefined') {
            const result = await API.getEnrollments();
            if (result.success) {
                requests = result.enrollments.map(r => ({ _key: null, _data: r }));
                console.log('Loaded enrollments from API:', requests.length);
            }
        }

        // Fallback to localStorage if API not available or failed
        if (requests.length === 0) {
            const localData = getAllEnrollmentRequests();
            // localData may be an object keyed by application id. Preserve keys.
            if (Array.isArray(localData)) {
                requests = localData.map(r => ({ _key: null, _data: r }));
            } else {
                requests = Object.keys(localData).map(k => ({ _key: k, _data: localData[k] }));
            }
            console.log('Loaded enrollments from localStorage:', requests.length);
        }
        
        if (requests.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No enrollment requests yet</td></tr>';
            return;
        }
        
        // Filter requests based on search term
        const filteredRequests = requests.filter(entry => {
            const request = entry._data;
            const fullName = `${request.first_name || request.firstName || ''} ${request.last_name || request.lastName || ''}`.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            const appNum = (request.application_number || request.rollNumber || '').toString().toLowerCase();

            return fullName.includes(searchLower) ||
                   appNum.includes(searchLower) ||
                   (request.phone || '').includes(searchLower);
        });
        
        if (filteredRequests.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No matching enrollment requests found</td></tr>';
            return;
        }
        
        tbody.innerHTML = filteredRequests.map(entry => {
            const request = entry._data;
            const internalKey = entry._key || request.application_number || request.rollNumber || '';
            const status = request.status || 'pending';
            const statusClass = status === 'pending' ? 'badge-warning' : 
                               status === 'approved' ? 'badge-success' : 
                               status === 'rejected' ? 'badge-danger' : 'badge-warning';
            const date = request.applied_at || request.submissionDate ? new Date(request.applied_at || request.submissionDate).toLocaleDateString() : 'N/A';
            const appNumber = request.application_number || request.rollNumber || internalKey || 'N/A';
            const firstName = request.first_name || request.firstName || '';
            const lastName = request.last_name || request.lastName || '';
            const course = request.course || request.course_name || 'N/A';
            const batchTime = request.batch_time || request.batchTime || 'N/A';
            const phone = request.phone || 'N/A';

            // Use internalKey for actions to ensure correct lookup
            const actionKey = internalKey || appNumber;

            return `
                <tr>
                    <td>${appNumber}</td>
                    <td>${firstName} ${lastName}</td>
                    <td>${phone}</td>
                    <td>${course}</td>
                    <td>${batchTime}</td>
                    <td><span class="badge ${statusClass}">${status}</span></td>
                    <td>${date}</td>
                    <td class="action-buttons">
                        <button class="btn-icon btn-view" onclick="viewEnrollmentDetails('${actionKey}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteEnrollmentRequest('${actionKey}')" title="Delete Request">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading enrollment requests:', error);
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-danger">Error loading enrollment requests</td></tr>';
    }
}

// View enrollment details
function viewEnrollmentDetails(key) {
    // Try to find the request from localStorage (supports both keyed object and array formats)
    const stored = getAllEnrollmentRequests();
    let request = null;

    // If stored is an array (e.g., from API fallback), search it
    if (Array.isArray(stored)) {
        request = stored.find(r => (r.application_number && String(r.application_number) === String(key)) || (r.rollNumber && String(r.rollNumber) === String(key)));
    } else if (stored && typeof stored === 'object') {
        // Direct key match
        if (stored[key]) {
            request = stored[key];
        } else {
            // Search values for matching application_number or rollNumber
            for (const k in stored) {
                const r = stored[k];
                if (!r) continue;
                if ((r.application_number && String(r.application_number) === String(key)) || (r.rollNumber && String(r.rollNumber) === String(key))) {
                    request = r;
                    break;
                }
            }
        }
    }

    if (!request) {
        alert('Enrollment request not found!');
        return;
    }

    // Normalize field names (support both snake_case and camelCase)
    const firstName = request.first_name || request.firstName || '';
    const lastName = request.last_name || request.lastName || '';
    const dateOfBirth = request.date_of_birth || request.dateOfBirth || request.dob || '';
    const gender = request.gender || '';
    const rollNumber = request.application_number || request.rollNumber || request.roll_number || 'N/A';
    const email = request.email || '';
    const phone = request.phone || '';
    const city = request.city || '';
    const state = request.state || '';
    const pincode = request.pincode || '';
    const qualification = request.qualification || '';
    const institute = request.institute || '';
    const passingYear = request.passingYear || request.passing_year || '';
    const percentage = request.percentage || '';
    const course = request.course || request.course_name || '';
    const batchTime = request.batch_time || request.batchTime || '';
    const startDate = request.startDate || request.start_date || '';
    const experience = request.experience || '';
    const howHeard = request.howHeard || request.how_heard || '';
    const remarks = request.remarks || '';
    const address = request.address || '';
    const submissionDate = request.submissionDate || request.submission_date || request.applied_at || request.submitted_at || '';
    const status = request.status || request.request_status || 'Pending';

    const content = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <h3 style="color: #3b82f6; margin-bottom: 15px;"><i class="fas fa-user"></i> Personal Information</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Application / Roll Number:</strong> ${rollNumber}</p>
            </div>

            <div>
                <h3 style="color: #10b981; margin-bottom: 15px;"><i class="fas fa-phone"></i> Contact Information</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>City:</strong> ${city}, ${state}</p>
                <p><strong>Pincode:</strong> ${pincode}</p>
            </div>

            <div>
                <h3 style="color: #f59e0b; margin-bottom: 15px;"><i class="fas fa-graduation-cap"></i> Educational Background</h3>
                <p><strong>Qualification:</strong> ${qualification}</p>
                <p><strong>Institute:</strong> ${institute}</p>
                <p><strong>Passing Year:</strong> ${passingYear}</p>
                <p><strong>Percentage:</strong> ${percentage}</p>
            </div>

            <div>
                <h3 style="color: #8b5cf6; margin-bottom: 15px;"><i class="fas fa-book"></i> Course Details</h3>
                <p><strong>Course:</strong> ${course}</p>
                <p><strong>Batch Time:</strong> ${batchTime}</p>
                <p><strong>Start Date:</strong> ${startDate}</p>
                <p><strong>Experience:</strong> ${experience}</p>
            </div>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px;">
            <h3 style="color: #6b7280; margin-bottom: 10px;"><i class="fas fa-info-circle"></i> Additional Information</h3>
            <p><strong>How Heard:</strong> ${howHeard}</p>
            <p><strong>Remarks:</strong> ${remarks || 'None'}</p>
            <p><strong>Full Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
        </div>

        <div style="margin-top: 20px;">
            <p><strong>Submission Date:</strong> ${submissionDate ? new Date(submissionDate).toLocaleString() : 'N/A'}</p>
            <p><strong>Status:</strong> <span class="badge ${status === 'Pending' || status === 'pending' ? 'badge-warning' : status === 'Approved' || status === 'approved' ? 'badge-success' : 'badge-danger'}">${status}</span></p>
        </div>
    `;

    document.getElementById('enrollmentDetailsContent').innerHTML = content;
    document.getElementById('enrollmentDetailsModal').style.display = 'flex';
}

window.viewEnrollmentDetails = viewEnrollmentDetails;

// Close enrollment details modal
function closeEnrollmentDetailsModal() {
    document.getElementById('enrollmentDetailsModal').style.display = 'none';
}

window.closeEnrollmentDetailsModal = closeEnrollmentDetailsModal;

// Delete enrollment request
function deleteEnrollmentRequest(key) {
    if (confirm(`Are you sure you want to delete the enrollment request for ${key}?`)) {
        const requests = getAllEnrollmentRequests();

        // If stored as object and key exists directly, delete it
        if (requests && typeof requests === 'object' && requests[key]) {
            delete requests[key];
            saveEnrollmentRequests(requests);
            showToast('Enrollment request deleted successfully!');
            loadEnrollmentRequestsTable();
            return;
        }

        // Otherwise search for matching application_number or rollNumber
        let foundKey = null;
        for (const reqKey in requests) {
            const req = requests[reqKey];
            if (!req) continue;
            if (String(req.application_number) === String(key) || String(req.rollNumber) === String(key)) {
                foundKey = reqKey;
                break;
            }
        }

        if (foundKey) {
            delete requests[foundKey];
            saveEnrollmentRequests(requests);
            showToast('Enrollment request deleted successfully!');
            loadEnrollmentRequestsTable();
            return;
        }

        // As a last resort, if requests is an array, filter it
        if (Array.isArray(requests)) {
            const filtered = requests.filter(r => !(String(r.application_number) === String(key) || String(r.rollNumber) === String(key)));
            saveEnrollmentRequests(filtered);
            showToast('Enrollment request deleted successfully!');
            loadEnrollmentRequestsTable();
            return;
        }

        alert('Enrollment request not found for deletion.');
    }
}

window.deleteEnrollmentRequest = deleteEnrollmentRequest;

// Search functionality
if (document.getElementById('searchEnrollment')) {
    document.getElementById('searchEnrollment').addEventListener('input', function() {
        loadEnrollmentRequestsTable(this.value);
    });
}

// Clear all enrollment requests (API + localStorage fallback)
async function clearAllEnrollmentRequests() {
    if (!confirm('Are you sure you want to permanently delete ALL enrollment requests? This cannot be undone.')) return;

    try {
        // Try API delete first
        const resp = await fetch('http://localhost:3001/api/enrollments', { method: 'DELETE' });
        const result = await resp.json().catch(() => null);

        if (resp.ok && result && result.success) {
            showToast('All enrollment requests deleted from server successfully');
            // Clear local fallback as well
            try { localStorage.removeItem('enrollmentRequests'); } catch (e) {}
            loadEnrollmentRequestsTable();
            return;
        }
    } catch (e) {
        console.warn('API clear enrollments failed:', e.message || e);
    }

    // Fallback: clear localStorage
    try {
        localStorage.removeItem('enrollmentRequests');
        showToast('All enrollment requests cleared locally');
        loadEnrollmentRequestsTable();
    } catch (e) {
        console.error('Failed to clear local enrollment requests:', e);
        alert('Failed to clear enrollment requests. Check console for details.');
    }
}

window.clearAllEnrollmentRequests = clearAllEnrollmentRequests;

