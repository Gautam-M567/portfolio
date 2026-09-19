/**
 * Main Application Logic
 * Modern Personal Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTypewriter();
  initProjects();
  initContactForm();
  initCopyEmail();
  initScrollEffects();
  initMobileNav();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("portfolio-theme-v2");
  // Default to dark theme matching reference screenshot
  const initialTheme = storedTheme ? storedTheme : "dark";
  document.documentElement.setAttribute("data-theme", initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme-v2", newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect for Hero Headline
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterEl = document.getElementById("typewriter-text");
  if (!typewriterEl) return;

  const roles = [
    "Aspiring Software Developer",
    "Universe & Cosmos Explorer",
    "B.Tech CSE (AI & ML) Student",
    "AI Web Developer & Builder",
    "C++ & DSA Foundations",
    "Mathematics Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Projects Showcase & Filtering & Modal
   -------------------------------------------------------------------------- */
function initProjects() {
  const grid = document.getElementById("projects-grid");
  const filterBtnsContainer = document.getElementById("project-filters");
  if (!grid || typeof projectsData === "undefined") return;

  // Render Filter Buttons dynamically if more than 1 category
  if (filterBtnsContainer) {
    if (typeof projectCategories !== "undefined" && projectCategories.length > 1) {
      filterBtnsContainer.style.display = "flex";
      filterBtnsContainer.innerHTML = projectCategories.map((cat, idx) => `
        <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-category="${cat.key}">
          ${cat.label}
        </button>
      `).join("");

      const filterBtns = filterBtnsContainer.querySelectorAll(".filter-btn");
      filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          filterBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          renderProjects(btn.dataset.category);
        });
      });
    } else {
      filterBtnsContainer.style.display = "none";
    }
  }

  // Initial render of all projects
  renderProjects("all");

  // Setup Modal Listeners
  setupProjectModal();
}

function renderProjects(category) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered = category === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === category);

  if (filtered.length === 1) {
    grid.classList.add("single-project");
  } else {
    grid.classList.remove("single-project");
  }

  grid.innerHTML = filtered.map(project => `
    <div class="project-card" data-id="${project.id}">
      <div class="project-img-wrapper">
        <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" />
        <span class="project-badge-tag">${project.badge || project.category}</span>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>

        ${project.highlights && project.highlights.length > 0 ? `
          <ul style="margin: 0.75rem 0 1rem 1.25rem; padding: 0; font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
            ${project.highlights.slice(0, 3).map(h => `<li style="margin-bottom: 0.35rem;">${h}</li>`).join("")}
          </ul>
        ` : ''}

        <div class="project-tech-list">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
        <div class="project-footer-actions" style="margin-top: 1.25rem;">
          ${project.liveUrl && project.liveUrl !== '#' ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" onclick="event.stopPropagation();" style="display: inline-flex; align-items: center; gap: 0.4rem; text-decoration: none; font-weight: 700; background: var(--accent-primary); color: #090d16;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              Live App ↗
            </a>
          ` : ''}
          <button class="btn btn-secondary btn-sm launch-app-btn" data-id="${project.id}" title="Try In-Browser Simulation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Interactive Demo
          </button>
          <a href="${project.githubUrl || 'https://github.com/Gautam-M567/CAREER-COMPASS'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" onclick="event.stopPropagation();" title="View Source on GitHub" style="display: inline-flex; align-items: center; gap: 0.35rem; text-decoration: none;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  `).join("");

  // Attach Launch App clicks
  grid.querySelectorAll(".launch-app-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openProjectModal(btn.dataset.id, "app");
    });
  });

  // Attach Case Study clicks
  grid.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openProjectModal(btn.dataset.id, "overview");
    });
  });

  grid.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      openProjectModal(card.dataset.id, "app");
    });
  });
}

/* Modal Management */
function setupProjectModal() {
  const modalOverlay = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  if (!modalOverlay) return;

  // Close on backdrop click
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeProjectModal();
    }
  });

  // Close on X button click
  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeProjectModal();
    }
  });
}

