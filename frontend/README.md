# Frontend - Sepsis Risk Tracker (React + Tailwind + Firebase)

This folder contains the React frontend for the Sepsis Risk Tracker app.
Users can log in, submit patient data, and view sepsis risk status.

------------------------------------------------------------

TECHNOLOGIES
- React 18
- Firebase Authentication
- TailwindCSS
- Secure dotenv config for API keys

------------------------------------------------------------

SETUP INSTRUCTIONS

cd frontend
npm install

------------------------------------------------------------

RUN DEVELOPMENT SERVER

npm start

Frontend runs on:
http://localhost:3000

------------------------------------------------------------

ENVIRONMENT CONFIGURATION

Create .env.local in this folder:

REACT_APP_FIREBASE_API_KEY=<your_api_key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your_auth_domain>
REACT_APP_FIREBASE_PROJECT_ID=<your_project_id>

(These variables are automatically ignored from git)

------------------------------------------------------------

FOLDER CONTENT
src/                  - UI components and pages
package.json          - Project configuration and scripts
tailwind.config.js    - Styling framework config
.gitignore            - Environment and build ignore rules
