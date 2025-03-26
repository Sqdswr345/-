// Always show welcome page on index.html load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on index.html
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        // Check if welcome has been shown this session
        const welcomeShown = sessionStorage.getItem('welcomeShown');
        
        if (!welcomeShown) {
            // Set flag that welcome has been shown
            sessionStorage.setItem('welcomeShown', 'true');
            
            // Show welcome page for 3 seconds
            window.location.href = 'welcome.html';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
            return;
        }
    }

    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
        localStorage.setItem('hasVisited', 'true');
        // window.location.href = 'welcome.html';
        // return;
    }

    // Navigation hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Mobile Navigation
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    const closeMobileMenu = (e) => {
        if (hamburger.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    };

    document.addEventListener('click', closeMobileMenu);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // WhatsApp Form Submission
    function sendToWhatsApp(formData) {
        const whatsappNumber = '+966531842308';
        let message = '*جامعہ رسولیہ شیرازیہ رضویہ - داخلہ فارم*\n\n';

        // Format the form data
        Object.keys(formData).forEach(key => {
            const value = formData[key];
            if (value) {
                message += `*${key}*: ${value}\n`;
            }
        });

        // Encode the message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
    }

    // Form Submission Handler
    document.getElementById('admissionForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const formObject = {};

        // Convert FormData to object
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Send to WhatsApp
        sendToWhatsApp(formObject);

        // Show success message
        alert('شکریہ! آپ کا فارم واتس اپ پر بھیج دیا گیا ہے۔ ہم جلد ہی آپ سے رابطہ کریں گے۔');

        // Reset form
        this.reset();
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('آپ کا پیغام موصول ہو گیا ہے۔ ہم جلد ہی آپ سے رابطہ کریں گے۔');
            contactForm.reset();
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#fff';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // Dynamic faculty loading
    const facultyMembers = [
        {
            name: 'مولانا احمد خان',
            position: 'ڈین اسلامی علوم',
            image: 'images/faculty1.jpg'
        },
        {
            name: 'پروفیسر سارہ احمد',
            position: 'سربراہ شعبہ عربی',
            image: 'images/faculty2.jpg'
        },
        {
            name: 'مولانا محمد علی',
            position: 'سینئر اسلامک اسکالر',
            image: 'images/faculty3.jpg'
        }
    ];

    // Load faculty members
    const facultyGrid = document.querySelector('.faculty-grid');
    if (facultyGrid) {
        facultyMembers.forEach(member => {
            const facultyCard = document.createElement('div');
            facultyCard.className = 'faculty-card';
            facultyCard.innerHTML = `
                <div class="faculty-image">
                    <img src="${member.image}" alt="${member.name}" onerror="this.src='images/default-avatar.jpg'">
                </div>
                <h3>${member.name}</h3>
                <p>${member.position}</p>
            `;
            facultyGrid.appendChild(facultyCard);
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Updates Slider
    let currentUpdate = 1;
    const updateItems = document.querySelectorAll('.update-item');
    const totalUpdates = updateItems.length;
    const seeAllBtn = document.querySelector('.see-all-updates-btn');

    function showNextUpdate() {
        // Remove active class from current update
        const current = document.querySelector('.update-item.active');
        if (current) {
            current.classList.remove('active');
        }

        // Calculate next update
        currentUpdate = (currentUpdate % totalUpdates) + 1;
        
        // Add active class to next update
        const nextUpdate = document.querySelector(`.update-item[data-update="${currentUpdate}"]`);
        if (nextUpdate) {
            nextUpdate.classList.add('active');
        }
    }

    // Start the update slider
    setInterval(showNextUpdate, 2000);

    // Updates Modal
    const updatesModal = document.createElement('div');
    updatesModal.className = 'updates-modal';

    const modalContent = `
        <div class="updates-modal-content">
            <div class="updates-modal-header">
                <h2 class="updates-modal-title">تمام اپڈیٹس</h2>
                <button class="close-updates-btn">&times;</button>
            </div>
            <ul class="updates-list">
                <li class="update-card">
                    <h3>نئے طالب علم کے لیے داخلے کی شروعات</h3>
                    <p>جامعہ رسولیہ شیرازیہ رضویہ میں نئے طالب علم کے لیے داخلے کی شروعات ہو گئی ہیں۔ تمام معلومات کے لیے داخلہ پیج پر جائیں۔</p>
                    <span class="update-date">23 مارچ 2025</span>
                </li>
                <li class="update-card">
                    <h3>انٹر نیٹ فیسٹیول کی تیاریاں</h3>
                    <p>جامعہ کے انٹر نیٹ فیسٹیول کی تیاریاں فروری میں شروع ہوئی ہیں۔ تمام طالب علم سے شرکت کرنے کی ترغیب ہے۔</p>
                    <span class="update-date">25 مارچ 2025</span>
                </li>
                <li class="update-card">
                    <h3>مرکزی لائبریری میں نئی کتب کا اضافہ</h3>
                    <p>مرکزی لائبریری میں نئی کتب کا اضافہ کیا گیا ہے۔ تمام طالب علم کو ایکسیس کے لیے رجسٹر ہونا چاہئے۔</p>
                    <span class="update-date">28 مارچ 2025</span>
                </li>
            </ul>
        </div>
    `;

    updatesModal.innerHTML = modalContent;
    document.body.appendChild(updatesModal);

    // Show Updates Modal
    seeAllBtn.addEventListener('click', () => {
        updatesModal.style.display = 'block';
    });

    // Close Updates Modal
    const closeBtn = updatesModal.querySelector('.close-updates-btn');
    closeBtn.addEventListener('click', () => {
        updatesModal.style.display = 'none';
    });

    // Close Modal when clicking outside
    updatesModal.addEventListener('click', (e) => {
        if (e.target === updatesModal) {
            updatesModal.style.display = 'none';
        }
    });
});

// Language Switcher
const languageSwitcher = {
    ur: {
        home: 'ہوم',
        about: 'تعارف',
        admission: 'داخلہ',
        results: 'نتائج',
        gallery: 'گیلری',
        donation: 'عطیات',
        portal: 'طالب علم پورٹل',
        contact: 'رابطہ',
        joinUs: 'ہمارے ساتھ شامل ہوں',
        exploreOnline: 'آن لائن تعلیم',
        // Add more translations as needed
    },
    en: {
        home: 'Home',
        about: 'About',
        admission: 'Admission',
        results: 'Results',
        gallery: 'Gallery',
        donation: 'Donation',
        portal: 'Student Portal',
        contact: 'Contact',
        joinUs: 'Join Us',
        exploreOnline: 'Explore Online',
        // Add more translations as needed
    },
    ar: {
        home: 'الرئيسية',
        about: 'حول',
        admission: 'القبول',
        results: 'النتائج',
        gallery: 'معرض الصور',
        donation: 'التبرع',
        portal: 'بوابة الطلاب',
        contact: 'اتصل بنا',
        joinUs: 'انضم إلينا',
        exploreOnline: 'استكشف عبر الإنترنت',
        // Add more translations as needed
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to Urdu
    const currentLang = localStorage.getItem('language') || 'ur';
    setLanguage(currentLang);

    // Language switcher buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Form submitted successfully!');
            this.reset();
        });
    }

    // Portal login handling
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your login logic here
            alert('Login functionality will be implemented soon.');
            this.reset();
        });
    }
});

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'rtl';
    
    // Update text content for all translatable elements
    Object.keys(languageSwitcher[lang]).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(el => {
            el.textContent = languageSwitcher[lang][key];
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.explore-card, .gallery-item, .hero-content').forEach(el => {
    observer.observe(el);
});
