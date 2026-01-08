-- ===================================
-- AARIYA SKILLTECH ACADEMY DATABASE
-- ===================================

CREATE DATABASE IF NOT EXISTS aariya_skilltech_academy;
USE aariya_skilltech_academy;

-- ===================================
-- STUDENTS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    alternate_phone VARCHAR(15),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    
    -- Educational Details
    highest_qualification VARCHAR(50),
    institute VARCHAR(255),
    passing_year YEAR,
    percentage VARCHAR(10),
    
    -- Course Details
    course_id INT,
    course_name VARCHAR(255) NOT NULL,
    batch_time VARCHAR(50),
    enrollment_date DATE NOT NULL,
    start_date DATE,
    end_date DATE,
    course_duration VARCHAR(50),
    course_fee DECIMAL(10, 2),
    fee_paid DECIMAL(10, 2) DEFAULT 0,
    fee_remaining DECIMAL(10, 2),
    payment_status ENUM('pending', 'partial', 'completed') DEFAULT 'pending',
    
    -- Student Status
    status ENUM('active', 'completed', 'discontinued', 'suspended') DEFAULT 'active',
    attendance_percentage DECIMAL(5, 2) DEFAULT 0,
    remarks TEXT,
    
    -- Photo & Documents
    photo_url VARCHAR(255),
    aadhar_number VARCHAR(12),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_roll_number (roll_number),
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_status (status),
    INDEX idx_course_id (course_id)
);

-- ===================================
-- COURSES TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_category VARCHAR(100),
    duration VARCHAR(50) NOT NULL,
    duration_months INT,
    description TEXT,
    syllabus TEXT,
    
    -- Fees
    course_fee DECIMAL(10, 2) NOT NULL,
    registration_fee DECIMAL(10, 2),
    exam_fee DECIMAL(10, 2),
    certificate_fee DECIMAL(10, 2),
    
    -- Course Details
    eligibility TEXT,
    batch_available JSON,
    max_students_per_batch INT DEFAULT 30,
    instructor VARCHAR(100),
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_course_code (course_code),
    INDEX idx_is_active (is_active)
);

-- ===================================
-- CERTIFICATES TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    student_id INT NOT NULL,
    roll_number VARCHAR(20) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_duration VARCHAR(50),
    
    -- Certificate Details
    issue_date DATE NOT NULL,
    completion_date DATE,
    grade VARCHAR(10),
    percentage DECIMAL(5, 2),
    division VARCHAR(50),
    
    -- Verification
    verification_code VARCHAR(100) UNIQUE,
    qr_code_url VARCHAR(255),
    certificate_pdf_url VARCHAR(255),
    
    -- Status
    is_issued BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT TRUE,
    remarks TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    INDEX idx_certificate_number (certificate_number),
    INDEX idx_verification_code (verification_code),
    INDEX idx_student_id (student_id)
);

-- ===================================
-- ADMISSIONS/ENROLLMENTS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Personal Details
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    
    -- Educational Background
    qualification VARCHAR(50),
    institute VARCHAR(255),
    passing_year YEAR,
    percentage VARCHAR(10),
    
    -- Course Selection
    course VARCHAR(255) NOT NULL,
    batch_time VARCHAR(50),
    start_date DATE,
    
    -- Additional Info
    previous_experience TEXT,
    reference_source VARCHAR(100),
    
    -- Status
    status ENUM('pending', 'approved', 'rejected', 'converted') DEFAULT 'pending',
    remarks TEXT,
    
    -- Timestamps
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_application_number (application_number),
    INDEX idx_email (email),
    INDEX idx_status (status)
);

-- ===================================
-- ATTENDANCE TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    roll_number VARCHAR(20) NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('present', 'absent', 'late', 'leave') NOT NULL,
    remarks TEXT,
    marked_by VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance (student_id, attendance_date),
    INDEX idx_student_id (student_id),
    INDEX idx_attendance_date (attendance_date)
);

-- ===================================
-- FEE PAYMENTS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS fee_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    student_id INT NOT NULL,
    roll_number VARCHAR(20) NOT NULL,
    
    -- Payment Details
    amount DECIMAL(10, 2) NOT NULL,
    payment_mode ENUM('cash', 'card', 'upi', 'netbanking', 'cheque') NOT NULL,
    transaction_id VARCHAR(100),
    payment_date DATE NOT NULL,
    
    -- Payment Type
    payment_type ENUM('registration', 'installment', 'full_payment', 'certificate_fee', 'exam_fee') NOT NULL,
    installment_number INT,
    
    -- Status
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'completed',
    remarks TEXT,
    collected_by VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    INDEX idx_receipt_number (receipt_number),
    INDEX idx_student_id (student_id),
    INDEX idx_payment_date (payment_date)
);

