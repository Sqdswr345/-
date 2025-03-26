// Global Variables
let currentFileNumber = 1;

// DOM Elements
const menuToggleBtn = document.querySelector('.menu-toggle-btn');
const menuOverlay = document.querySelector('.menu-overlay');
const portalMenu = document.querySelector('.portal-menu');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const signupForm = document.getElementById('signupForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const rememberMe = document.getElementById('rememberMe');
const phoneInputs = document.querySelectorAll('input[type="tel"]');
const fileInput = document.getElementById('fileInput');
const fileNameInput = document.getElementById('fileName');
const fileDescription = document.getElementById('fileDescription');
const uploadModal = document.getElementById('uploadModal');

// Menu Toggle Functionality
menuToggleBtn.addEventListener('click', () => {
    portalMenu.classList.toggle('show');
    menuOverlay.style.display = portalMenu.classList.contains('show') ? 'block' : 'none';
});

menuOverlay.addEventListener('click', () => {
    portalMenu.classList.remove('show');
    menuOverlay.style.display = 'none';
});

// Login Functionality
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear any previous error messages
        loginError.textContent = '';
        
        const fullName = document.getElementById('fullName').value.trim();
        const countryCode = document.getElementById('countryCode').value;
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate form inputs
        if (!fullName) {
            showError('تمام نام درج کریں');
            return;
        }

        if (!countryCode) {
            showError('ملک منتخب کریں');
            return;
        }

        if (!phone || phone.length < 10) {
            showError('صحیح فون نمبر درج کریں');
            return;
        }

        if (!password || password.length < 6) {
            showError('پاس ورڈ کم از کم 6 حروف ہونا چاہئے');
            return;
        }

        // If validation passes, proceed with login
        const formData = {
            fullName: fullName,
            phone: countryCode + phone,
            password: password
        };

        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a successful login
        simulateLogin(formData);
    });
}

// Signup Functionality
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            fatherName: document.getElementById('fatherName').value,
            phone: document.getElementById('countryCode').value + document.getElementById('phone').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            class: document.getElementById('class').value,
            rollNumber: document.getElementById('rollNumber').value
        };

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            showError('پاس ورڈ مطابقت نہیں ہے');
            return;
        }

        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a successful signup
        simulateSignup(formData);
    });
}

// Forgot Password Functionality
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('countryCode').value + document.getElementById('phone').value,
            email: document.getElementById('email').value
        };

        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a successful password reset request
        requestPasswordReset(formData);
    });
}

// Remember Me Functionality
if (rememberMe) {
    if (localStorage.getItem('rememberMe') === 'true') {
        rememberMe.checked = true;
        document.getElementById('fullName').value = localStorage.getItem('fullName');
        document.getElementById('phone').value = localStorage.getItem('phone');
        document.getElementById('countryCode').value = localStorage.getItem('countryCode');
    }

    rememberMe.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('fullName', document.getElementById('fullName').value);
            localStorage.setItem('phone', document.getElementById('phone').value);
            localStorage.setItem('countryCode', document.getElementById('countryCode').value);
        } else {
            localStorage.removeItem('fullName');
            localStorage.removeItem('phone');
            localStorage.removeItem('countryCode');
            localStorage.removeItem('rememberMe');
        }
    });
}

// Phone Number Validation
phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

// File Upload Functions
function showUploadModal() {
    const modal = new bootstrap.Modal(uploadModal);
    modal.show();
}

