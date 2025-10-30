# Sepsis Risk Tracker
FastAPI + React + Firebase

Full-stack clinical monitoring web application for detecting and tracking potential sepsis risk.
Includes secure user authentication, protected backend routes, and real-time Firestore database
management.

------------------------------------------------------------

FEATURES
- User authentication using Firebase Authentication
- Firestore database for storing patient records
- FastAPI backend with JWT-based security
- React + TailwindCSS frontend
- CI workflow using GitHub Actions
- Secure environment variable handling (.env files not committed)

------------------------------------------------------------

PROJECT STRUCTURE
sepsis/
├─ backend/     FastAPI backend + Firebase integration
│  ├─ main.py
│  ├─ firebase_client.py
│  ├─ requirements.txt
│  └─ .env.example
└─ frontend/    React + TailwindCSS + Firebase frontend
   ├─ package.json
   └─ src/

------------------------------------------------------------

GETTING STARTED

1) Backend Setup
cd backend
python -m venv .venv
.\.venv\Scripts\activate   (Windows cmd)
pip install -r requirements.txt

Copy environment template:
copy .env.example .env

Run backend server:
uvicorn main:app --reload --port 8000


2) Frontend Setup
cd frontend
npm install
npm start

Frontend runs on: http://localhost:3000
Backend runs on: http://localhost:8000

------------------------------------------------------------

FUTURE IMPROVEMENTS
- Add structured sepsis scoring based on lab values
- Real-time alerts and notifications
- Dashboard analytics with risk evolution graphs
- Doctor and Patient role-based access control

------------------------------------------------------------

LICENSE
This project is released under the MIT License.
