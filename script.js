/**
 * Akilesh K - Production Portfolio Engine
 * AI & Data Science Engineering Student
 * Built with pure Vanilla JS (ES6+), Web Audio API, Canvas Engine, and Theme State System.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initParticleCanvas();
  initTypewriter();
  initScrollProgressBar();
  initNavbarScroll();
  initSkillsTabs();
  initProjectFilters();
  initTerminalAI();
  initModals();
  initCopyButtons();
  initContactForm();
  initStatsCounter();
  initCustomCursor();
  initThemeToggle();
  initButtonRipples();
  initAudioEffects();
});

/* ----------------------------------------------------
 * 1. Preloader Screen Handler
 * ---------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.style.display = 'none', 500);
    }, 400);
  });
}

/* ----------------------------------------------------
 * 2. Particle Constellation Canvas Engine
 * ---------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('space-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const mouse = { x: null, y: null, radius: 160 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }
      }
    }

    draw() {
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#00f2fe';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.globalAlpha = this.baseAlpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = accentColor;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 12000), 90);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#00f2fe';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ----------------------------------------------------
 * 3. Typewriter Effect
 * ---------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    'Artificial Intelligence Student',
    'Machine Learning Enthusiast',
    'Full Stack Developer',
    'Python Developer',
    'AI Engineer'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const delayBetweenPhrases = 2000;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentPhrase.length) {
      nextSpeed = delayBetweenPhrases;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      nextSpeed = 500;
    }

    setTimeout(type, nextSpeed);
  }

  type();
}

/* ----------------------------------------------------
 * 4. Scroll Progress Bar & Navbar Highlighting
 * ---------------------------------------------------- */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Scroll active link observer
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
      playSound(600, 0.05);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
        playSound(440, 0.05);
      });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ----------------------------------------------------
 * 5. Skills Tab Filtering
 * ---------------------------------------------------- */
