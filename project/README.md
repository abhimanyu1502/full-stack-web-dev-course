# Full Stack Platform — Python Backend & Analytics Service

A modular Python service providing data modeling, curriculum ingestion, API clients, and analytics for the **Full Stack Web Development Mastery Platform**.

[![Live Platform](https://img.shields.io/badge/Live%20Demo-webmastery--v1.surge.sh-6366f1?style=for-the-badge&logo=surge&logoColor=white)](https://webmastery-v1.surge.sh)
[![GitHub Pages Mirror](https://img.shields.io/badge/Mirror-GitHub%20Pages-brightgreen?style=for-the-badge&logo=githubpages&logoColor=white)](https://abhimanyu1502.github.io/full-stack-web-dev-course/)
[![Python CI](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12-blue?style=for-the-badge&logo=python&logoColor=white)](https://github.com/abhimanyu1502/full-stack-web-dev-course/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

## 🌐 Live Platform Access

| Platform Section | Live URL |
| :--- | :--- |
| **🚀 Main Web App** | **[https://webmastery-v1.surge.sh](https://webmastery-v1.surge.sh)** |
| **📊 Learning Dashboard** | **[https://webmastery-v1.surge.sh/dashboard.html](https://webmastery-v1.surge.sh/dashboard.html)** |
| **🎮 Interactive Playgrounds** | **[https://webmastery-v1.surge.sh/playgrounds.html](https://webmastery-v1.surge.sh/playgrounds.html)** |
| **🔄 GitHub Pages Mirror** | **[https://abhimanyu1502.github.io/full-stack-web-dev-course/](https://abhimanyu1502.github.io/full-stack-web-dev-course/)** |

---

## 📁 Repository Structure

```text
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
# Standard library (zero-dependency)
python -m unittest discover -s tests

# Or using pytest
pytest tests/
```

### 4. Run Analytics Notebook

```bash
jupyter lab notebooks/course_analytics.ipynb
```

---

## 🔗 Related Resources

- **Frontend Platform Source**: [`../html-mastery/`](../html-mastery/)
- **Live Hosted Application**: [https://webmastery-v1.surge.sh](https://webmastery-v1.surge.sh)
- **GitHub Repository**: [https://github.com/abhimanyu1502/full-stack-web-dev-course](https://github.com/abhimanyu1502/full-stack-web-dev-course)
