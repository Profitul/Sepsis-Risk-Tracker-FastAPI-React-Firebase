# Backend - Sepsis Risk Tracker (FastAPI + Firebase)

This folder contains the backend service for the Sepsis Risk Tracker application.
The backend is responsible for:
- Validating Firebase authentication tokens
- Managing patient data stored in Firestore
- Providing secure REST API endpoints to the frontend

------------------------------------------------------------

TECHNOLOGIES
- FastAPI
- Python 3.x
- Firebase Admin SDK
- Firestore Database
- Uvicorn

------------------------------------------------------------

ENVIRONMENT VARIABLES
Create a `.env` file based on `.env.example`:

GOOGLE_APPLICATION_CREDENTIALS=backend/firebase_key.json
FIREBASE_PROJECT_ID=<your_project_id>

------------------------------------------------------------

INSTALLATION

cd backend
python -m venv .venv
.\.venv\Scripts\activate   (Windows CMD or PowerShell)
pip install -r requirements.txt

------------------------------------------------------------

RUN DEVELOPMENT SERVER

uvicorn main:app --reload --host 0.0.0.0 --port 8000

Open API docs:
http://localhost:8000/docs

------------------------------------------------------------

FOLDER CONTENT
main.py               - FastAPI entry point with routes
firebase_client.py    - Firebase connection and auth utilities
requirements.txt      - Python dependencies
.env.example          - Environment variable template