function initSkillsTabs() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCategories = document.querySelectorAll('.skill-category');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      playSound(520, 0.05);

      skillCategories.forEach((cat) => {
        if (targetCategory === 'all' || cat.getAttribute('data-category').includes(targetCategory)) {
          cat.style.display = 'block';
          cat.classList.add('fade-in');
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
 * 6. Project Filters
 * ---------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      playSound(480, 0.05);

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
 * 7. AI Terminal Shell Assistant
 * ---------------------------------------------------- */
function initTerminalAI() {
  const terminalToggle = document.getElementById('terminal-toggle');
  const terminalModal = document.getElementById('terminal-modal');
  const terminalClose = document.getElementById('terminal-close');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  if (!terminalToggle || !terminalModal) return;

  terminalToggle.addEventListener('click', () => {
    terminalModal.classList.add('active');
    terminalInput.focus();
    playSound(800, 0.08);
  });

  terminalClose.addEventListener('click', () => {
    terminalModal.classList.remove('active');
    playSound(300, 0.05);
  });

  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) {
      terminalModal.classList.remove('active');
    }
  });

  const knowledgeBase = {
    help: `Available commands for Campus Recruiters:<br>
    - <span class="cmd-keyword">why-hire</span>: Why hire Akilesh K? Candidate value summary<br>
    - <span class="cmd-keyword">dsa</span>: Data Structures & Algorithms & LeetCode profile<br>
    - <span class="cmd-keyword">ml-experience</span>: Machine Learning & Computer Vision engineering<br>
    - <span class="cmd-keyword">projects</span>: Deep dive into AI Eye Blink Auth, TechHub & Scholarship Finder<br>
    - <span class="cmd-keyword">skills</span>: Programming Languages, Frameworks & Core CS<br>
    - <span class="cmd-keyword">education</span>: B.Tech AI & DS at Dr. N.G.P. IT (CGPA: 7.6)<br>
    - <span class="cmd-keyword">resume</span>: View / Print official placement resume<br>
    - <span class="cmd-keyword">contact</span>: Email, phone, LinkedIn & WhatsApp<br>
    - <span class="cmd-keyword">clear</span>: Clear terminal console`,

    'why-hire': `🎯 <strong>Candidate Value Proposition for Recruiters:</strong><br>
    1. <strong>Strong Technical Foundation:</strong> 3rd Year B.Tech AI & DS with 7.6 CGPA and hands-on ML/CV experience.<br>
    2. <strong>Problem Solving Mindset:</strong> Active LeetCode practitioner (@Akileshavinash) mastering DSA in Python & Java.<br>
    3. <strong>Full-Stack & Systems Capability:</strong> Experience with Flask REST APIs, MySQL schema design, and responsive Web UI.<br>
    4. <strong>Fast Learner & Team Player:</strong> Led student development teams & participated in national hackathons.`,

    dsa: `🧩 <strong>Data Structures & Algorithms:</strong><br>
    - Active problem solver on LeetCode: <a href="https://leetcode.com/u/Akileshavinash/" target="_blank" style="color: var(--accent-cyan);">leetcode.com/u/Akileshavinash/</a><br>
    - Core topics: Arrays & Strings, Two Pointers, Trees, Graphs (BFS/DFS), Dynamic Programming, Hash Tables, Binary Search.`,

    'ml-experience': `🧠 <strong>Machine Learning & Computer Vision Stack:</strong><br>
    - <strong>Computer Vision:</strong> OpenCV, Facial Landmark Detection, Eye Aspect Ratio (EAR) biometric liveness tracking.<br>
    - <strong>Machine Learning:</strong> Scikit-learn, Classification, Random Forest, Feature Engineering, Metric Evaluation.<br>
    - <strong>NLP:</strong> Text vectorization (TF-IDF), Cosine Similarity matching algorithms.`,

    about: `Akilesh K is a 3rd Year B.Tech Artificial Intelligence & Data Science student at Dr. N.G.P. Institute of Technology, Coimbatore. Aiming for AI/ML Engineer, Data Scientist & Full Stack SDE placement roles. CGPA: 7.6.`,

    skills: `<strong>Languages:</strong> Python, Java, JavaScript, SQL, HTML5, CSS3<br>
    <strong>Frameworks & ML:</strong> Flask, Bootstrap, Scikit-learn, OpenCV, Data Science<br>
    <strong>Database & Tools:</strong> MySQL, Git, GitHub, VS Code, Jupyter Notebook<br>
    <strong>Core CS:</strong> Data Structures & Algorithms, DBMS, OS, OOPs, Computer Networks`,

    projects: `1. 👁️ <strong>AI Eye Blink Authentication:</strong> Computer vision liveness login (OpenCV + EAR + Flask).<br>
    2. 🛍️ <strong>TechHub E-Commerce:</strong> Full-stack web app with MySQL relational database & Admin CRUD control.<br>
    3. 🎓 <strong>Scholarship Finder:</strong> AI NLP recommendation engine matching students with grants.`,

    education: `<strong>Degree:</strong> B.Tech Artificial Intelligence and Data Science (3rd Year)<br>
    <strong>College:</strong> Dr. N.G.P. Institute of Technology, Coimbatore<br>
    <strong>CGPA:</strong> 7.6 / 10.0 | Graduation: 2026`,

    resume: `📄 <strong>Official Placement Resume:</strong><br>
    Click to view / print official resume PDF: <a href="assets/resume/resume.pdf" target="_blank" style="color:var(--accent-cyan);">assets/resume/resume.pdf ↗</a>`,

    certifications: `- NPTEL: Human Computer Interaction (Elite Grade)<br>
    - EduPyramids IIT Bombay: JavaScript Training<br>
    - Great Learning: AI Fundamentals<br>
    - Simplilearn: Basics of Data Structures & Algorithms`,

    contact: `📧 <strong>Email:</strong> akilesh2330@gmail.com<br>
    📞 <strong>Phone:</strong> +91 6374171882<br>
    📍 <strong>Location:</strong> Coimbatore, Tamil Nadu, India<br>
    🧩 <strong>LeetCode:</strong> leetcode.com/u/Akileshavinash<br>
    💻 <strong>GitHub:</strong> github.com/akilesh2330<br>
    🔗 <strong>LinkedIn:</strong> linkedin.com/in/akilesh230307`
  };

  function appendLog(prompt, responseHTML) {
    const logItem = document.createElement('div');
    logItem.className = 'terminal-log-item';
    logItem.innerHTML = `
      <div class="terminal-prompt-line"><span class="prompt-user">visitor@akilesh-ai</span>:<span class="prompt-path">~</span>$ ${escapeHTML(prompt)}</div>
      <div class="terminal-response-line">${responseHTML}</div>
    `;
    terminalOutput.appendChild(logItem);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    playSound(650, 0.02);
    if (e.key === 'Enter') {
      const rawCmd = terminalInput.value.trim();
      const cmd = rawCmd.toLowerCase();
      terminalInput.value = '';

      if (!cmd) return;

      if (cmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
      }

      if (knowledgeBase[cmd]) {
        appendLog(rawCmd, knowledgeBase[cmd]);
      } else {
        appendLog(
          rawCmd,
          `<span class="cmd-error">Command not recognized: "${escapeHTML(rawCmd)}". Type <span class="cmd-keyword">help</span> for available commands.</span>`
        );
      }
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ----------------------------------------------------
 * 8. Modals (Certifications & Resume Lightbox)
 * ---------------------------------------------------- */
function initModals() {
  window.openModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      playSound(700, 0.05);
    }
  };

  window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      playSound(350, 0.05);
    }
  };

  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
}

