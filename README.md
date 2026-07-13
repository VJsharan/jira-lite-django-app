# Jira Lite - Django & React Issue Tracker

Jira Lite is a modern, lightweight issue-tracking application built with a powerful **Django REST Framework** backend and a fast, responsive **React (Vite)** frontend. It allows users to manage projects, create and track issues, and maintain a seamless workflow with robust JWT authentication.

---

## 🚀 Features

- **Robust Authentication:** Secure login and session management utilizing JWT (JSON Web Tokens) with access and refresh tokens.
- **Project Management:** Easily view all ongoing projects and their respective details on a unified dashboard.
- **Issue Tracking:** Create, view, and track issues under specific projects. Issues include custom properties like Priority (High, Medium, Low) and Status (Open, In Progress, Closed).
- **Interactive Dashboard:** A dynamic React-based dashboard mapping all user issues with visually distinct priority tags and smooth micro-animations.
- **Protected Routes:** Frontend route guards to ensure only authenticated users can access the dashboard and project details.
- **Modern UI/UX:** Clean, responsive, and intuitive interface styled with custom CSS and a sleek floating action button (FAB) for quick issue creation.

---

## 📸 Screenshots

### 1. Secure User Login
<img src="frontend/src/assets/Screenshot 2026-07-13 at 3.46.02 PM.png" alt="Login Screen" width="800"/>

### 2. Dashboard & Project Overview
<img src="frontend/src/assets/Screenshot 2026-07-13 at 3.46.37 PM.png" alt="Dashboard" width="800"/>

### 3. Project Details
<img src="frontend/src/assets/Screenshot 2026-07-13 at 3.47.29 PM.png" alt="Project Details" width="800"/>

### 4. Issue Creation
<img src="frontend/src/assets/Screenshot 2026-07-13 at 3.47.41 PM.png" alt="Create Issue Modal" width="800"/>

---

## 🛠 Tech Stack

### Backend
- **Framework:** [Django](https://www.djangoproject.com/) (Python)
- **API:** [Django REST Framework](https://www.django-rest-framework.org/) (DRF)
- **Authentication:** [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) for DRF
- **Database:** SQLite (Development) / PostgreSQL (Ready for production)

### Frontend
- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Styling:** Vanilla CSS with modern flexbox/grid layouts and glassmorphism touches.

---

## 📁 Project Structure

```text
jira-lite-django-app/
├── backend/            # Main Django project configuration settings & routing
├── frontend/           # React frontend built with Vite
│   ├── src/
│   │   ├── components/ # Reusable UI components (IssueModal, ProtectedRoute)
│   │   ├── pages/      # Page views (Dashboard, Login, ProjectDetails)
│   │   └── api.js      # Axios instance with interceptors for JWT
├── projects/           # Django app handling Projects, Issues, and Comments
├── users/              # Django app handling custom User models and Auth
└── manage.py           # Django execution script
```

---

## 🏁 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### 1. Backend Setup (Django)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VJsharan/jira-lite-django-app.git
   cd jira-lite-django-app
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```
   *The API will be available at `http://127.0.0.1:8000/`*

### 2. Frontend Setup (React/Vite)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   *The application will open in your browser, typically at `http://localhost:5173/`*

---

## 🔌 Core API Endpoints

- `POST /api/token/` - Obtain JWT access & refresh tokens
- `POST /api/token/refresh/` - Refresh expired access tokens
- `GET /api/projects/` - List all projects
- `GET /api/issues/` - List all issues
- `POST /api/issues/` - Create a new issue (requires JWT auth)

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
