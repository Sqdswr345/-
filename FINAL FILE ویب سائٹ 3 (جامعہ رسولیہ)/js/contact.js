// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showErrorMessage('براہ کرم سب فیلڈس پر معلومات درج کریں');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showErrorMessage('براہ کرم صحیح ای میل آڈریس درج کریں');
                return;
            }

            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> بھیجا جا رہا ہے...';
            submitBtn.disabled = true;

            // Here you would typically make an API call to submit the form
            // For now, we'll just simulate a successful submission
            setTimeout(() => {
                showSuccessMessage('آپ کا فارم کامیابی سے بھیجا گیا ہے! ہم جلد ہی آپ سے رابطہ کریں گے.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Language Switcher
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would typically make an API call to change language
            // For now, we'll just simulate the language change
            switchLanguage(lang);
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
});

// Validation Functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Message Display Functions
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function showErrorMessage(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// Language Switching Function
function switchLanguage(lang) {
    // Here you would typically make an API call to change language
    // For now, we'll just simulate the language change
    const elements = {
        ur: {
            header: 'ہم سے رابطہ کریں',
            formTitle: 'رابطہ کریں',
            name: 'نام',
            email: 'ای میل',
            subject: 'موضوع',
            message: 'پیغام',
            submit: 'بھیجیں',
            success: 'آپ کا فارم کامیابی سے بھیجا گیا ہے! ہم جلد ہی آپ سے رابطہ کریں گے.',
            error: 'براہ کرم سب فیلڈس پر معلومات درج کریں'
        },
        en: {
            header: 'Contact Us',
            formTitle: 'Get in Touch',
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message',
            submit: 'Submit',
            success: 'Your form has been submitted successfully! We will contact you soon.',
            error: 'Please fill in all fields'
        },
        ar: {
            header: 'اتصل بنا',
            formTitle: 'اتصل بنا',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            subject: 'الموضوع',
            message: 'الرسالة',
            submit: 'إرسال',
            success: 'تم إرسال النموذج بنجاح! سنتصل بك قريبًا.',
            error: 'الرجاء ملء جميع الحقول'
        }
    };

    // Update text content
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.dataset.langKey;
        element.textContent = elements[lang][key];
    });
}
