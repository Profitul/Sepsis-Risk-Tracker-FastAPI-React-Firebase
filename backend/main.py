from fastapi import FastAPI, Depends, Header, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from uuid import uuid4
import firebase_admin
from firebase_admin import credentials, firestore, auth as firebase_auth

# 🔐 Inițializare Firebase
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# 🚀 Inițializare FastAPI
app = FastAPI()

# 🌐 CORS pentru frontend pe localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📦 Model pacient
class Patient(BaseModel):
    id: str = ""
    nume: str
    prenume: str
    fc: int
    fr: int
    ta: int
    spo2: int
    risc: str = "necunoscut"

# ⚠️ Calcul risc sepsis
def calcul_risc(fc, fr, ta, spo2):
    if 0 in [fc, fr, ta, spo2]:
        return "negru"
    elif fc > 180 or fr > 60 or ta < 60 or spo2 < 85:
        return "rosu"
    elif fc > 160 or spo2 < 90:
        return "galben"
    return "verde"

# 🔐 Verificare token Firebase
def verify_token(authorization: str = Header(...)):
    try:
        token = authorization.replace("Bearer ", "")
        decoded = firebase_auth.verify_id_token(token)
        return decoded["uid"]
    except Exception:
        raise HTTPException(status_code=401, detail="Token invalid")

# ✅ Adăugare pacient
@app.post("/add_patient")
def add_patient(pacient: Patient, uid: str = Depends(verify_token)):
    pacient.id = str(uuid4())
    pacient.risc = calcul_risc(pacient.fc, pacient.fr, pacient.ta, pacient.spo2)
    db.collection("users").document(uid).collection("pacienti").document(pacient.id).set(pacient.dict())
    return {"status": "adaugat", "id": pacient.id, "risc": pacient.risc}

# ✅ Obținere pacienți
@app.get("/pacienti")
def get_pacienti(uid: str = Depends(verify_token)):
    docs = db.collection("users").document(uid).collection("pacienti").stream()
    return [doc.to_dict() for doc in docs]

# ✅ Ștergere pacient
@app.delete("/delete_patient/{pacient_id}")
def delete_patient(pacient_id: str = Path(...), uid: str = Depends(verify_token)):
    ref = db.collection("users").document(uid).collection("pacienti").document(pacient_id)
    ref.delete()
    return {"status": "sters"}

# ✅ Modificare pacient
@app.put("/update_patient")
def update_patient(pacient: Patient, uid: str = Depends(verify_token)):
    ref = db.collection("users").document(uid).collection("pacienti").document(pacient.id)
    ref.update({
        "nume": pacient.nume,
        "prenume": pacient.prenume
    })
    return {"status": "modificat"}
