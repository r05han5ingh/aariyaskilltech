// ===================================
// NAVIGATION - Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===================================
    // HERO SLIDER
    // ===================================
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle wrap around
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }
        
        // Add active class to current slide and dot
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].classList.add('active');
        }
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add('active');
        }
    }

    // Change slide function
    window.changeSlide = function(direction) {
        showSlide(currentSlideIndex + direction);
        resetSlideInterval();
    };

    // Go to specific slide
    window.currentSlide = function(index) {
        showSlide(index);
        resetSlideInterval();
    };

    // Auto slide
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            showSlide(currentSlideIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Initialize slider if slides exist
    if (slides.length > 0) {
        showSlide(0);
        startSlideInterval();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                startSlideInterval();
            });
        }
    }

    // ===================================
    // STATS COUNTER ANIMATION
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        
        // Check if target is valid
        if (isNaN(target) || !target) {
            element.textContent = '0';
            return;
        }
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target === 100 ? '%' : '+');
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // ===================================
    // COURSE FILTER
    // ===================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-detail-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                courseCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // ===================================
    // STUDENT VERIFICATION SYSTEM
    // ===================================
    const verifyForm = document.getElementById('verifyForm');
    
    // Get student database from Admin Panel (localStorage)
    function getStudentDatabase() {
        const students = localStorage.getItem('students');
        if (students) {
            return JSON.parse(students);
        }
        
        // If no data in admin panel, return sample data
        return {
            'AST-2026-0001': {
                name: 'Rahul Kumar',
                course: 'Full Stack Web Development',
                batch: 'Morning Batch (9 AM - 12 PM)',
                enrollmentDate: 'January 15, 2026',
                status: 'Active'
            },
            'AST-2026-0002': {
                name: 'Priya Sharma',
                course: 'Data Science & AI',
                batch: 'Evening Batch (5 PM - 9 PM)',
                enrollmentDate: 'January 10, 2026',
                status: 'Active'
            },
            'AST-2026-0003': {
                name: 'Amit Patel',
                course: 'Office Automation with Advance (3month)',
                batch: 'Afternoon Batch (1 PM - 4 PM)',
                enrollmentDate: 'January 5, 2026',
                status: 'Active'
            }
        };
    }
    
    if (verifyForm) {
        verifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rollNumber = document.getElementById('rollNumber').value.trim().toUpperCase();
            const verificationResult = document.getElementById('verificationResult');
            const errorResult = document.getElementById('errorResult');
            const form = document.getElementById('verifyForm');
            
            // Get latest student database from Admin Panel
            const studentDatabase = getStudentDatabase();
            
            // Check if roll number exists in database
            if (studentDatabase[rollNumber]) {
                const student = studentDatabase[rollNumber];
                
                // Hide form and error, show success result
                form.style.display = 'none';
                errorResult.style.display = 'none';
                verificationResult.style.display = 'block';
                
                // Populate student details
                document.getElementById('studentName').textContent = student.name;
                document.getElementById('displayRollNumber').textContent = rollNumber;
                document.getElementById('courseName').textContent = student.course;
                document.getElementById('batchInfo').textContent = student.batch;
                document.getElementById('enrollmentDate').textContent = student.enrollmentDate;
                document.getElementById('statusInfo').textContent = student.status;
                
            } else {
                // Hide form and success, show error
                form.style.display = 'none';
                verificationResult.style.display = 'none';
                errorResult.style.display = 'block';
            }
        });
    }

    // ===================================
    // RESET VERIFICATION FUNCTION
    // ===================================
    window.resetVerification = function() {
        const verifyForm = document.getElementById('verifyForm');
        const verificationResult = document.getElementById('verificationResult');
        const errorResult = document.getElementById('errorResult');
        const rollNumberInput = document.getElementById('rollNumber');
        
        verifyForm.style.display = 'block';
        verificationResult.style.display = 'none';
        errorResult.style.display = 'none';
        rollNumberInput.value = '';
    };

    // ===================================
    // CERTIFICATE VERIFICATION
    // ===================================
    let currentVerifiedCertNumber = null;

    const verifyCertForm = document.getElementById('verifyCertForm');
    if (verifyCertForm) {
        verifyCertForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rollNumber = document.getElementById('certRollNumber').value.trim().toUpperCase();
            const contactNumber = document.getElementById('certContactNumber').value.trim();
            
            // Get certificates from localStorage
            const certificates = JSON.parse(localStorage.getItem('certificates') || '{}');
            const students = JSON.parse(localStorage.getItem('students') || '{}');
            
            // Find certificate by roll number
            let foundCert = null;
            for (const certNum in certificates) {
                if (certificates[certNum].rollNumber === rollNumber) {
                    foundCert = certificates[certNum];
                    break;
                }
            }
            
            const form = document.getElementById('verifyCertForm');
            const resultDiv = document.getElementById('certVerificationResult');
            const errorDiv = document.getElementById('certErrorResult');
            const errorMsg = document.getElementById('certErrorMessage');
            
            if (foundCert) {
                // Check if contact number matches student record
                const student = students[rollNumber];
                if (student && student.phone === contactNumber) {
                    // Display certificate details
                    document.getElementById('certNumber').textContent = foundCert.certificateNumber;
                    document.getElementById('certStudentName').textContent = foundCert.studentName;
                    document.getElementById('certRollNo').textContent = foundCert.rollNumber;
                    document.getElementById('certCourse').textContent = foundCert.course;
                    document.getElementById('certGrade').textContent = foundCert.grade;
                    document.getElementById('certIssueDate').textContent = foundCert.issueDate;
                    
                    currentVerifiedCertNumber = foundCert.certificateNumber;
                    
                    form.style.display = 'none';
                    resultDiv.style.display = 'block';
                    errorDiv.style.display = 'none';
                } else {
                    // Contact number doesn't match
                    errorMsg.textContent = 'Contact number does not match our records.';
                    form.style.display = 'none';
                    resultDiv.style.display = 'none';
                    errorDiv.style.display = 'block';
                }
            } else {
                // Certificate not found
                errorMsg.textContent = 'No certificate found for the provided roll number.';
                form.style.display = 'none';
                resultDiv.style.display = 'none';
                errorDiv.style.display = 'block';
            }
        });
    }

    window.resetCertVerification = function() {
        const form = document.getElementById('verifyCertForm');
        const resultDiv = document.getElementById('certVerificationResult');
        const errorDiv = document.getElementById('certErrorResult');
        
        form.style.display = 'block';
        resultDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        document.getElementById('certRollNumber').value = '';
        document.getElementById('certContactNumber').value = '';
        currentVerifiedCertNumber = null;
    };

    window.viewCertificateFromVerify = function() {
        // Download/print disabled for students
        // No action
    };

    // ===================================
    // SCHOLARSHIP ADMIT CARD DOWNLOAD
    // ===================================
    let currentScholarshipSerial = null;

    window.switchVerificationType = function(type) {
        const admissionVerify = document.getElementById('admissionVerify');
        const certificateVerify = document.getElementById('certificateVerify');
        const scholarshipVerify = document.getElementById('scholarshipVerify');
        const buttons = document.querySelectorAll('.type-btn');
        
        buttons.forEach(btn => btn.classList.remove('active'));
        
        if (type === 'admission') {
            admissionVerify.style.display = 'grid';
            certificateVerify.style.display = 'none';
            scholarshipVerify.style.display = 'none';
            buttons[0].classList.add('active');
        } else if (type === 'certificate') {
            admissionVerify.style.display = 'none';
            certificateVerify.style.display = 'grid';
            scholarshipVerify.style.display = 'none';
            buttons[1].classList.add('active');
        } else if (type === 'scholarship') {
            admissionVerify.style.display = 'none';
            certificateVerify.style.display = 'none';
            scholarshipVerify.style.display = 'grid';
            buttons[2].classList.add('active');
        }
    };

    const scholarshipAdmitForm = document.getElementById('scholarshipAdmitForm');
    if (scholarshipAdmitForm) {
        scholarshipAdmitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serialNo = document.getElementById('scholarshipSerial').value.trim().toUpperCase();
            
            // Get scholarships from localStorage
            const scholarships = JSON.parse(localStorage.getItem('scholarships') || '{}');
            const scholarship = scholarships[serialNo];
            
            const form = document.getElementById('scholarshipAdmitForm');
            const resultDiv = document.getElementById('scholarshipResult');
            const errorDiv = document.getElementById('scholarshipErrorResult');
            
            if (scholarship) {
                // Display scholarship details
                document.getElementById('schSerialNo').textContent = scholarship.serialNo;
                document.getElementById('schStudentName').textContent = scholarship.studentName;
                document.getElementById('schExamDate').textContent = scholarship.examDate;
                document.getElementById('schExamTime').textContent = scholarship.examTime;
                document.getElementById('schExamCentre').textContent = scholarship.examCentre;
                
                currentScholarshipSerial = serialNo;
                
                form.style.display = 'none';
                resultDiv.style.display = 'block';
                errorDiv.style.display = 'none';
            } else {
                // Scholarship not found
                form.style.display = 'none';
                resultDiv.style.display = 'none';
                errorDiv.style.display = 'block';
            }
        });
    }

    window.resetScholarshipVerification = function() {
        const form = document.getElementById('scholarshipAdmitForm');
        const resultDiv = document.getElementById('scholarshipResult');
        const errorDiv = document.getElementById('scholarshipErrorResult');
        
        form.style.display = 'block';
        resultDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        document.getElementById('scholarshipSerial').value = '';
        currentScholarshipSerial = null;
    };

    window.downloadAdmitCard = function() {
        // Download/print disabled for students
        // No action
    };

    // ===================================
    // CONTACT FORM
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In production, send data to backend/email service
            console.log('Contact Form Data:', formData);
            
            // Show success message
            contactForm.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'flex';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                document.getElementById('formSuccess').style.display = 'none';
            }, 5000);
        });
    }

    // ===================================
    // ENROLLMENT FORM WITH EMAIL
    // ===================================
    const enrollmentForm = document.getElementById('enrollmentForm');
    
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Collect all form data
            const formData = {
                first_name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                date_of_birth: document.getElementById('dateOfBirth').value,
                gender: document.getElementById('gender').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                pincode: document.getElementById('pincode').value,
                qualification: document.getElementById('qualification').value,
                institute: document.getElementById('institute').value,
                passing_year: document.getElementById('passingYear').value,
                percentage: document.getElementById('percentage').value,
                course: document.getElementById('course').value,
                batch_time: document.getElementById('batchTime').value,
                start_date: document.getElementById('startDate').value,
                previous_experience: document.getElementById('experience')?.value || '',
                reference_source: document.getElementById('howHeard')?.value || ''
            };
            
            try {
                // Submit to API (with localStorage fallback)
                if (typeof API !== 'undefined' && API.submitEnrollment) {
                    const result = await API.submitEnrollment(formData);
                    
                    if (result.success) {
                        console.log(`✅ Enrollment submitted via ${result.source}:`, result.applicationNumber);
                        showEnrollmentSuccess(result.applicationNumber, result.message);
                        enrollmentForm.reset();
                        return;
                    }
                }
                
                // Manual fallback to localStorage if API module not loaded
                const year = new Date().getFullYear();
                const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
                const appNumber = `APP-${year}-${String(enrollments.length + 1).padStart(5, '0')}`;
                
                const enrollmentData = {
                    ...formData,
                    application_number: appNumber,
                    status: 'pending',
                    applied_at: new Date().toISOString()
                };
                
                enrollments.push(enrollmentData);
                localStorage.setItem('enrollments', JSON.stringify(enrollments));
                
                console.log('📝 Enrollment saved to localStorage:', appNumber);
                showEnrollmentSuccess(appNumber, 'Enrollment submitted successfully!');
                enrollmentForm.reset();
                
            } catch (error) {
                console.error('❌ Enrollment submission error:', error);
                alert('There was an error submitting your enrollment. Please try again.');
            }
        });
    }
    
    function showEnrollmentSuccess(applicationNumber, message = 'Enrollment Submitted Successfully!') {
        enrollmentForm.style.display = 'none';
        const successDiv = document.getElementById('enrollmentSuccess');
        if (successDiv) {
            successDiv.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-check-circle" style="font-size: 60px; color: #10b981; margin-bottom: 20px;"></i>
                    <h2 style="color: #10b981; margin-bottom: 15px;">${message}</h2>
                    <p style="font-size: 18px; margin-bottom: 10px;">Your Application Number:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #0a2540; margin-bottom: 20px;">${applicationNumber}</p>
                    <p style="color: #6b7280; margin-bottom: 30px;">We will contact you within 24 hours.</p>
                    <a href="index.html" class="btn btn-primary">Back to Home</a>
                </div>
            `;
            successDiv.style.display = 'block';
            successDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // ===================================
    // GENERATE ROLL NUMBER
    // ===================================
    function generateRollNumber() {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        return `AST-${year}-${random}`;
    }

    // ===================================
    // SEND ENROLLMENT EMAIL
    // ===================================
    async function sendEnrollmentEmail(formData, rollNumber) {
        // This function would integrate with your email service
        // For demonstration, we'll just log it
        
        const emailContent = `
            NEW STUDENT ENROLLMENT
            =====================
            
            PERSONAL INFORMATION:
            Name: ${formData.firstName} ${formData.lastName}
            Date of Birth: ${formData.dateOfBirth}
            Gender: ${formData.gender}
            
            CONTACT INFORMATION:
            Email: ${formData.email}
            Phone: ${formData.phone}
            Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}
            
            EDUCATIONAL BACKGROUND:
            Qualification: ${formData.qualification}
            Institute: ${formData.institute}
            Year of Passing: ${formData.passingYear}
            Percentage/CGPA: ${formData.percentage}
            
            COURSE DETAILS:
            Course: ${formData.course}
            Preferred Batch: ${formData.batchTime}
            Start Date: ${formData.startDate}
            Prior Experience: ${formData.experience}
            
            ADDITIONAL INFO:
            How they heard about us: ${formData.howHeard}
            Remarks: ${formData.remarks || 'None'}
            
            GENERATED ROLL NUMBER: ${rollNumber}
            Submission Date: ${formData.submissionDate}
        `;
        
        console.log('Email to be sent to institute:', emailContent);
        
        // In production, you would call your email API here
        // Example with fetch to your backend:
        /*
        try {
            const response = await fetch('YOUR_BACKEND_API/send-enrollment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'aariyaskilltech@gmail.com',
                    subject: 'New Student Enrollment',
                    content: emailContent,
                    studentEmail: formData.email,
                    rollNumber: rollNumber
                })
            });
            
            if (response.ok) {
                console.log('Email sent successfully');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
        */
    }

    // ===================================
    // FAQ ACCORDION
    // ===================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
            });
        });
    }

    // ===================================
    // SMOOTH SCROLL
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // FORM VALIDATION ENHANCEMENTS
    // ===================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('invalid', function(e) {
                e.preventDefault();
                this.classList.add('error');
            });
            
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('error');
                }
            });
        });
    });

    // ===================================
    // SCROLL TO TOP BUTTON
    // ===================================
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    // ===================================
    // PAGE LOAD ANIMATION
    // ===================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===================================
    // PHONE NUMBER VALIDATION
    // ===================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // ===================================
    // DATE VALIDATION - No past dates for start date
    // ===================================
    const startDateInput = document.getElementById('startDate');
    
    if (startDateInput) {
        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
    }

    // ===================================
    // RECENT ADMISSIONS TICKER
    // ===================================
    function loadAdmissionsTicker() {
        const ticker = document.getElementById('admissionsTicker');
        if (!ticker) return;

        const students = JSON.parse(localStorage.getItem('students') || '{}');
        const studentsArray = Object.values(students);
        
        // Sort by enrollment date (newest first) and take last 10
        const recentStudents = studentsArray
            .sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate))
            .slice(0, 10);

        if (recentStudents.length === 0) {
            ticker.innerHTML = `
                <div class="ticker-item">
                    <i class="fas fa-user-graduate"></i>
                    <div class="ticker-details">
                        <span class="ticker-name">No recent admissions</span>
                        <span class="ticker-course">Be the first to enroll!</span>
                    </div>
                </div>
            `.repeat(3);
            return;
        }

        // Create ticker items
        let tickerHTML = '';
        // Duplicate the list twice for seamless infinite scroll
        for (let i = 0; i < 2; i++) {
            recentStudents.forEach(student => {
                tickerHTML += `
                    <div class="ticker-item">
                        <i class="fas fa-user-graduate"></i>
                        <div class="ticker-details">
                            <span class="ticker-name">${student.name}</span>
                            <span class="ticker-course">${student.course}</span>
                        </div>
                    </div>
                `;
            });
        }
        
        ticker.innerHTML = tickerHTML;
    }

    // Load ticker on page load
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        loadAdmissionsTicker();
        
        // Refresh ticker every 30 seconds to show new admissions
        setInterval(loadAdmissionsTicker, 30000);
    }
});

// ===================================
// EMAILJS SETUP INSTRUCTIONS
// ===================================
/*
To enable email functionality:

1. Sign up at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - {{to_email}}
   - {{from_name}}
   - {{from_email}}
   - {{course}}
   - {{phone}}
   - {{message}}
4. Get your Public Key, Service ID, and Template ID
5. Add this script to your HTML files (before closing </body> tag):
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
     emailjs.init('YOUR_PUBLIC_KEY');
   </script>
6. Uncomment the emailjs.send() code in the enrollment form handler above

Alternative email solutions:
- Formspree: https://formspree.io/
- Your own backend API with Node.js + Nodemailer
- PHP mail() function
- Google Apps Script
*/

// ===================================
// SCHOLARSHIP ADMIT CARD DOWNLOAD (Homepage)
// ===================================
let currentVerifiedScholarship = null;

if (document.getElementById('scholarshipDownloadForm')) {
    document.getElementById('scholarshipDownloadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('scholarshipName').value.trim();
        const serial = document.getElementById('scholarshipSerial').value.trim().toUpperCase();
        
        // Get all scholarships from localStorage
        const scholarships = JSON.parse(localStorage.getItem('scholarships') || '{}');
        
        // Check if serial exists
        if (scholarships[serial]) {
            const scholarship = scholarships[serial];
            
            // Verify name matches (case-insensitive)
            if (scholarship.studentName.toLowerCase() === name.toLowerCase()) {
                // Match found!
                window.currentVerifiedScholarship = serial;
                
                // Display success result
                document.getElementById('verifiedName').textContent = scholarship.studentName;
                document.getElementById('verifiedSerial').textContent = scholarship.serialNo;
                document.getElementById('verifiedDate').textContent = scholarship.examDate;
                document.getElementById('verifiedTime').textContent = scholarship.examTime;
                document.getElementById('verifiedCentre').textContent = scholarship.examCentre;
                
                // Show result, hide form and error
                document.getElementById('scholarshipResult').style.display = 'block';
                document.getElementById('scholarshipError').style.display = 'none';
                document.getElementById('scholarshipDownloadForm').style.display = 'none';
            } else {
                // Serial exists but name doesn't match
                showScholarshipError();
            }
        } else {
            // Serial not found
            showScholarshipError();
        }
    });
}

function showScholarshipError() {
    document.getElementById('scholarshipError').style.display = 'block';
    document.getElementById('scholarshipResult').style.display = 'none';
}

function resetScholarshipForm() {
    // Reset form
    if (document.getElementById('scholarshipDownloadForm')) {
        document.getElementById('scholarshipDownloadForm').reset();
    }
    
    // Hide all result displays
    document.getElementById('scholarshipResult').style.display = 'none';
    document.getElementById('scholarshipError').style.display = 'none';
    
    // Show form again
    if (document.getElementById('scholarshipDownloadForm')) {
        document.getElementById('scholarshipDownloadForm').style.display = 'block';
    }
    
    // Clear current verification
    window.currentVerifiedScholarship = null;
}

// ===================================
// EXAM RESULT VERIFICATION (Homepage)
// ===================================
if (document.getElementById('resultVerifyForm')) {
    document.getElementById('resultVerifyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('resultName').value.trim();
        const serial = document.getElementById('resultSerial').value.trim().toUpperCase();
        
        // Get scholarship results from localStorage
        const results = JSON.parse(localStorage.getItem('scholarshipResults') || '{}');
        
        // Check if result exists for this serial
        if (results[serial]) {
            const result = results[serial];
            
            // Get student details from scholarships
            const scholarships = JSON.parse(localStorage.getItem('scholarships') || '{}');
            const scholarship = scholarships[serial];
            
            if (scholarship) {
                // Verify name matches (case-insensitive)
                if (scholarship.studentName.toLowerCase() === name.toLowerCase()) {
                    // Match found!
                    document.getElementById('resultVerifiedName').textContent = scholarship.studentName;
                    document.getElementById('resultVerifiedSerial').textContent = serial;
                    document.getElementById('resultMarks').textContent = result.marks;
                    document.getElementById('resultScholarship').textContent = result.scholarship;
                    document.getElementById('resultMonthlyFee').textContent = result.monthlyFee;
                    document.getElementById('resultAdmissionFee').textContent = result.admissionFee;
                    
                    // Show success result
                    document.getElementById('resultSuccess').style.display = 'block';
                    document.getElementById('resultError').style.display = 'none';
                    document.getElementById('resultVerifyForm').style.display = 'none';
                } else {
                    // Name doesn't match
                    showResultError();
                }
            } else {
                // Scholarship not found
                showResultError();
            }
        } else {
            // Result not found
            showResultError();
        }
    });
}

function showResultError() {
    document.getElementById('resultError').style.display = 'block';
    document.getElementById('resultSuccess').style.display = 'none';
}

function resetResultForm() {
    // Reset form
    if (document.getElementById('resultVerifyForm')) {
        document.getElementById('resultVerifyForm').reset();
    }
    
    // Hide all result displays
    document.getElementById('resultSuccess').style.display = 'none';
    document.getElementById('resultError').style.display = 'none';
    
    // Show form again
    if (document.getElementById('resultVerifyForm')) {
        document.getElementById('resultVerifyForm').style.display = 'block';
    }
}

// ===================================
// DOWNLOAD FUNCTIONS FOR SCHOLARSHIP DOCUMENTS
// ===================================
function downloadScholarshipAdmitCard() {
    // Use the serial from the verified scholarship (set after successful verification)
    if (window.currentVerifiedScholarship) {
        window.open(`scholarship-admit-card.html?serial=${encodeURIComponent(window.currentVerifiedScholarship)}`, '_blank');
    } else {
        alert('No serial number found for admit card.');
    }
}

function downloadScholarshipResult() {
    // Download/print disabled for students
    // No action
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
