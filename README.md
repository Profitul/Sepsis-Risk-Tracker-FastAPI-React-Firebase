# Sepsis Risk Tracker – FastAPI + React + Firebase

Full-stack application for sepsis monitoring.
FastAPI backend using Firebase Authentication and Firestore Database.
React frontend with TailwindCSS.

---

## 📌 Project Structure
sepsis/
├─ backend/ # FastAPI + Firebase API
│ ├─ main.py
│ ├─ firebase_client.py
│ ├─ requirements.txt
│ └─ .env.example
└─ frontend/ # React + Tailwind
├─ package.json
└─ src/

---

## ✅ Backend Setup (FastAPI + Firebase)

cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

Copy .env.example to .env:
Copy-Item .env.example .env

Make sure this line points to your local Firebase key file:
GOOGLE_APPLICATION_CREDENTIALS=backend/firebase_key.json

Run server:
uvicorn main:app --reload --host 0.0.0.0 --port 8000

## ✅ Frontend Setup (React + Tailwind)

cd frontend
npm ci
npm start

## Build Frontend (Production)

npm run build

## ✅ GitHub Actions (CI)

CI workflow checks backend deps and builds frontend.
File: .github/workflows/ci.yml