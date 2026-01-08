// ===================================
// API CONFIGURATION
// ===================================

const API_CONFIG = {
    baseURL: 'http://localhost:3001/api',
    timeout: 5000,
    useAPI: true // Set to false to use localStorage only
};

// Check if API server is available
async function checkAPIAvailability() {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}/`, { 
            method: 'GET',
            signal: AbortSignal.timeout(API_CONFIG.timeout)
        });
        return response.ok;
    } catch (error) {
        console.warn('API server not available, using localStorage fallback');
        return false;
    }
}

// ===================================
// API HELPER FUNCTIONS
// ===================================

async function apiRequest(endpoint, options = {}) {
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(API_CONFIG.timeout)
    };

    try {
        const response = await fetch(url, { ...defaultOptions, ...options });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return { success: true, data };
    } catch (error) {
        console.error('API Error:', error.message);
        return { success: false, error: error.message };
    }
}

// ===================================
// ENROLLMENT API
// ===================================

async function submitEnrollmentToAPI(enrollmentData) {
    const isAPIAvailable = await checkAPIAvailability();
    
    if (isAPIAvailable && API_CONFIG.useAPI) {
        // Try API first
        const result = await apiRequest('/enrollments', {
            method: 'POST',
            body: JSON.stringify(enrollmentData)
        });
        
        if (result.success) {
            console.log('✅ Enrollment saved to database');
            return {
                success: true,
                source: 'api',
                applicationNumber: result.data.applicationNumber,
                message: 'Enrollment submitted successfully!'
            };
        }
    }
    
    // Fallback to localStorage
    console.log('💾 Using localStorage fallback');
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    
    // Generate application number
    const year = new Date().getFullYear();
    const appNumber = `APP-${year}-${String(enrollments.length + 1).padStart(5, '0')}`;
    
    const enrollment = {
        ...enrollmentData,
        application_number: appNumber,
        applied_at: new Date().toISOString(),
        status: 'pending'
    };
    
    enrollments.push(enrollment);
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    
    return {
        success: true,
        source: 'localStorage',
        applicationNumber: appNumber,
        message: 'Enrollment submitted successfully (offline mode)!'
    };
}

async function getEnrollmentsFromAPI(status = null) {
    const isAPIAvailable = await checkAPIAvailability();
    
    if (isAPIAvailable && API_CONFIG.useAPI) {
        const endpoint = status ? `/enrollments?status=${status}` : '/enrollments';
        const result = await apiRequest(endpoint, { method: 'GET' });
        
        if (result.success) {
            console.log('✅ Fetched enrollments from database');
            return {
                success: true,
                source: 'api',
                enrollments: result.data.enrollments || []
            };
        }
    }
    
    // Fallback to localStorage
    console.log('💾 Using localStorage fallback');
    let enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    
    if (status) {
        enrollments = enrollments.filter(e => e.status === status);
    }
    
    return {
        success: true,
        source: 'localStorage',
        enrollments: enrollments
    };
}

async function updateEnrollmentStatusAPI(id, status, remarks = '') {
    const isAPIAvailable = await checkAPIAvailability();
    
    if (isAPIAvailable && API_CONFIG.useAPI) {
        const result = await apiRequest(`/enrollments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status, remarks })
        });
        
        if (result.success) {
            console.log('✅ Enrollment status updated in database');
            return { success: true, source: 'api' };
        }
    }
    
    // Fallback to localStorage
    console.log('💾 Using localStorage fallback');
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const index = enrollments.findIndex(e => e.id === id || e.application_number === id);
    
    if (index !== -1) {
        enrollments[index].status = status;
        enrollments[index].remarks = remarks;
        enrollments[index].updated_at = new Date().toISOString();
        localStorage.setItem('enrollments', JSON.stringify(enrollments));
        return { success: true, source: 'localStorage' };
    }
    
    return { success: false, error: 'Enrollment not found' };
}