function openProjectModal(projectId, defaultTab = "app") {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-dynamic-content");
  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-header-nav">
      <div class="modal-title-wrap">
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-tagline">${project.tagline}</p>
      </div>
      <div class="modal-tab-toggles">
        <button class="modal-tab-btn ${defaultTab === 'app' ? 'active' : ''}" data-modaltab="app">
          🎮 Interactive App
        </button>
        <button class="modal-tab-btn ${defaultTab === 'overview' ? 'active' : ''}" data-modaltab="overview">
          📋 Case Study &amp; Architecture
        </button>
      </div>
    </div>

    <!-- Live App Tab Pane -->
    <div id="modal-pane-app" class="modal-pane ${defaultTab === 'app' ? 'active' : ''}">
      <div class="modal-app-header-bar">
        <span class="pulse-indicator">● LIVE IN-BROWSER EXECUTION</span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Self-Contained Client Engine</span>
      </div>
      <div id="modal-app-mount" class="modal-app-mount-container">
        <!-- Interactive app will mount here -->
      </div>
    </div>

    <!-- Overview Tab Pane -->
    <div id="modal-pane-overview" class="modal-pane ${defaultTab === 'overview' ? 'active' : ''}">
      <img src="${project.image}" alt="${project.title}" class="modal-img" />
      <div class="modal-body" style="padding-top: 1rem;">
        <p class="modal-desc">${project.longDescription || project.description}</p>
        
        <h3 class="modal-section-title">Key Architectural Highlights</h3>
        <ul class="modal-highlights">
          ${(project.highlights || []).map(h => `<li>${h}</li>`).join("")}
        </ul>

        <h3 class="modal-section-title">Technologies &amp; Core Tools</h3>
        <div class="project-tech-list" style="margin-bottom: 1.5rem;">
          ${project.tech.map(t => `<span class="tech-tag" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${t}</span>`).join("")}
        </div>

        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          ${project.liveUrl && project.liveUrl !== '#' ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-hero-green btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.6rem 1.1rem; border-radius: 6px; font-weight: 700;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              Launch Live App ↗
            </a>
          ` : ''}
          <a href="${project.githubUrl || 'https://github.com/Gautam-M567'}" target="_blank" rel="noopener noreferrer" class="btn btn-hero-outline btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.6rem 1.1rem; border-radius: 6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            View Code on GitHub (@Gautam-M567)
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach tab switching inside modal
  const tabBtns = modalBody.querySelectorAll(".modal-tab-btn");
  const panes = modalBody.querySelectorAll(".modal-pane");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const targetPane = modalBody.querySelector(`#modal-pane-${btn.dataset.modaltab}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Mount the interactive app
  if (typeof InteractiveApps !== "undefined" && project.appType === "career-compass" && InteractiveApps.renderCareerCompass) {
    InteractiveApps.renderCareerCompass("modal-app-mount");
  }

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeProjectModal() {
  const modalOverlay = document.getElementById("project-modal");
  if (!modalOverlay) return;
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

/* --------------------------------------------------------------------------
   4. Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const messageInput = document.getElementById("form-message");
    const submitBtn = form.querySelector("button[type='submit']");

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    // Simulate sending state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-animation"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      Sending message...
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast("Message sent successfully! I'll get back to you soon.", "success");
      form.reset();
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
    }, 1000);
  });
}

/* --------------------------------------------------------------------------
   5. Copy Email to Clipboard
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll(".copy-email-btn");
  const emailText = "www.gautu86@gmail.com";

  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailText).then(() => {
          showToast("Email copied to clipboard!");
        }).catch(() => {
          fallbackCopyText(emailText);
        });
      } else {
        fallbackCopyText(emailText);
      }
    });
  });
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast("Email copied to clipboard!");
  } catch (err) {
    showToast("Could not copy automatically. Email: " + text);
  }
  document.body.removeChild(textArea);
}

/* --------------------------------------------------------------------------
   6. Scroll Effects: Active Nav Highlighting & Back To Top
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const backToTopBtn = document.getElementById("back-to-top");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // Nav spy highlighting
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* --------------------------------------------------------------------------
   7. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });

  // Close mobile nav when link clicked
  navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-open");
    });
  });
}

/* --------------------------------------------------------------------------
   8. Global Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  const iconSvg = type === "success" 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 4000);
}
