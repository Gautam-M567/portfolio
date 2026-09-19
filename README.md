# Gautam M — Personal Developer Portfolio Website

A modern, responsive personal developer portfolio website for **Gautam M** (Aspiring Software Developer, B.Tech CSE AI & ML Student at NIELIT Calicut). Built with modern semantic HTML5, responsive CSS3 (Custom Properties, Glassmorphism, Dark/Light Themes), and clean Vanilla JavaScript.

## ✨ Features

- **Theme Switcher**: Instant Dark / Light mode toggle with smooth transitions and persistent `localStorage` preference.
- **Dynamic Typewriter Headline**: Interactive rotating roles in the Hero header (*Aspiring Software Developer, Universe & Cosmos Explorer, B.Tech CSE AI & ML Student, AI Web Developer, C++ & DSA Foundations, Mathematics Enthusiast*).
- **Featured Flagship Project (Career Compass 🧭)**:
  - Live deployed application linked to `https://pathfinder-bot-hub.lovable.app/`.
  - GitHub repository linked to `https://github.com/Gautam-M567/CAREER-COMPASS`.
  - In-browser interactive simulation with RIASEC aptitude scoring and career roadmaps.
- **Skills & Certifications Grid**: AI Web Development, C++ & DSA Foundations, Cybersecurity & Website Development Certifications, and Spoken Languages (Malayalam, Hindi, English).
- **Academic Journey Timeline**: Educational milestones from NIELIT Calicut, Rahmania HSS, and Chinmaya Vidyalaya.
- **Interactive Contact Form**: Client-side validation, submit animation, and toast feedback system.
- **One-Click Copy Email**: Instant clipboard copying for `www.gautu86@gmail.com` with feedback toast.
- **Zero Dependencies / No Build Step**: Works immediately by opening `index.html` in any browser.

---

## 🚀 Quick Start (Local Preview)

Simply open `index.html` in your favorite web browser (Google Chrome, Microsoft Edge, Firefox, Brave):

- Double-click **`index.html`** in File Explorer, or
- Run in PowerShell:
  ```powershell
  Start-Process index.html
  ```

---

## 🛠️ How to Personalize Further

### 1. Update Social Links & Profiles
Open `index.html` and search for:
- `https://github.com/Gautam-M567` &rarr; Configured to your personal GitHub profile.
- `https://www.linkedin.com/in/gautam-m-046206318` &rarr; Configured to your LinkedIn profile.
- `www.gautu86@gmail.com` &rarr; Configured for mailto links and clipboard copy.

### 2. Customize Projects
Open `js/projects-data.js` where all project data is stored cleanly:
```javascript
{
  id: "my-project",
  title: "My Project Name",
  category: "fullstack", // "fullstack", "frontend", "cloud", "ai"
  tagline: "Short one-liner summary",
  description: "Card overview paragraph",
  longDescription: "Detailed case study description for modal view",
  highlights: [
    "Key achievement or architectural metric",
    "Feature highlights"
  ],
  tech: ["React", "TypeScript", "Node.js"],
  githubUrl: "https://github.com/yourusername/repo",
  liveUrl: "https://yourproject.com",
  image: "assets/project-devpulse.svg",
  badge: "Featured"
}
```

### 3. Update Skills & Experience
- In `index.html`, navigate to the `<section id="skills">` and `<section id="experience">` tags to modify your work history, companies, and skill tags.

---

## 🌐 Free Deployment (in under 2 minutes)

### Option A: GitHub Pages (Recommended)
1. Push this folder to a GitHub repository (e.g. `yourusername.github.io` or `portfolio`).
2. Go to **Settings > Pages** in your GitHub repository.
3. Under **Build and deployment > Branch**, choose `main` / `root` and click **Save**.
4. Your portfolio will be live at `https://yourusername.github.io`!

### Option B: Netlify
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `portfolio` folder directly into the window.
3. Your site is live instantly with an SSL certificate and free hosting.

---

## 📁 Project Structure

```text
portfolio/
├── index.html              # Main HTML5 semantic page
├── css/
│   └── style.css           # Complete design tokens, light/dark themes, responsive CSS
├── js/
│   ├── projects-data.js    # Easy-to-edit project dataset
│   └── main.js             # Theme toggle, typewriter, filtering, modal & toast logic
├── assets/                 # SVG mockups, icons, and developer avatar
│   ├── avatar.svg
│   ├── project-devpulse.svg
│   ├── project-sphereui.svg
│   ├── project-cloudflow.svg
│   ├── project-neurotask.svg
│   ├── project-pulseaudio.svg
│   └── project-shopwave.svg
└── README.md               # Documentation & setup guide
```