async function approveEnrollmentAPI(id) {
    const isAPIAvailable = await checkAPIAvailability();
    
    if (isAPIAvailable && API_CONFIG.useAPI) {
        const result = await apiRequest(`/enrollments/${id}/approve`, {
            method: 'POST'
        });
        
        if (result.success) {
            console.log('✅ Enrollment approved and student created');
            return {
                success: true,
                source: 'api',
                rollNumber: result.data.rollNumber,
                studentId: result.data.studentId
            };
        }
    }
    
    // Fallback to localStorage - create student record
    console.log('💾 Using localStorage fallback');
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const enrollment = enrollments.find(e => e.id === id || e.application_number === id);
    
    if (!enrollment) {
        return { success: false, error: 'Enrollment not found' };
    }
    
    // Generate roll number
    const students = JSON.parse(localStorage.getItem('students') || '{}');
    const year = new Date().getFullYear();
    const rollNumber = `AST-${year}-${String(Object.keys(students).length + 1).padStart(4, '0')}`;
    
    // Create student record
    students[rollNumber] = {
        name: `${enrollment.first_name} ${enrollment.last_name}`,
        email: enrollment.email,
        phone: enrollment.phone,
        course: enrollment.course,
        batch: enrollment.batch_time,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'Active'
    };
    
    localStorage.setItem('students', JSON.stringify(students));
    
    // Update enrollment status
    const index = enrollments.findIndex(e => e.application_number === enrollment.application_number);
    if (index !== -1) {
        enrollments[index].status = 'converted';
        enrollments[index].roll_number = rollNumber;
        localStorage.setItem('enrollments', JSON.stringify(enrollments));
    }
    
    return {
        success: true,
        source: 'localStorage',
        rollNumber: rollNumber
    };
}

// ===================================
// STUDENTS API
// ===================================

async function getStudentsFromAPI(filters = {}) {
    const isAPIAvailable = await checkAPIAvailability();
    
    if (isAPIAvailable && API_CONFIG.useAPI) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/students?${queryParams}` : '/students';
        const result = await apiRequest(endpoint, { method: 'GET' });
        
        if (result.success) {
            console.log('✅ Fetched students from database');
            return {
                success: true,
                source: 'api',
                students: result.data.students || []
            };
        }
    }
    
    // Fallback to localStorage
    console.log('💾 Using localStorage fallback');
    const students = JSON.parse(localStorage.getItem('students') || '{}');
    const studentArray = Object.entries(students).map(([rollNumber, data]) => ({
        roll_number: rollNumber,
        ...data
    }));
    
    return {
        success: true,
        source: 'localStorage',
        students: studentArray
    };
}

async function addStudentToAPI(studentData) {
    const isAPIAvailable = await checkAPIAvailability();
    
    if (isAPIAvailable && API_CONFIG.useAPI) {
        const result = await apiRequest('/students', {
            method: 'POST',
            body: JSON.stringify(studentData)
        });
        
        if (result.success) {
            console.log('✅ Student added to database');
            return {
                success: true,
                source: 'api',
                rollNumber: result.data.rollNumber,
                studentId: result.data.studentId
            };
        }
    }
    
    // Fallback to localStorage
    console.log('💾 Using localStorage fallback');
    const students = JSON.parse(localStorage.getItem('students') || '{}');
    const year = new Date().getFullYear();
    const rollNumber = studentData.roll_number || `AST-${year}-${String(Object.keys(students).length + 1).padStart(4, '0')}`;
    
    students[rollNumber] = {
        name: `${studentData.first_name} ${studentData.last_name}`,
        ...studentData
    };
    
    localStorage.setItem('students', JSON.stringify(students));
    
    return {
        success: true,
        source: 'localStorage',
        rollNumber: rollNumber
    };
}

// ===================================
// CONTACT API
// ===================================

async function submitContactToAPI(contactData) {
    const isAPIAvailable = await checkAPIAvailability();
    
    if (isAPIAvailable && API_CONFIG.useAPI) {
        const result = await apiRequest('/contact', {
            method: 'POST',
            body: JSON.stringify(contactData)
        });
        
        if (result.success) {
            console.log('✅ Contact message saved to database');
            return { success: true, source: 'api' };
        }
    }
    
    // Fallback to localStorage
    console.log('💾 Using localStorage fallback');
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
        ...contactData,
        id: Date.now(),
        created_at: new Date().toISOString(),
        status: 'new'
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    return { success: true, source: 'localStorage' };
}

// ===================================
// EXPORT FOR GLOBAL USE
// ===================================

window.API = {
    submitEnrollment: submitEnrollmentToAPI,
    getEnrollments: getEnrollmentsFromAPI,
    updateEnrollmentStatus: updateEnrollmentStatusAPI,
    approveEnrollment: approveEnrollmentAPI,
    getStudents: getStudentsFromAPI,
    addStudent: addStudentToAPI,
    submitContact: submitContactToAPI,
    checkAvailability: checkAPIAvailability
};

console.log('🚀 API Configuration loaded');
console.log('📡 API Base URL:', API_CONFIG.baseURL);
