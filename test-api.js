// ===================================
// API TEST SCRIPT
// ===================================

const http = require('http');

const API_BASE = 'http://localhost:3000/api';

// Color codes for console
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m'
};

// Make HTTP request
function makeRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(endpoint, API_BASE);
        const options = {
            hostname: url.hostname,
            port: url.port || 3000,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(body)
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

// Test functions
async function testAPI() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${colors.blue}🧪 TESTING AARIYA SKILLTECH ACADEMY API${colors.reset}`);
    console.log(`${'='.repeat(60)}\n`);

    let passed = 0;
    let failed = 0;

    // Test 1: API Root
    try {
        console.log('Test 1: API Root Endpoint...');
        const result = await makeRequest('/');
        if (result.status === 200 && result.data.message) {
            console.log(`${colors.green}✅ PASSED${colors.reset} - API is running\n`);
            passed++;
        } else {
            console.log(`${colors.red}❌ FAILED${colors.reset}\n`);
            failed++;
        }
    } catch (error) {
        console.log(`${colors.red}❌ FAILED${colors.reset} - ${error.message}\n`);
        failed++;
    }

    // Test 2: Get All Students
    try {
        console.log('Test 2: Get All Students...');
        const result = await makeRequest('/students');
        if (result.status === 200 && result.data.success) {
            console.log(`${colors.green}✅ PASSED${colors.reset} - Found ${result.data.count} students\n`);
            passed++;
        } else {
            console.log(`${colors.red}❌ FAILED${colors.reset}\n`);
            failed++;
        }
    } catch (error) {
        console.log(`${colors.red}❌ FAILED${colors.reset} - ${error.message}\n`);
        failed++;
    }

    // Test 3: Get All Courses
    try {
        console.log('Test 3: Get All Courses...');
        const result = await makeRequest('/courses');
        if (result.status === 200 && result.data.success) {
            console.log(`${colors.green}✅ PASSED${colors.reset} - Found ${result.data.count} courses\n`);
            passed++;
        } else {
            console.log(`${colors.red}❌ FAILED${colors.reset}\n`);
            failed++;
        }
    } catch (error) {
        console.log(`${colors.red}❌ FAILED${colors.reset} - ${error.message}\n`);
        failed++;
    }

    // Test 4: Get Student by Roll Number
    try {
        console.log('Test 4: Get Student by Roll Number...');
        const result = await makeRequest('/students/roll/AST-2026-0001');
        if (result.status === 200 && result.data.success) {
            console.log(`${colors.green}✅ PASSED${colors.reset} - Found student: ${result.data.student.first_name} ${result.data.student.last_name}\n`);
            passed++;
        } else {
            console.log(`${colors.red}❌ FAILED${colors.reset}\n`);
            failed++;
        }
    } catch (error) {
        console.log(`${colors.red}❌ FAILED${colors.reset} - ${error.message}\n`);
        failed++;
    }

    // Test 5: Dashboard Statistics
    try {
        console.log('Test 5: Dashboard Statistics...');
        const result = await makeRequest('/dashboard/stats');
        if (result.status === 200 && result.data.success) {
            console.log(`${colors.green}✅ PASSED${colors.reset} - Dashboard data retrieved\n`);
            passed++;
        } else {
            console.log(`${colors.red}❌ FAILED${colors.reset}\n`);
            failed++;
        }
    } catch (error) {
        console.log(`${colors.red}❌ FAILED${colors.reset} - ${error.message}\n`);
        failed++;
    }

    // Test 6: Admin Login
    try {
        console.log('Test 6: Admin Login...');
        const result = await makeRequest('/admin/login', 'POST', {
            username: 'admin',
            password: 'admin@123'
        });
        if (result.status === 200 && result.data.success) {
            console.log(`${colors.green}✅ PASSED${colors.reset} - Admin login successful\n`);
            passed++;
        } else {
            console.log(`${colors.red}❌ FAILED${colors.reset}\n`);
            failed++;
        }
    } catch (error) {
        console.log(`${colors.red}❌ FAILED${colors.reset} - ${error.message}\n`);
        failed++;
    }

    // Results
    console.log(`${'='.repeat(60)}`);
    console.log(`${colors.blue}📊 TEST RESULTS${colors.reset}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`${colors.green}✅ Passed: ${passed}${colors.reset}`);
    console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
    console.log(`${colors.yellow}📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%${colors.reset}`);
    console.log(`${'='.repeat(60)}\n`);

    if (failed === 0) {
        console.log(`${colors.green}🎉 All tests passed! API is working correctly.${colors.reset}\n`);
    } else {
        console.log(`${colors.yellow}⚠️  Some tests failed. Check server connection and database.${colors.reset}\n`);
    }
}

// Run tests
console.log(`${colors.yellow}⏳ Starting API tests...${colors.reset}`);
console.log(`${colors.yellow}⚠️  Make sure the server is running: npm start${colors.reset}`);

setTimeout(() => {
    testAPI().catch(error => {
        console.error(`${colors.red}❌ Test suite failed:${colors.reset}`, error.message);
        console.log(`\n${colors.yellow}💡 Troubleshooting:${colors.reset}`);
        console.log('   1. Make sure server is running: npm start');
        console.log('   2. Check if database is set up: npm run db:setup');
        console.log('   3. Verify .env configuration\n');
    });
}, 1000);
