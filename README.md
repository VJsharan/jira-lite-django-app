# Jira Lite Django App

A lightweight issue tracking system built with Django and React (Vite).

## Features

- Project Management
- Bug/Issue Tracking
- User Dashboard with Issue Overview
- Protected Routes & JWT Authentication
- Issue Creation via Modal
- User Logout Functionality

## Tech Stack

- **Backend:** Django, Django REST Framework
- **Frontend:** React, Vite, Tailwind CSS

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+

### Backend Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```bash
   python manage.py migrate
   ```

4. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
