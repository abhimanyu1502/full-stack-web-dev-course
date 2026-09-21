# Full Stack Web Development Mastery Platform

An interactive, production-grade web development learning platform with 52 HTML modules, 49 CSS topics, visual layout playgrounds, sandboxed code editor, gamification engine, and a native Node.js + SQLite cloud backend.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Surge.sh-6366f1?style=for-the-badge&logo=surge&logoColor=white)](https://abhim-html-mastery-v1.surge.sh/dashboard.html)
[![GitHub Pages Mirror](https://img.shields.io/badge/Mirror-GitHub%20Pages-brightgreen?style=for-the-badge&logo=githubpages&logoColor=white)](https://abhimanyu1502.github.io/full-stack-web-dev-course/html-mastery/dashboard.html)
[![Documentation](https://img.shields.io/badge/Documentation-Complete-blue?style=for-the-badge&logo=readme&logoColor=white)](https://github.com/abhimanyu1502/full-stack-web-dev-course#readme)
[![Node.js CI](https://img.shields.io/badge/Node.js-CI%20Passing-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://github.com/abhimanyu1502/full-stack-web-dev-course/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](html-mastery/LICENSE)

[Live Demo (Surge)](https://abhim-html-mastery-v1.surge.sh/dashboard.html) | [GitHub Pages Mirror](https://abhimanyu1502.github.io/full-stack-web-dev-course/html-mastery/dashboard.html) | [Documentation](https://github.com/abhimanyu1502/full-stack-web-dev-course#readme) | [Interactive Playgrounds](https://abhim-html-mastery-v1.surge.sh/playgrounds.html)

---

## 🎯 Problem

Learning frontend and fullstack web development through passive video tutorials and static docs leads to "tutorial hell" — learners struggle to understand how HTML semantics, CSS layout mechanics (Flexbox, CSS Grid, Box Model), DOM rendering, accessibility (WCAG AA, ARIA), and backend database state integrate in real production environments. Most beginner tutorials also omit crucial real-world topics like iframe sandbox security, cross-device sync, and automated regression testing.

---

## 💡 Solution

A zero-friction, browser-first educational platform that fuses structured curriculum with active learning mechanics:
- **Instant Hands-On Sandboxes**: Real-time code execution with live preview iframe sandboxing and automated solution verification.
- **Visual Intuition**: 4 dedicated interactive playgrounds allowing learners to visually manipulate Flexbox axes, Grid areas, Box Model margins/padding, and CSS Positioning schemes in real time.
- **Cognitive Reinforcement**: Integrated checkpoint quizzes, multi-tier progressive hints, and an AI pedagogical tutor providing context-aware guidance.
- **Real-World Fullstack Backend**: Zero-dependency Node.js REST API with a native SQLite database for user profiles, XP/streak tracking, and live community leaderboards.

---

## ✨ Features

- **52 Deep-Dive HTML Modules**: Semantic tags, forms & input validations, media (Audio/Video/Picture), Canvas, SVG, Web Components, and accessibility (ARIA, WCAG 2.1 AA).
- **49 CSS Interactive Lessons**: Layout engines (Flexbox, Grid, Multi-column), modern typography, transitions, animations, and custom property design systems.
- **4 Visual Layout Playgrounds**: Interactive visual manipulation for the Box Model, Flexbox alignments, CSS Grid areas, and CSS Positioning schemes.
- **Sandboxed Code Sandbox**: Integrated editor with real-time preview, syntax diagnostics, automated challenge test suites, and progressive hints.
- **Gamification & Habit Engine**: Daily learning goals, challenge of the day, XP level progression, streak tracking, bookmarks, and focus mode.
- **Fullstack Cloud Sync & REST API**: Native SQLite database engine with secure user accounts, cross-device progress synchronization, and real-time community leaderboard.
- **AI Pedagogical Tutor**: Context-aware code explanations, error debugging, and step-by-step guidance powered by Gemini with offline heuristic fallbacks.
- **Accessibility & Responsive**: Tested on screens from 320px to 1440px+, keyboard navigable, and respects prefers-reduced-motion.

---

## 🏗️ Architecture

```mermaid
graph TD
    subgraph Client ["Frontend Platform (Vanilla Web Platform)"]
        DASH["Learning Dashboard\n(dashboard.html • dashboard.js)"]
        TOPICS["52 HTML & 49 CSS Modules\n(Semantic HTML • Modern CSS)"]
        PLAY["Interactive Playgrounds\n(Box Model • Flexbox • Grid • Position)"]
        EDITOR["Sandboxed Code Editor\n(Live Iframe • Challenge Tests)"]
        SYNC_CLIENT["Cloud Sync Engine\n(cloud-sync.js)"]
    end

    subgraph Server ["Backend Services (Node.js 18+)"]
        HTTP["Native HTTP Server\n(server/index.js)"]
        REST["REST API Router\n(/api/auth • /api/progress • /api/leaderboard)"]
        AI["AI Pedagogical Proxy\n(server/ai-proxy.js)"]
    end

    subgraph Database ["Persistence Layer"]
        SQLITE[("Native SQLite Database\n(server/data/learning_platform.db)")]
        LOCAL[("Browser LocalStorage\n(Offline Standalone Mode)")]
    end

    DASH --> SYNC_CLIENT
    TOPICS --> SYNC_CLIENT
    EDITOR --> SYNC_CLIENT
    SYNC_CLIENT <-->|REST API / JSON| REST
    REST --> SQLITE
    REST --> AI
    DASH <--> LOCAL
```

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES2024), Modern Vanilla CSS (Design Tokens, Custom Properties)
- **Backend**: Node.js (v18+ / v22+ native modules: `http`, `crypto`, `fs`, `path`)
- **Database**: SQLite 3 (Node.js native `node:sqlite` DatabaseSync — zero native C++ compilation needed)
- **Security & Sandboxing**: Iframe `sandbox="allow-scripts"` isolation, SHA-256 password hashing
- **CI / CD & Tooling**: GitHub Actions, GitHub Pages, Custom VM Regression Engine

---

## 📊 Results

- **Automated Regression Suite**: 150 / 150 checks passing (100% pass rate)
- **Curriculum Coverage**: 52 HTML topics + 49 CSS lessons fully verified
- **External Dependencies**: 0 (Runs entirely on standard Node.js runtime)
- **Server Cold Boot Time**: < 30ms with instant SQLite schema initialization
- **Accessibility Compliance**: WCAG 2.1 AA keyboard navigable, contrast verified, reduced-motion compliant
- **Mobile Responsiveness**: Zero horizontal overflow verified from 320px to 1440px+

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) version **18.0.0 or higher** (Node.js 22+ recommended)
- Any modern web browser

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhimanyu1502/full-stack-web-dev-course.git
   cd full-stack-web-dev-course/html-mastery
   ```

2. **Start the platform server:**
   *(No `npm install` needed! Uses zero external dependencies)*
   ```bash
   npm start
   ```

3. **Open the platform:**
   Navigate to `http://localhost:5000/dashboard.html` in your browser.

---

## 📁 Project Structure

```text
full-stack-web-dev-course/
├── README.md                    # Showcase documentation & live links
├── index.html                   # Root entry redirect for GitHub Pages
├── .gitignore                   # Production git exclusion rules
└── html-mastery/
    ├── .github/workflows/ci.yml # GitHub Actions automated CI workflow
    ├── server/
    │   ├── index.js             # HTTP static server & REST API router
    │   ├── database.js          # SQLite connection, schema & operations
    │   ├── ai-proxy.js          # AI tutor endpoint & pedagogical heuristics
    │   └── data/                # SQLite database storage (git-ignored)
    ├── tests/
    │   └── regression-suite.test.js # 150-assertion automated test suite
    ├── dashboard.html           # Gamified learning dashboard
    ├── dashboard.css            # Dashboard styles & theme variables
    ├── dashboard.js             # Daily goals, streaks, and progress tracking
    ├── playgrounds.html         # Interactive CSS layout visualizers
    ├── playgrounds.js           # Box Model, Flexbox, Grid, Position logic
    ├── cloud-sync.js            # Frontend client for SQLite sync & leaderboard
    ├── progress.js              # XP, streak, bookmark, and progress engine
    ├── editor.js                # Sandboxed in-browser code editor
    ├── styles.css               # Core design tokens & responsive utilities
    ├── package.json             # NPM scripts & project metadata
    └── LICENSE                  # MIT Open Source License
```

---

## 🧪 Testing

The repository includes a comprehensive 150-point automated regression test suite validating HTML5 structure, sandboxed iframes, navigation routing, CSS lesson bundles, editor syntax, responsive CSS rules, and SQLite backend transactions:

```bash
cd html-mastery
npm test
```

Expected output:
```text
====================================================
   TEST SUITE: HTML & CSS MASTERY FULLSTACK PLATFORM  
====================================================

--- 1. Verifying All HTML Routes & Links ---
  [PASS] HTML Document valid: accessibility.html
  ...
--- 7. Verifying Backend & SQLite Database ---
  [PASS] Database module loaded
  [PASS] Native SQLite engine is available and active
  [PASS] Demo user alex_frontend authenticated via SQLite
  [PASS] Leaderboard returns top learners (Found 5)
  [PASS] Progress data successfully synced to SQLite

REGRESSION RESULTS: 150 passed, 0 failed out of 150 checks
>>> OVERALL REGRESSION STATUS: PASS <<<
```

---

## 🔮 Future Improvements

- **JavaScript Mastery Track**: Add interactive ES6+ modules, closures, async/await, and fetch sandbox exercises.
- **WebSocket Live Collaboration**: Real-time collaborative coding rooms with peer cursor syncing.
- **Automated Certificate Generation**: SVG and PDF downloadable achievement certificates upon completing 100% of HTML & CSS tracks.
- **PWA Offline Support**: Service Worker caching for seamless offline learning without internet access.

---

## 👨‍💻 Author

**Abhimanyu Tiwari**  
GitHub: [@abhimanyu1502](https://github.com/abhimanyu1502)