-- ===================================
-- ADMINS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    role ENUM('super_admin', 'admin', 'staff') DEFAULT 'staff',
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- ===================================
-- CONTACT MESSAGES TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    
    -- Status
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    replied_at TIMESTAMP NULL,
    replied_by VARCHAR(100),
    reply_message TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_email (email)
);

-- ===================================
-- NOTIFICATIONS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('general', 'admission', 'exam', 'fee', 'certificate', 'holiday') NOT NULL,
    target_audience ENUM('all', 'students', 'specific') DEFAULT 'all',
    student_id INT NULL,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE,
    end_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_is_active (is_active)
);

-- ===================================
-- SETTINGS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    director_signature TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===================================
-- INSERT SAMPLE DATA
-- ===================================

-- Insert Sample Courses
INSERT INTO courses (course_code, course_name, course_category, duration, duration_months, description, course_fee, is_active) VALUES
('OA-3M', 'Office Automation with Advance', 'Office Skills', '3 months', 3, 'MS Word, Excel, PowerPoint with advanced features', 5000.00, TRUE),
('TE9-3M', 'Tally ERP 9 with GST', 'Accounting', '3 months', 3, 'Complete Tally ERP 9 with GST implementation', 6000.00, TRUE),
('TP-3M', 'Tally Prime with GST', 'Accounting', '3 months', 3, 'Latest Tally Prime with GST features', 6500.00, TRUE),
('WD-3M', 'Web Development HTML, CSS, JavaScript', 'Web Design', '3 months', 3, 'Complete web development course', 8000.00, TRUE),
('PS-3M', 'Photoshop', 'Graphic Design', '3 months', 3, 'Adobe Photoshop professional course', 7000.00, TRUE),
('CD-3M', 'Corel Draw', 'Graphic Design', '3 months', 3, 'CorelDRAW professional graphics', 7000.00, TRUE),
('DCA', 'DCA (Diploma in Computer Application)', 'Diploma', '6-8 months', 8, 'Complete computer application diploma', 12000.00, TRUE),
('ADCA', 'ADCA (Advanced DCA)', 'Diploma', '12 months', 12, 'Advanced computer application diploma', 18000.00, TRUE),
('ADIT', 'ADIT (Advanced Diploma in IT)', 'Diploma', '15 months', 15, 'Advanced IT diploma program', 25000.00, TRUE),
('CCC', 'CCC (Course on Computer Concepts)', 'Certificate', '6 months', 6, 'NIELIT CCC certification course', 4000.00, TRUE),
('ACAD-3M', 'AutoCAD', 'Design', '3 months', 3, 'AutoCAD 2D & 3D design', 9000.00, TRUE),
('IH-3M', 'Internet & Hardware', 'Technical', '3 months', 3, 'Internet and computer hardware', 5500.00, TRUE),
('AI-1M', 'AI (Artificial Intelligence)', 'Advanced', '30 days', 1, 'Introduction to Artificial Intelligence', 10000.00, TRUE);

-- Insert Sample Admin
-- Password: admin@123 (hashed with bcrypt)
INSERT INTO admins (username, password_hash, full_name, email, role, is_active) VALUES
('admin', '$2a$10$YourHashedPasswordHere', 'System Administrator', 'admin@aariyaskilltech.com', 'super_admin', TRUE);

