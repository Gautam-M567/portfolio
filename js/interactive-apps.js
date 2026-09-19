/**
 * Gautam M - Career Compass Interactive Engine
 * 
 * In-browser interactive preview of Gautam M's flagship project:
 * Career Compass — AI-Powered Career Guidance & RIASEC Engine
 * (Production URL: https://pathfinder-bot-hub.lovable.app/)
 */

const InteractiveApps = {
  renderCareerCompass(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="interactive-app-wrapper career-compass-app" style="background: #090e1a; border-radius: 12px; padding: 1.25rem; color: #f1f5f9;">
        <!-- Top Live Hub Banner -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(28, 214, 108, 0.08); border: 1px solid rgba(28, 214, 108, 0.25); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.5rem;">🧭</span>
            <div>
              <div style="font-weight: 700; color: #ffffff; font-size: 1rem;">Career Compass — Live Production System</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Created &amp; Deployed by Gautam M &bull; AI Roadmaps &amp; RIASEC Engine</div>
            </div>
          </div>
          <a href="https://pathfinder-bot-hub.lovable.app/" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="background: #1cd66c; color: #090d16; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; border-radius: 6px;">
            <span>Open Live App</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; border-bottom: 1px solid #1e293b; padding-bottom: 0.5rem; flex-wrap: wrap;">
          <button id="cc-tab-roadmaps" class="btn btn-sm btn-outline active" style="font-size: 0.82rem; border-color: #1cd66c; color: #fff;">🗺️ Career Roadmaps</button>
          <button id="cc-tab-riasec" class="btn btn-sm btn-outline" style="font-size: 0.82rem; border-color: #334155; color: #94a3b8;">📊 RIASEC Test</button>
          <button id="cc-tab-counsellor" class="btn btn-sm btn-outline" style="font-size: 0.82rem; border-color: #334155; color: #94a3b8;">🤖 AI Counsellor</button>
        </div>

        <!-- Tab 1: Roadmaps -->
        <div id="cc-view-roadmaps">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
            <div class="cc-career-card active" data-career="swe" style="background: #111a2e; border: 1px solid #1cd66c; border-radius: 8px; padding: 0.85rem; cursor: pointer;">
              <div style="font-weight: 700; color: #f8fafc;">Software Engineer</div>
              <div style="font-size: 0.75rem; color: #1cd66c; margin-top: 0.2rem; font-family: monospace;">₹6 - 40 LPA</div>
            </div>
            <div class="cc-career-card" data-career="aiml" style="background: #111a2e; border: 1px solid #1e293b; border-radius: 8px; padding: 0.85rem; cursor: pointer;">
              <div style="font-weight: 700; color: #f8fafc;">AI / ML Engineer</div>
              <div style="font-size: 0.75rem; color: #1cd66c; margin-top: 0.2rem; font-family: monospace;">₹12 - 80 LPA</div>
            </div>
            <div class="cc-career-card" data-career="cyber" style="background: #111a2e; border: 1px solid #1e293b; border-radius: 8px; padding: 0.85rem; cursor: pointer;">
              <div style="font-weight: 700; color: #f8fafc;">Cybersecurity Specialist</div>
              <div style="font-size: 0.75rem; color: #1cd66c; margin-top: 0.2rem; font-family: monospace;">₹8 - 50 LPA</div>
            </div>
            <div class="cc-career-card" data-career="cloud" style="background: #111a2e; border: 1px solid #1e293b; border-radius: 8px; padding: 0.85rem; cursor: pointer;">
              <div style="font-weight: 700; color: #f8fafc;">Cloud Architect</div>
              <div style="font-size: 0.75rem; color: #1cd66c; margin-top: 0.2rem; font-family: monospace;">₹15 - 60 LPA</div>
            </div>
          </div>

          <div id="cc-roadmap-details" style="background: #0d1527; border: 1px solid #1e293b; border-radius: 8px; padding: 1rem;">
            <!-- Dynamic Content -->
          </div>
        </div>

        <!-- Tab 2: RIASEC Test -->
        <div id="cc-view-riasec" style="display: none;">
          <div style="background: #0d1527; border: 1px solid #1e293b; border-radius: 8px; padding: 1.25rem;">
            <h4 style="margin: 0 0 0.5rem 0; color: #ffffff;">Quick Aptitude Assessment</h4>
            <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">Select your primary interest focus to calculate your Holland career alignment:</p>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
              <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; background: #131d33; padding: 0.6rem 0.9rem; border-radius: 6px;">
                <input type="radio" name="riasec-q" value="I" checked />
                <span style="font-size: 0.88rem;">🔬 <strong>Investigative:</strong> Analyzing algorithms, deep problem solving, AI/ML theory</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; background: #131d33; padding: 0.6rem 0.9rem; border-radius: 6px;">
                <input type="radio" name="riasec-q" value="R" />
                <span style="font-size: 0.88rem;">⚙️ <strong>Realistic:</strong> Systems programming in C++, hardware, Kali Linux security tools</span>
              </label>
              <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; background: #131d33; padding: 0.6rem 0.9rem; border-radius: 6px;">
                <input type="radio" name="riasec-q" value="C" />
                <span style="font-size: 0.88rem;">📊 <strong>Conventional:</strong> Structured data, MySQL databases, cloud architectures</span>
              </label>
            </div>

            <button id="cc-calc-riasec-btn" class="btn btn-sm btn-primary" style="background: #1cd66c; color: #090d16; font-weight: 600;">Calculate Holland Fit</button>

            <div id="cc-riasec-result" style="margin-top: 1rem; padding: 0.85rem; background: rgba(28, 214, 108, 0.1); border: 1px solid rgba(28, 214, 108, 0.3); border-radius: 6px; font-size: 0.88rem;">
              <strong>Recommended Match:</strong> AI / ML Engineer &amp; Software Researcher (Holland Code: <strong>IRC</strong>)
            </div>
          </div>
        </div>

        <!-- Tab 3: AI Counsellor -->
        <div id="cc-view-counsellor" style="display: none;">
          <div style="background: #0d1527; border: 1px solid #1e293b; border-radius: 8px; padding: 1.25rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
              <span style="font-size: 1.2rem;">🤖</span>
              <h4 style="margin: 0; color: #ffffff;">Simulated AI Career Counsellor</h4>
            </div>
            <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">Click a prompt to simulate the real-time AI career guidance from Gautam's production app:</p>

            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
              <button class="btn btn-sm btn-outline cc-prompt-btn" data-q="swe">"How should I start in Software Engineering?"</button>
              <button class="btn btn-sm btn-outline cc-prompt-btn" data-q="cpp">"Why is C++ and DSA crucial for AI/ML?"</button>
              <button class="btn btn-sm btn-outline cc-prompt-btn" data-q="security">"How do I break into Cybersecurity?"</button>
            </div>

            <div id="cc-chat-output" style="background: #111a2e; border: 1px solid #1e293b; border-radius: 6px; padding: 1rem; font-size: 0.88rem; line-height: 1.5; min-height: 80px; color: #e2e8f0;">
              Click one of the prompt questions above to get instant personalized mentorship advice!
            </div>
          </div>
        </div>
      </div>
    `;

    // Career Roadmap Data
    const roadmaps = {
      swe: {
        title: "Software Engineer Roadmap",
        salary: "₹6 – 40 LPA (Freshers to Senior)",
        steps: [
          "Foundation: Master C++ / Python, Data Structures & Object-Oriented Design",
          "Web & Systems: RESTful APIs, modern databases, Git version control",
          "Portfolio Projects: Deploy interactive web applications with live links",
          "Top Indian Institutes: NIELIT Calicut, IITs, NITs, IIITs"
        ]
      },
      aiml: {
        title: "AI & Machine Learning Engineer Roadmap",
        salary: "₹12 – 80 LPA (High Growth Demand)",
        steps: [
          "Math Fundamentals: Linear algebra, matrix determinants, calculus & probability",
          "Tooling & Code: Python, PyTorch, C++ algorithms for latency-critical inference",
          "Applied ML: Fine-tuning LLMs, Prompt Engineering, Retrieval-Augmented Generation (RAG)",
          "Top Indian Institutes: NIELIT Calicut B.Tech (AI & ML), IISc, IIT Madras"
        ]
      },
      cyber: {
        title: "Cybersecurity & Ethical Hacking Roadmap",
        salary: "₹8 – 50 LPA (Mission-Critical Domain)",
        steps: [
          "Certifications: Ethical Hacking (Offenso Academy), CEH, CompTIA Security+",
          "Core Skills: Linux environments, network protocols, penetration testing, Web Crypto",
          "Defensive Hardening: Security headers, cryptography, vulnerability mitigation",
          "Roles: Security Analyst, SOC Tier-1/2, Penetration Tester"
        ]
      },
      cloud: {
        title: "Cloud Architect Roadmap",
        salary: "₹15 – 60 LPA (Enterprise Scale)",
        steps: [
          "Foundations: Linux administration, shell scripting, networking (TCP/IP, DNS)",
          "Cloud Providers: AWS, Google Cloud, Docker containerization",
          "Infrastructure as Code: Microservices architecture, high availability & CI/CD",
          "Certifications: AWS Solutions Architect, CKA (Kubernetes)"
        ]
      }
    };

    function renderRoadmap(key) {
      const data = roadmaps[key] || roadmaps.swe;
      const details = document.getElementById("cc-roadmap-details");
      if (!details) return;
      details.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <h4 style="margin: 0; color: #1cd66c; font-size: 1.05rem;">${data.title}</h4>
          <span style="font-family: monospace; font-size: 0.85rem; color: #38bdf8; background: rgba(56, 189, 248, 0.15); padding: 0.25rem 0.5rem; border-radius: 4px;">${data.salary}</span>
        </div>
        <ol style="margin: 0 0 1rem 1.25rem; padding: 0; color: #cbd5e1; font-size: 0.86rem; line-height: 1.6;">
          ${data.steps.map(s => `<li style="margin-bottom: 0.4rem;">${s}</li>`).join("")}
        </ol>
        <div style="font-size: 0.8rem; color: #94a3b8; border-top: 1px solid #1e293b; padding-top: 0.6rem;">
          💡 View all full interactive roadmaps on Gautam's deployed platform: <a href="https://pathfinder-bot-hub.lovable.app/careers" target="_blank" style="color: #1cd66c; text-decoration: underline;">Explore All Roadmaps ↗</a>
        </div>
      `;
    }

    renderRoadmap("swe");

    // Tab switching
    const tabRoadmaps = document.getElementById("cc-tab-roadmaps");
    const tabRiasec = document.getElementById("cc-tab-riasec");
    const tabCounsellor = document.getElementById("cc-tab-counsellor");

    const viewRoadmaps = document.getElementById("cc-view-roadmaps");
    const viewRiasec = document.getElementById("cc-view-riasec");
    const viewCounsellor = document.getElementById("cc-view-counsellor");

    function setActiveTab(activeBtn, activeView) {
      [tabRoadmaps, tabRiasec, tabCounsellor].forEach(b => {
        b.classList.remove("active");
        b.style.borderColor = "#334155";
        b.style.color = "#94a3b8";
      });
      [viewRoadmaps, viewRiasec, viewCounsellor].forEach(v => v.style.display = "none");

      activeBtn.classList.add("active");
      activeBtn.style.borderColor = "#1cd66c";
      activeBtn.style.color = "#ffffff";
      activeView.style.display = "block";
    }

    tabRoadmaps.addEventListener("click", () => setActiveTab(tabRoadmaps, viewRoadmaps));
    tabRiasec.addEventListener("click", () => setActiveTab(tabRiasec, viewRiasec));
    tabCounsellor.addEventListener("click", () => setActiveTab(tabCounsellor, viewCounsellor));

    // Career cards click
    const careerCards = container.querySelectorAll(".cc-career-card");
    careerCards.forEach(card => {
      card.addEventListener("click", () => {
        careerCards.forEach(c => {
          c.style.borderColor = "#1e293b";
        });
        card.style.borderColor = "#1cd66c";
        renderRoadmap(card.dataset.career);
      });
    });

    // RIASEC Calculation
    const calcBtn = document.getElementById("cc-calc-riasec-btn");
    const riasecResult = document.getElementById("cc-riasec-result");
    if (calcBtn && riasecResult) {
      calcBtn.addEventListener("click", () => {
        const selected = container.querySelector('input[name="riasec-q"]:checked')?.value || "I";
        if (selected === "I") {
          riasecResult.innerHTML = `<strong>Holland Match (IRC):</strong> AI &amp; Machine Learning Engineer / Computational Researcher. Focus on Algorithms, Discrete Math &amp; Deep Learning models.`;
        } else if (selected === "R") {
          riasecResult.innerHTML = `<strong>Holland Match (RIC):</strong> Systems Software Engineer / Cybersecurity Penetration Tester. Focus on C++, Linux Kernels &amp; Network Defense.`;
        } else {
          riasecResult.innerHTML = `<strong>Holland Match (CIR):</strong> Cloud Architect / Full-Stack Database Engineer. Focus on distributed systems, MySQL, and scalable cloud infrastructure.`;
        }
      });
    }

    // AI Counsellor simulated prompts
    const chatOutput = document.getElementById("cc-chat-output");
    const promptBtns = container.querySelectorAll(".cc-prompt-btn");
    const responses = {
      swe: "🤖 <strong>AI Counsellor:</strong> Start by writing clean code daily! Focus on mastering one core language (like C++ or Python), learn time & space complexity, and build end-to-end applications. Having a live portfolio with real deployed tools puts you ahead of 90% of applicants.",
      cpp: "🤖 <strong>AI Counsellor:</strong> C++ gives you profound insight into memory management, pointers, and cache locality. In modern AI/ML, the fastest neural network runtimes (TensorRT, ONNX Runtime, llama.cpp) are all authored in C++!",
      security: "🤖 <strong>AI Counsellor:</strong> Build hands-on lab experience with Linux and networking fundamentals. Complete practical training like Offenso Hackers Academy, understand the OWASP Top 10, and practice ethical penetration testing in controlled sandboxes."
    };

    promptBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const q = btn.dataset.q;
        chatOutput.innerHTML = `<span style="color: #1cd66c;">Thinking...</span>`;
        setTimeout(() => {
          chatOutput.innerHTML = responses[q] || "Advice generated.";
        }, 300);
      });
    });
  }
};
