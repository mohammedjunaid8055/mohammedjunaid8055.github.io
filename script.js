/**
 * ==========================================================================
 * MOHAMMED JUNAID — PORTFOLIO CLIENT CONTROLLER
 * Lightweight, accessible, performant vanilla JavaScript
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTerminalConsole();
    initProjectControls();
    initContactForm();
    initCopyEmail();
    initFooterYear();
});

/* ==========================================================================
   1. Navigation & Active Section Highlight
   ========================================================================== */
function initNavigation() {
    const header = document.getElementById('site-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Header scroll appearance
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        let currentId = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

/* ==========================================================================
   2. Interactive Developer Console
   ========================================================================== */
function initTerminalConsole() {
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const history = document.getElementById('terminal-history');
    const screen = document.getElementById('terminal-screen');
    const shortcuts = document.querySelectorAll('.shortcut-pill');

    if (!form || !input || !history) return;

    const commands = {
        help: () => [
            `<span style="color: var(--blue-accent); font-weight: 600;">Available commands:</span>`,
            `  <span style="color: var(--status-green);">about</span>    : Background, education, and research focus`,
            `  <span style="color: var(--status-green);">projects</span> : Overview of active and completed software projects`,
            `  <span style="color: var(--status-green);">skills</span>   : Categorized technical arsenal and toolchains`,
            `  <span style="color: var(--status-green);">exp</span>      : IIITDM Kancheepuram internship and academic milestones`,
            `  <span style="color: var(--status-green);">certs</span>    : Official research internship certificate link`,
            `  <span style="color: var(--status-green);">contact</span>  : Email, telephone, and social profile links`,
            `  <span style="color: var(--status-green);">clear</span>    : Clear terminal screen`
        ],
        about: () => [
            `<span style="color: var(--blue-accent); font-weight: 600;">About Mohammed Junaid:</span>`,
            `• Computer Science undergraduate at IIIT Tiruchirappalli (2023–2027)`,
            `• Cumulative GPA: 7.86`,
            `• Research Intern at IIITDM Kancheepuram (FANET Routing under Dr. Preeth)`,
            `• Specializes in applied machine learning, autonomous UAV simulation, and full-stack software.`
        ],
        projects: () => [
            `<span style="color: var(--blue-accent); font-weight: 600;">Projects & Research:</span>`,
            `[1] Semantic Search Engine        : Python, FAISS, NLP, Streamlit (Working Prototype)`,
            `[2] AI Summarizer Chatbot         : Python, Node.js, OpenRouter API (Completed)`,
            `[3] Anonymous Real-Time Chat App  : Node.js, WebSockets, Docker, Minikube (Completed)`,
            `[4] Dynamic Fitness Web Platform  : Node.js, HTML, CSS (Ongoing - Docker planned)`,
            `[5] FANET Routing & ML Research   : ROS2, PX4, Gazebo, XGBoost, CatBoost (Completed)`,
            `Scroll down to the #projects section for full architecture details.`
        ],
        skills: () => [
            `<span style="color: var(--blue-accent); font-weight: 600;">Technical Arsenal:</span>`,
            `• Languages     : Python, C++, C, JavaScript, SQL`,
            `• AI / ML       : NLP, Scikit-learn, PyTorch, Pandas, NumPy, XGBoost, CatBoost`,
            `• AI Engineering: LLM API Integration, Prompt Engineering, FAISS Vector Search`,
            `• Backend / Web : Node.js, Django, React, REST APIs, WebSockets, HTML, CSS`,
            `• Databases     : MySQL, PostgreSQL, MongoDB`,
            `• Simulation    : ROS2, PX4-Autopilot, Gazebo, Docker, Minikube, Git/GitHub`
        ],
        exp: () => [
            `<span style="color: var(--blue-accent); font-weight: 600;">Experience Timeline:</span>`,
            `• Research Intern — FANET Routing and Machine Learning | IIITDM Kancheepuram (May–July 2026)`,
            `  Mentored by Dr. Preeth. Simulated 30 UAVs with ROS2, PX4, Gazebo.`,
            `  Trained 13 supervised models; achieved 78.89% overall score (~87% peak accuracy).`,
            `• B.Tech in Computer Science and Engineering | IIIT Tiruchirappalli (2023–2027) | 7.86 CGPA`,
            `• Senior Secondary (Class XI–XII) | Sri Chaitanya Junior College (2021–2023)`,
            `• Secondary School Certificate | Sri Chaitanya School (2020–2021)`
        ],
        certs: () => [
            `<span style="color: var(--blue-accent); font-weight: 600;">Verified Credential:</span>`,
            `Research Internship Certificate — IIITDM Kancheepuram`,
            `URL: <a href="https://drive.google.com/file/d/1rgyGmWBheo0aTZaNvV6C1fNQMtNaPPtc/view?usp=sharing" target="_blank" style="color: var(--blue-accent); text-decoration: underline;">https://drive.google.com/... [Open PDF] ↗</a>`
        ],
        contact: () => [
            `<span style="color: var(--blue-accent); font-weight: 600;">Contact Details:</span>`,
            `• Email    : j27557343@gmail.com`,
            `• Phone    : +91 9652134605`,
            `• Location : Tiruchirappalli, Tamil Nadu, India`,
            `• LinkedIn : https://www.linkedin.com/in/mohammad-junaid-903518294`,
            `• GitHub   : https://github.com/mohammedjunaid8055`
        ]
    };

    function runCommand(raw) {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;

        const cmdEl = document.createElement('div');
        cmdEl.className = 'log-line user';
        cmdEl.innerHTML = `<span class="term-prompt">junaid@portfolio:~$</span> ${escapeHTML(raw)}`;
        history.appendChild(cmdEl);

        if (cmd === 'clear') {
            history.innerHTML = '';
        } else if (commands[cmd]) {
            const lines = commands[cmd]();
            lines.forEach(text => {
                const lineEl = document.createElement('div');
                lineEl.className = 'log-line';
                lineEl.innerHTML = text;
                history.appendChild(lineEl);
            });
        } else {
            const errEl = document.createElement('div');
            errEl.className = 'log-line error';
            errEl.textContent = `Command not recognized: '${cmd}'. Type 'help' to see available commands.`;
            history.appendChild(errEl);
        }

        if (screen) {
            screen.scrollTop = screen.scrollHeight;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        runCommand(input.value);
        input.value = '';
    });

    shortcuts.forEach(btn => {
        btn.addEventListener('click', () => {
            const c = btn.getAttribute('data-cmd');
            if (c) runCommand(c);
        });
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
}

/* ==========================================================================
   3. Projects Controls (Filter & Expand)
   ========================================================================== */
function initProjectControls() {
    // 1. Expandable details
    const toggles = document.querySelectorAll('.expand-toggle');
    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;

            const el = document.getElementById(targetId);
            if (!el) return;

            const isOpen = el.classList.contains('open');
            if (isOpen) {
                el.classList.remove('open');
                btn.innerHTML = '<span>+ Details</span>';
            } else {
                el.classList.add('open');
                btn.innerHTML = '<span>− Close</span>';
            }
        });
    });

    // 2. Category filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   4. Contact Form Submission (Web3Forms API)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const alertBox = document.getElementById('form-status');

    if (!form || !submitBtn || !alertBox) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) {
            showAlert('Please complete all required fields.', 'error');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';

        const formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(async (res) => {
            const data = await res.json();
            if (res.status === 200) {
                showAlert('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
            } else {
                showAlert(data.message || 'Something went wrong. Please try again.', 'error');
            }
        })
        .catch((err) => {
            console.error('Contact error:', err);
            showAlert('Unable to send message. Please check your internet connection.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    });

    function showAlert(msg, type) {
        alertBox.textContent = msg;
        alertBox.className = `form-alert ${type}`;

        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 6000);
    }
}

/* ==========================================================================
   5. Copy Email to Clipboard
   ========================================================================== */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast-notice');
    const email = 'j27557343@gmail.com';

    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.borderColor = 'var(--blue-accent)';
            copyBtn.style.color = 'var(--blue-accent)';

            if (toast) {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.borderColor = '';
                copyBtn.style.color = '';
            }, 2500);
        }).catch(err => {
            console.error('Clipboard copy failed:', err);
        });
    });
}

/* ==========================================================================
   6. Footer Current Year
   ========================================================================== */
function initFooterYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