-- Insert Sample Students
INSERT INTO students (roll_number, first_name, last_name, father_name, date_of_birth, gender, email, phone, address, city, state, pincode, highest_qualification, institute, passing_year, percentage, course_name, enrollment_date, start_date, course_fee, status) VALUES
('AST-2026-0001', 'Rahul', 'Kumar', 'Rajesh Kumar', '2004-05-15', 'male', 'rahul.kumar@email.com', '9876543210', '123 Main Street', 'Delhi', 'Delhi', '110001', '12th', 'Delhi Public School', 2022, '85', 'DCA (Diploma in Computer Application)', '2026-01-01', '2026-01-15', 12000.00, 'active'),
('AST-2026-0002', 'Priya', 'Sharma', 'Suresh Sharma', '2003-08-22', 'female', 'priya.sharma@email.com', '9876543211', '456 Park Avenue', 'Mumbai', 'Maharashtra', '400001', 'bachelors', 'Mumbai University', 2024, '78', 'Web Development HTML, CSS, JavaScript', '2026-01-02', '2026-01-16', 8000.00, 'active'),
('AST-2026-0003', 'Amit', 'Patel', 'Ramesh Patel', '2005-03-10', 'male', 'amit.patel@email.com', '9876543212', '789 Lake View', 'Ahmedabad', 'Gujarat', '380001', '12th', 'Gujarat Secondary Board', 2023, '82', 'Tally Prime with GST', '2026-01-03', '2026-01-17', 6500.00, 'active'),
('AST-2026-0004', 'Anjali', 'Verma', 'Vijay Verma', '2004-11-05', 'female', 'anjali.verma@email.com', '9876543213', '321 River Road', 'Lucknow', 'Uttar Pradesh', '226001', 'diploma', 'Lucknow Polytechnic', 2024, '75', 'Photoshop', '2026-01-04', '2026-01-18', 7000.00, 'active'),
('AST-2026-0005', 'Vikash', 'Singh', 'Mahendra Singh', '2003-07-18', 'male', 'vikash.singh@email.com', '9876543214', '654 Hill Station', 'Patna', 'Bihar', '800001', 'bachelors', 'Patna University', 2024, '88', 'ADCA (Advanced DCA)', '2026-01-05', '2026-01-19', 18000.00, 'active');

-- Insert Sample Certificates
INSERT INTO certificates (certificate_number, student_id, roll_number, student_name, course_name, course_duration, issue_date, completion_date, grade, percentage, verification_code, is_issued) VALUES
('CERT-2025-0001', 1, 'AST-2026-0001', 'Rahul Kumar', 'DCA (Diploma in Computer Application)', '8 months', '2025-09-15', '2025-09-01', 'A', 85.50, 'VERIFY-AST2026-0001-DCA', TRUE),
('CERT-2025-0002', 2, 'AST-2026-0002', 'Priya Sharma', 'Web Development HTML, CSS, JavaScript', '3 months', '2025-10-20', '2025-10-10', 'B+', 78.00, 'VERIFY-AST2026-0002-WD', TRUE);

-- ===================================
-- VIEWS FOR EASY QUERIES
-- ===================================

-- Active Students View
CREATE OR REPLACE VIEW active_students AS
SELECT 
    s.*,
    c.course_code,
    c.course_category,
    DATEDIFF(s.end_date, CURDATE()) as days_remaining
FROM students s
LEFT JOIN courses c ON s.course_id = c.id
WHERE s.status = 'active';

-- Student Dashboard Summary
CREATE OR REPLACE VIEW student_summary AS
SELECT 
    status,
    COUNT(*) as total_students,
    SUM(course_fee) as total_revenue,
    SUM(fee_paid) as collected_revenue,
    SUM(fee_remaining) as pending_revenue
FROM students
GROUP BY status;

-- Course Enrollment Statistics
CREATE OR REPLACE VIEW course_statistics AS
SELECT 
    c.course_name,
    c.course_code,
    COUNT(s.id) as enrolled_students,
    SUM(s.fee_paid) as revenue_generated,
    c.course_fee as course_fee
FROM courses c
LEFT JOIN students s ON c.course_name = s.course_name
GROUP BY c.id, c.course_name, c.course_code, c.course_fee;

-- ===================================
-- SCHOLARSHIPS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS scholarships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial_number VARCHAR(20) UNIQUE NOT NULL,
    student_name VARCHAR(200) NOT NULL,
    father_name VARCHAR(200) NOT NULL,
    mother_name VARCHAR(200) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15) NOT NULL,
    address TEXT NOT NULL,
    photo_url TEXT,
    
    -- Exam Details
    exam_date DATE NOT NULL,
    exam_time TIME NOT NULL,
    exam_centre TEXT NOT NULL,
    
    -- Result Details (nullable until result is published)
    marks_obtained INT,
    total_marks INT DEFAULT 100,
    percentage DECIMAL(5, 2),
    result_status ENUM('pass', 'fail', 'pending') DEFAULT 'pending',
    
    -- Status
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    remarks TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_serial (serial_number),
    INDEX idx_exam_date (exam_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
