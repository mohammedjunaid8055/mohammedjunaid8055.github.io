/**
 * DEVELOPER PORTFOLIO - MOHAMMED JUNAID
 * Client-Side Interactive Script (Minimalist, Plagiarism-free, and Fast)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Light / Dark Mode Toggle)
    initTheme();

    // 2. Sticky Header active class management
    initScrollHeader();

    // 3. Contact Form Submission simulation
    initContactForm();

    // 4. Mobile Menu Navigation
    initMobileNav();

    // 5. Scroll Reveal animations
    initScrollReveal();
});

/* ==========================================================================
   1. Theme Management
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check local storage or default to system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggleIcon(savedTheme);
    } else if (systemPrefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeToggleIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeToggleIcon('light');
    }

    // Toggle theme button listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleIcon(newTheme);
        });
    }
}

function updateThemeToggleIcon(theme) {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    if (theme === 'dark') {
        themeToggleBtn.textContent = 'Light';
        themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
        themeToggleBtn.textContent = 'Dark';
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
}

/* ==========================================================================
   2. Sticky Header Active Scroll States
   ========================================================================== */
function initScrollHeader() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Stick header style on scrolling down
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight Active link in nav based on section intersection
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   3. Contact Form Submission
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const formStatus = document.getElementById('form-status');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');

        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            showFormStatus('Please fill in all fields.', 'error');
            return;
        }

        // Real contact submission using Web3Forms
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const formData = new FormData(contactForm);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            } else {
                showFormStatus(json.message || 'Something went wrong. Please try again.', 'error');
            }
        })
        .catch((error) => {
            console.error(error);
            showFormStatus('Unable to send message. Please check your connection.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });

    function showFormStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = 'form-status-msg'; // Reset class
        formStatus.classList.add(type);
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

/* ==========================================================================
   4. Mobile Responsive Navigation Toggle
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Disable body scroll when menu is active
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

/* ==========================================================================
   5. Scroll Reveal animations (Lightweight, Observer-based)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once animated to save cycles
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -40px 0px'
        });
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older legacy browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

