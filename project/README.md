# Full Stack Platform — Python Backend & Analytics Service

A modular Python service providing data modeling, curriculum ingestion, API clients, and analytics for the **Full Stack Web Development Mastery Platform**.

[![Live Platform](https://img.shields.io/badge/Live%20Demo-Surge.sh-6366f1?style=for-the-badge&logo=surge&logoColor=white)](https://abhim-html-mastery-v1.surge.sh)
[![Python CI](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12-blue?style=for-the-badge&logo=python&logoColor=white)](https://github.com/abhimanyu1502/full-stack-web-dev-course/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> 🌐 **Live Web Platform Preview**: [https://abhim-html-mastery-v1.surge.sh](https://abhim-html-mastery-v1.surge.sh)  
> 🔗 **Interactive Learning Dashboard**: [https://abhim-html-mastery-v1.surge.sh/dashboard.html](https://abhim-html-mastery-v1.surge.sh/dashboard.html)  
> 💻 **Visual Layout Playgrounds**: [https://abhim-html-mastery-v1.surge.sh/playgrounds.html](https://abhim-html-mastery-v1.surge.sh/playgrounds.html)  
> 📖 **HTML Topic 1 (Introduction)**: [https://abhim-html-mastery-v1.surge.sh/introduction.html](https://abhim-html-mastery-v1.surge.sh/introduction.html)

---

## 📁 Repository Structure

```
project/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow for Python testing
├── assets/                    # Project static media & diagrams
├── data/                      # Dataset storage & cache files
├── notebooks/
│   └── course_analytics.ipynb # Exploratory data analysis & curriculum metrics
├── src/
│   ├── models/
│   │   └── models.py          # UserProfile & LessonProgress dataclasses
│   ├── preprocessing/
│   │   └── curriculum_loader.py # Content parsing & word/line count metrics
│   ├── services/
│   │   └── api_client.py      # HTTP client for backend REST API endpoints
│   └── utils/
│       └── helpers.py         # XP level calculation & SHA-256 fingerprinting
├── tests/
│   └── test_platform.py       # Pytest unit & regression tests
├── .env.example               # Environment variables template
├── .gitignore                 # Python & virtual environment ignore rules
├── LICENSE                    # MIT License
├── requirements.txt           # Python dependency manifest
└── README.md                  # This documentation
```

---

## 🚀 Quickstart

### 1. Setup Virtual Environment
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Unit Tests
```bash
python -m pytest tests/
```

### 4. Run Analytics Notebook
```bash
jupyter lab notebooks/course_analytics.ipynb
```

---

## 🔗 Related Resources

- **Frontend Platform Source**: [`../html-mastery/`](../html-mastery/)
- **Live Hosted Application**: [https://abhim-html-mastery-v1.surge.sh](https://abhim-html-mastery-v1.surge.sh)
- **GitHub Repository**: [https://github.com/abhimanyu1502/full-stack-web-dev-course](https://github.com/abhimanyu1502/full-stack-web-dev-course)
