# JODBB Hackathon Project – Job Order Digitalization and Benchmarking System

This project was developed for the JODBB Hackathon to solve inefficiencies in manual job order tracking and technician performance management.
It provides a digital workflow system that enables planners, supervisors, and technicians to coordinate efficiently through a structured digital process.

---

## Overview

Traditional job order management in technical environments is often manual, slow, and error-prone.
Our solution introduces an automated, data-driven platform that tracks each step of the job order lifecycle — from planning to completion — while giving real-time visibility into technician productivity and process bottlenecks.

### Core Features

* **Role-Based Access System**

  * **Planner**: Assigns tasks and creates job orders.
  * **Supervisor**: Oversees technicians and tracks progress.
  * **Technician**: Executes assigned tasks and updates status.

* **Real-Time Progress Tracking**

  * Monitor job orders as they move through *Production → Quality → Testing* stages.
  * Automatic time tracking per task for efficiency benchmarking.

* **Task Benchmarking & Performance Insights**

  * Compare actual completion times against standard benchmarks.
  * Identify top performers and process bottlenecks.

* **Device & Job Order Traceability**

  * Track thousands of devices across multiple job orders with quick search and filtering.
  * Instant location and progress lookup for any device or technician.

* **Centralized Dashboard**

  * Unified view for supervisors and planners.
  * Summary metrics on productivity, pending tasks, and job order health.

---

## System Architecture

The project is built using a Django + PostgreSQL backend with a modern front-end (React/Tailwind) for an efficient, scalable setup.

```plaintext
Frontend: React + Tailwind CSS
Backend: Django REST Framework
Database: PostgreSQL
Authentication: JWT (JSON Web Tokens)
Deployment: Docker / Render / Railway
```

---

## Project Structure

```plaintext
project-root/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── jobtracker/                # Django core app
│   ├── technicians/               # Technician management
│   ├── supervisors/               # Supervisor module
│   ├── planners/                  # Planner module
│   ├── tasks/                     # Task pool and assignments
│   └── api/                       # REST endpoints
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── styles/
│   └── package.json
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-org-or-username>/jodbb-hackathon.git
cd jodbb-hackathon
```

### 2. Backend Setup (Django + PostgreSQL)

#### Create virtual environment

```bash
cd backend
python -m venv venv
source venv/bin/activate
```

#### Install dependencies

```bash
pip install -r requirements.txt
```

#### Set up environment variables

Copy `.env.example` to `.env` and fill in:

```
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/jodbb
```

#### Run migrations

```bash
python manage.py migrate
```

#### Create superuser (for planner or admin)

```bash
python manage.py createsuperuser
```

#### Run server

```bash
python manage.py runserver
```

Backend will start at:
[http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 3. Frontend Setup (React + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at:
[http://localhost:5173](http://localhost:5173)

---

## Key Functional Modules

| Module                  | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| **Authentication**      | JWT-based login for Technicians, Supervisors, and Planners        |
| **Task Management**     | Create, assign, and update job tasks with automatic time tracking |
| **Device Tracking**     | Searchable inventory of devices tied to job orders                |
| **Benchmarking Engine** | Compares actual vs. standard completion times                     |
| **Dashboard Analytics** | Role-based dashboards with charts and KPIs                        |

---

## Data Flow

```plaintext
Planner assigns → Supervisor monitors → Technician executes → System records metrics
```

1. Planner creates job order and assigns tasks.
2. Supervisor monitors technician progress and quality.
3. Technician updates task status.
4. System records timestamps and computes efficiency.
5. Dashboard displays insights to planners and supervisors.

---

## Tech Stack

| Layer               | Technology                    |
| ------------------- | ----------------------------- |
| **Frontend**        | React, Tailwind CSS, Axios    |
| **Backend**         | Django, Django REST Framework |
| **Database**        | PostgreSQL                    |
| **Auth**            | JWT (SimpleJWT)               |
| **Deployment**      | Docker, Railway / Render      |
| **Version Control** | Git + GitHub                  |

---

## Testing

Run backend unit tests:

```bash
python manage.py test
```

Run frontend tests (if applicable):

```bash
npm run test
```

---

## Contributors

| Name                       | Role                                                              |
| -------------------------- | ----------------------------------------------------------------- |
| Team JODBB Hackathon Group | Full-stack Developers & Designers                                 |
| —                          | Planner, Backend, Frontend, and Integration roles across the team |

---

## Future Enhancements

* Predictive analytics for job completion time
* Mobile-friendly interface for technicians
* Offline task mode (local caching)
* Integration with IoT sensors for device auto-updates


Would you like me to replace the GitHub link (`<your-org-or-username>`) with your actual repository URL so it’s 100% final?
