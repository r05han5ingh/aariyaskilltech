// ===================================
// AARIYA SKILLTECH ACADEMY - SERVER
// ===================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const db = require('./db/config');

// Import routes
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const certificateRoutes = require('./routes/certificates');
const enrollmentRoutes = require('./routes/enrollments');
const attendanceRoutes = require('./routes/attendance');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard');
const contactRoutes = require('./routes/contact');
const scholarshipRoutes = require('./routes/scholarships');
const settingsRoutes = require('./routes/settings');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// ===================================
// MIDDLEWARE
// ===================================

// CORS Configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ===================================
// API ROUTES
// ===================================

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/settings', settingsRoutes);

// ===================================
// ROOT ROUTE
// ===================================

app.get('/api', (req, res) => {
    res.json({
        message: 'Aariya SkillTech Academy API',
        version: '1.0.0',
        endpoints: {
            students: '/api/students',
            courses: '/api/courses',
            certificates: '/api/certificates',
            enrollments: '/api/enrollments',
            attendance: '/api/attendance',
            payments: '/api/payments',
            admin: '/api/admin',
            dashboard: '/api/dashboard',
            contact: '/api/contact',
            scholarships: '/api/scholarships',
            settings: '/api/settings'
        }
    });
});

// ===================================
// SERVE HTML PAGES
// ===================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// ===================================
// ERROR HANDLING
// ===================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ===================================
// START SERVER
// ===================================

async function startServer() {
    try {
        // Test database connection
        const dbConnected = await db.testConnection();
        
        if (!dbConnected) {
            console.error('⚠️  Warning: Database connection failed. Server will start but database operations will not work.');
            console.log('💡 Make sure to:');
            console.log('   1. Install MySQL');
            console.log('   2. Run: npm run db:setup');
            console.log('   3. Check .env configuration\n');
        }
        
        // Start server and handle common listen errors
        const server = app.listen(PORT, () => {
            console.log('═══════════════════════════════════════════');
            console.log('  🎓 AARIYA SKILLTECH ACADEMY SERVER');
            console.log('═══════════════════════════════════════════');
            console.log(`  🚀 Server running on port ${PORT}`);
            console.log(`  🌐 Local: http://localhost:${PORT}`);
            console.log(`  📡 API: http://localhost:${PORT}/api`);
            console.log('═══════════════════════════════════════════\n');
        });

        server.on('error', (err) => {
            if (err && err.code === 'EADDRINUSE') {
                console.error(`\n❌ Port ${PORT} is already in use.`);
                console.error('   -> Stop the process using the port or change PORT in your .env file.');
                console.error('   -> To find and kill the process on Windows:');
                console.error('      netstat -ano | findstr :' + PORT);
                console.error('      taskkill /PID <PID> /F\n');
            } else {
                console.error('Server error:', err);
            }
            process.exit(1);
        });
        
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down server...');
    await db.closeConnection();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down server...');
    await db.closeConnection();
    process.exit(0);
});

// Start the server
startServer();

module.exports = app;
