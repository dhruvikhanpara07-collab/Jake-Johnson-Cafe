






// ============================================
// FILE: js/auth.js
// Authentication Functions
// ============================================

// Initialize users array from storage
let registeredUsers = [];

// Load users from storage on page load
function loadUsers() {
    const stored = sessionStorage.getItem('registeredUsers');
    if (stored) {
        registeredUsers = JSON.parse(stored);
    }
    // Add demo user if not exists
    const demoExists = registeredUsers.find(u => u.email === 'user@cafe.com');
    if (!demoExists) {
        registeredUsers.push({
            email: 'user@cafe.com',
            password: 'password123',
            firstName: 'Demo',
            lastName: 'User',
            phone: '1234567890'
        });
        sessionStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
}

// User Login Function
function userLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const alertDiv = document.getElementById('loginAlert');

    // Clear previous alerts
    alertDiv.innerHTML = '';

    // Validation
    if (!email || !password) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Please fill in all fields</div>';
        return;
    }

    // Load users
    loadUsers();

    // Find user
    const user = registeredUsers.find(u => u.email === email && u.password === password);

    if (user) {
        // Success - Store user session
        const userSession = {
            email: user.email,
            name: user.firstName + ' ' + user.lastName,
            loginTime: new Date().toISOString()
        };
        
        // Store in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(userSession));
        
        alertDiv.innerHTML = '<div class="alert alert-success">Login successful! Redirecting...</div>';
        
        setTimeout(() => {
            window.location.href = 'user/home.html';
        }, 1500);
    } else {
        alertDiv.innerHTML = '<div class="alert alert-danger">Invalid email or password. Please check your credentials.</div>';
    }
}

// User Registration Function
function userRegister() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const alertDiv = document.getElementById('registerAlert');

    // Clear previous alerts
    alertDiv.innerHTML = '';

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Please fill in all fields</div>';
        return;
    }

    if (password !== confirmPassword) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Passwords do not match</div>';
        return;
    }

    if (password.length < 6) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Password must be at least 6 characters</div>';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Please enter a valid email</div>';
        return;
    }

    // Phone validation (basic)
    if (phone.length < 10) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Please enter a valid phone number</div>';
        return;
    }

    // Load existing users
    loadUsers();

    // Check if user already exists
    const existingUser = registeredUsers.find(u => u.email === email);
    if (existingUser) {
        alertDiv.innerHTML = '<div class="alert alert-danger">This email is already registered. Please login instead.</div>';
        return;
    }

    // Create new user
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        registeredAt: new Date().toISOString()
    };

    // Add to array and save
    registeredUsers.push(newUser);
    sessionStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    alertDiv.innerHTML = '<div class="alert alert-success">Registration successful! Redirecting to login...</div>';
    
    setTimeout(() => {
        window.location.href = 'user-login.html';
    }, 2000);
}

// Admin Login Function
function adminLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const alertDiv = document.getElementById('adminLoginAlert');

    // Clear previous alerts
    alertDiv.innerHTML = '';

    // Validation
    if (!email || !password) {
        alertDiv.innerHTML = '<div class="alert alert-danger">Please fill in all fields</div>';
        return;
    }

    // Demo admin credentials
    const adminEmail = 'admin@cafe.com';
    const adminPassword = 'admin123';

    if (email === adminEmail && password === adminPassword) {
        // Success - Store admin session
        const admin = {
            email: email,
            role: 'admin',
            name: 'Admin User',
            loginTime: new Date().toISOString()
        };
        
        sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
        
        alertDiv.innerHTML = '<div class="alert alert-success">Admin login successful! Redirecting...</div>';
        
        setTimeout(() => {
            window.location.href = 'admin/dashboard.html';
        }, 1500);
    } else {
        alertDiv.innerHTML = '<div class="alert alert-danger">Invalid admin credentials</div>';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize users array
    loadUsers();
    
    // User Login
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    if (loginEmail && loginPassword) {
        loginPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                userLogin();
            }
        });
    }

    // Admin Login
    const adminEmail = document.getElementById('adminEmail');
    const adminPassword = document.getElementById('adminPassword');
    
    if (adminEmail && adminPassword) {
        adminPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                adminLogin();
            }
        });
    }

    // Registration
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (confirmPassword) {
        confirmPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                userRegister();
            }
        });
    }
});