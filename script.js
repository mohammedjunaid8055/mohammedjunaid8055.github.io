/**
 * ==========================================================================
 * MISSION CONTROL — THE DIGITAL ENGINEER'S WORKSPACE
 * Interactive Telemetry Engine & Terminal CLI
 * Developer: Mohammed Junaid (IIIT Tiruchirappalli)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTerminalCLI();
    initProjectControls();
    initContactTransmission();
    initCopyEmail();
    initFooterYear();
});

/* ==========================================================================
   1. Navigation & Scroll Monitoring
   ========================================================================== */
function initNavigation() {
    const header = document.getElementById('site-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Header scroll background shift
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        let currentId = '';
        const scrollPosition = window.scrollY + 140;

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

    // Mobile Navigation Toggle
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
   2. Interactive Command Center Terminal CLI
   ========================================================================== */
function initTerminalCLI() {
    const terminalForm = document.getElementById('terminal-form');
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const terminalScreen = document.getElementById('terminal-screen');
    const quickCmdButtons = document.querySelectorAll('.cmd-pill');

    if (!terminalForm || !terminalInput || !terminalHistory) return;

    // Command Database
    const commands = {
        help: () => [
            `<span class="code-cyan">=== AVAILABLE MISSION CONTROL COMMANDS ===</span>`,
            `  <span class="code-green">about</span>    : View engineer specifications and background summary`,
            `  <span class="code-green">projects</span> : List all active missions, prototypes, and research`,
            `  <span class="code-green">skills</span>   : Output technical arsenal and stack capabilities`,
            `  <span class="code-green">exp</span>      : Inspect IIITDM Kancheepuram internship & academic history`,
            `  <span class="code-green">certs</span>    : Access official research credentials & verification links`,
            `  <span class="code-green">contact</span>  : Display secure comms channels, phone, and direct handles`,
            `  <span class="code-green">status</span>   : Run diagnostic telemetry & environmental verification`,
            `  <span class="code-green">clear</span>    : Purge terminal display history`
        ],
        about: () => [
            `<span class="code-cyan">=== OPERATOR SPECIFICATION ===</span>`,
            `NAME        : Mohammed Junaid`,
            `BASE        : IIIT Tiruchirappalli (2023 - 2027)`,
            `METRIC      : 7.86 CGPA (Computer Science and Engineering)`,
            `RESEARCH    : Research Intern at IIITDM Kancheepuram (FANET Routing)`,
            `FOCUS       : Applied AI, UAV Autonomous Swarms, Backend Distributed Engineering`,
            `STATEMENT   : Engineering intelligent, data-intensive systems with rigorous software architecture.`
        ],
        projects: () => [
            `<span class="code-cyan">=== ACTIVE MISSIONS & PROTOTYPES ===</span>`,
            `[01] SEMANTIC SEARCH ENGINE              : Python, FAISS, NLP, Streamlit (Working Prototype)`,
            `[02] AI SUMMARIZER CHATBOT               : Python, Node.js, OpenRouter API (Completed)`,
            `[03] ANONYMOUS REAL-TIME CHAT APPLICATION: Node.js, WebSockets, Docker, Minikube (Completed)`,
            `[04] DYNAMIC FITNESS WEB APPLICATION     : Node.js, HTML, CSS (Ongoing - Docker planned)`,
            `[05] FANET ROUTING & ML RESEARCH         : Python, ROS2, PX4, Gazebo, XGBoost, CatBoost (Completed)`,
            `Tip: Scroll down to #projects for interactive telemetry dashboards and live demos.`
        ],
        skills: () => [
            `<span class="code-cyan">=== TECHNICAL ARSENAL (NO INFLATED METRICS) ===</span>`,
            `LANGUAGES   : Python, C++, C, JavaScript, SQL`,
            `AI / ML     : NLP, Scikit-learn, PyTorch, Pandas, NumPy, XGBoost, CatBoost`,
            `AI ENG      : LLM API Integration, Prompt Engineering, FAISS Vector Search`,
            `BACKEND/WEB : Node.js, Django, React, REST APIs, WebSockets, HTML, CSS`,
            `DATABASES   : MySQL, PostgreSQL, MongoDB`,
            `SIM / TOOLS : ROS2, PX4-Autopilot, Gazebo, Docker, Minikube, Git/GitHub, Postman`
        ],
        exp: () => [
            `<span class="code-cyan">=== ENGINEERING DEPLOYMENT LOG ===</span>`,
            `[1] IIITDM Kancheepuram (May 2026 – July 2026)`,
            `    Role : Research Intern — FANET Routing and Machine Learning`,
            `    Guide: Dr. Preeth`,
            `    Specs: Simulated 30 UAV nodes using ROS2 + PX4 + Gazebo. Modeled RWP & RD mobility.`,
            `           Trained 13 supervised models (XGBoost, CatBoost); achieved 78.89% overall score (~87% best accuracy).`,
            `[2] IIIT Tiruchirappalli (2023 – 2027)`,
            `    B.Tech Computer Science and Engineering | CGPA: 7.86`,
            `[3] Sri Chaitanya Junior College (2021 – 2023) | MPC`,
            `[4] Sri Chaitanya School (2020 – 2021) | SSC Distinction`
        ],
        certs: () => [
            `<span class="code-cyan">=== VERIFIED CREDENTIALS ===</span>`,
            `CREDENTIAL : Research Internship Certificate — IIITDM Kancheepuram`,
            `DOMAIN     : Flying Ad-Hoc Networks (FANETs) & Supervised Learning`,
            `URL        : <a href="https://drive.google.com/file/d/1rgyGmWBheo0aTZaNvV6C1fNQMtNaPPtc/view?usp=sharing" target="_blank" style="color:var(--cyan-primary); text-decoration:underline;">https://drive.google.com/... [CLICK TO OPEN] ↗</a>`
        ],
        contact: () => [
            `<span class="code-cyan">=== SECURE COMMUNICATIONS ===</span>`,
            `EMAIL      : j27557343@gmail.com`,
            `TELEPHONY  : +91 9652134605`,
            `LOCATION   : Tiruchirappalli, Tamil Nadu, India`,
            `LINKEDIN   : https://www.linkedin.com/in/mohammad-junaid-903518294`,
            `GITHUB     : https://github.com/mohammedjunaid8055`
        ],
        status: () => [
            `<span class="code-green">[STATUS: NOMINAL]</span> System telemetry operational.`,
            `HOST        : ground-station-trichy.iiitt.ac.in`,
            `UPTIME      : 99.98%`,
            `LATENCY     : 11ms to satellite uplink`,
            `SECURITY    : Encrypted TLS // Web3Forms Key Bound`,
            `CORE-SYS    : Mission Control v2.7.4 initialized.`
        ]
    };

    function executeCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        // Print entered command
        const cmdRow = document.createElement('div');
        cmdRow.className = 'term-line highlight';
        cmdRow.innerHTML = `<span class="term-prompt">guest@mission-control:~$</span> ${escapeHTML(rawCmd)}`;
        terminalHistory.appendChild(cmdRow);

        if (cmd === 'clear') {
            terminalHistory.innerHTML = '';
        } else if (commands[cmd]) {
            const outputLines = commands[cmd]();
            outputLines.forEach(line => {
                const outRow = document.createElement('div');
                outRow.className = 'term-line';
                outRow.innerHTML = line;
                terminalHistory.appendChild(outRow);
            });
        } else {
            const errRow = document.createElement('div');
            errRow.className = 'term-line error';
            errRow.textContent = `Command not recognized: '${cmd}'. Type 'help' to review valid operations.`;
            terminalHistory.appendChild(errRow);
        }

        // Scroll to bottom
        if (terminalScreen) {
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }
    }

    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = terminalInput.value;
        executeCommand(value);
        terminalInput.value = '';
    });

    // Quick Command Pills
    quickCmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                executeCommand(cmd);
            }
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
   3. Projects Filter & Expandable Mission Briefs
   ========================================================================== */