async function uploadFile() {
    if (!fileInput.files[0]) {
        alert('براہ کرم فائل منتخب کریں');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('fileName', fileNameInput.value);
    formData.append('description', fileDescription.value);
    formData.append('fileNumber', currentFileNumber);

    try {
        // Here you would typically make an API call to upload the file
        // For now, we'll just simulate the upload
        const fileCard = createFileCard(
            currentFileNumber,
            fileNameInput.value,
            fileDescription.value,
            fileInput.files[0].size
        );
        
        // Add the new card to the page
        const row = document.querySelector('.row');
        row.insertBefore(fileCard, row.firstChild);
        
        // Increment the file number
        currentFileNumber++;
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(uploadModal);
        modal.hide();
        
        // Clear the form
        fileInput.value = '';
        fileNameInput.value = '';
        fileDescription.value = '';
        
    } catch (error) {
        alert('فائل آپ لوڈ کرنے میں مسئلہ آیا: ' + error.message);
    }
}

function createFileCard(fileNumber, fileName, description, fileSize) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    
    const cardContent = `
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="card-title">${fileName}</h5>
                    <span class="badge bg-primary">${fileNumber}</span>
                </div>
                <p class="card-text">${description}</p>
                <p class="card-text">فائل سائز: ${(fileSize / 1024 / 1024).toFixed(1)}MB</p>
                <div class="d-flex justify-content-between mt-3">
                    <a href="#" class="btn btn-primary btn-sm">ڈاؤنلوڈ</a>
                    <button class="btn btn-danger btn-sm" onclick="deleteFile(${fileNumber})">حذف</button>
                </div>
            </div>
        </div>
    `;
    
    card.innerHTML = cardContent;
    return card;
}

function deleteFile(fileNumber) {
    if (confirm('آپ کیا یقینی ہیں کہ اس فائل کو حذف کرنا چاہیں؟')) {
        // Here you would typically make an API call to delete the file
        // For now, we'll just remove the card from the DOM
        const card = document.querySelector(`.badge:contains('${fileNumber}')`).closest('.card');
        if (card) {
            card.remove();
        }
    }
}

// Initialize file numbers based on existing files
function initializeFileNumbers() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const badge = card.querySelector('.badge');
        if (badge) {
            badge.textContent = index + 1;
            currentFileNumber = Math.max(currentFileNumber, index + 1);
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeFileNumbers();
});

// Simulation Functions (Replace with actual API calls)
function simulateLogin(data) {
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a successful login
    setTimeout(() => {
        // Store user data in localStorage
        localStorage.setItem('userFullName', data.fullName);
        localStorage.setItem('userPhone', data.phone);
        
        // Redirect to menu page
        window.location.href = 'menu.html';
    }, 1000);
}

function simulateSignup(data) {
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a successful signup
    setTimeout(() => {
        showSuccess('آپ کا اکاؤنٹ کامیابی سے بنایا گیا ہے');
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 1000);
}

function requestPasswordReset(data) {
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a successful password reset request
    setTimeout(() => {
        showSuccess('پاس ورڈ ریسیٹ کے لیے ریکوئسٹ کامیابی سے بھیجا گیا ہے');
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 1000);
}

// Utility Functions
function showError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    const form = document.querySelector('.login-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Check if user is logged in
const userName = localStorage.getItem('userFullName');
const userPhone = localStorage.getItem('userPhone');

// Get current page
const currentPage = window.location.pathname.split('/').pop();

// Handle different pages
switch (currentPage) {
    case 'login.html':
        handleLoginPage();
        break;
    case 'signup.html':
        handleSignupPage();
        break;
    case 'forgot-password.html':
        handleForgotPasswordPage();
        break;
    case 'menu.html':
        handleMenuPage();
        break;
    default:
        // If not logged in and not on login/signup page, redirect to login
        if (!userName || !userPhone) {
            window.location.href = 'login.html';
        }
}

function handleLoginPage() {
    // Login functionality is already handled above
}

function handleSignupPage() {
    // Signup functionality is already handled above
}

function handleForgotPasswordPage() {
    // Forgot password functionality is already handled above
}

function handleMenuPage() {
    // Display user name in menu
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = `خوش آمدید, ${localStorage.getItem('userFullName')}`;
    }

    // Logout Functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Clear user data from localStorage
            localStorage.removeItem('userFullName');
            localStorage.removeItem('userPhone');
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('fullName');
            localStorage.removeItem('phone');
            localStorage.removeItem('countryCode');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
}