/* ----------------------------------------------------
 * 9. Copy Buttons & Toasts
 * ---------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
          playSound(900, 0.06);
        }).catch(() => {
          showToast('Failed to copy text', 'error');
        });
      }
    });
  });
}

function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '⚡' : '⚠️'}</span> ${message}`;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ----------------------------------------------------
 * 10. Contact Form Submission
 * ---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    showToast(`Thank you, ${name}! Your message has been dispatched.`, 'success');
    playSound(1000, 0.1);
    form.reset();
  });
}

/* ----------------------------------------------------
 * 11. Animated Stats Counter
 * ---------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounters() {
    statNumbers.forEach((stat) => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const duration = 1500;
      const startTime = performance.now();
      const isFloat = target % 1 !== 0;

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeProgress * target;

        stat.textContent = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          stat.textContent = isFloat ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounters();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ----------------------------------------------------
 * 12. Custom Glow Cursor Follower
 * ---------------------------------------------------- */
function initCustomCursor() {
  // Large ambient glow follower
  const glow = document.createElement('div');
  glow.className = 'custom-cursor-glow';
  document.body.appendChild(glow);

  // Small precise dot at cursor tip
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });

  // Detect hover over interactive elements to expand the dot
  const interactiveSelectors = 'a, button, .btn, .skill-card, .project-card, .cert-card, .nav-link, .nav-action-btn, input, textarea, .tab-btn, .filter-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      dot.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      dot.classList.remove('hovering');
    }
  });
}

/* ----------------------------------------------------
 * 13. Dark / Light Theme Toggle State
 * ---------------------------------------------------- */
function initThemeToggle() {
  document.body.classList.remove('light-mode');
  localStorage.removeItem('theme');
}

/* ----------------------------------------------------
 * 14. Button Ripple Effects
 * ---------------------------------------------------- */
function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn, .skill-card, .project-card, .cert-card');
  buttons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ----------------------------------------------------
 * 15. Web Audio Sound Synthesizer
 * ---------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function initAudioEffects() {
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (!soundToggleBtn) return;

  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggleBtn.innerHTML = soundEnabled ? '🔊 Sound On' : '🔇 Sound Off';
    if (soundEnabled) playSound(800, 0.05);
  });
}

function playSound(freq, duration = 0.05) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Ignore audio errors if blocked
  }
}