function initProjectControls() {
    // 1. Expandable Mission Briefs
    const toggleButtons = document.querySelectorAll('.mission-toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;

            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            const isExpanded = targetEl.classList.contains('active');
            if (isExpanded) {
                targetEl.classList.remove('active');
                btn.innerHTML = '<span>[+] Mission Brief</span>';
            } else {
                targetEl.classList.add('active');
                btn.innerHTML = '<span>[-] Close Brief</span>';
            }
        });
    });

    // 2. Project Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const missionCards = document.querySelectorAll('.mission-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            missionCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   4. Contact Form Transmission (Real Web3Forms Fetch)
   ========================================================================== */
function initContactTransmission() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const formStatus = document.getElementById('form-status');

    if (!contactForm || !submitBtn || !formStatus) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) {
            displayStatus('ERROR: All telemetry fields required before dispatch.', 'error');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING PAYLOAD...';

        const formData = new FormData(contactForm);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(async (response) => {
            const data = await response.json();
            if (response.status === 200) {
                displayStatus('STATUS 200 [OK]: Telemetry payload successfully received by Mohammed Junaid.', 'success');
                contactForm.reset();
            } else {
                displayStatus(data.message || 'TRANSMISSION FAILED: Gateway error occurred.', 'error');
            }
        })
        .catch((err) => {
            console.error('Transmission error:', err);
            displayStatus('NETWORK ERROR: Unable to reach telemetry gateway. Check connection.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    });

    function displayStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = `form-feedback-msg ${type}`;

        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 7000);
    }
}

/* ==========================================================================
   5. Copy Email Utility with Toast Feedback
   ========================================================================== */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast-notice');
    const email = 'j27557343@gmail.com';

    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'COPIED!';
            copyBtn.style.borderColor = 'var(--cyan-primary)';
            copyBtn.style.color = 'var(--cyan-primary)';

            if (toast) {
                toast.classList.add('visible');
                setTimeout(() => {
                    toast.classList.remove('visible');
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
   6. Footer Year Synchronization
   ========================================================================== */
function initFooterYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
