import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../firebase';
import axios from 'axios';
import { getIdToken } from 'firebase/auth';

const colorMap = {
  verde: 'bg-green-500',
  galben: 'bg-yellow-400',
  rosu: 'bg-red-500',
  negru: 'bg-black'
};

const RoomPage = () => {
  const { roomId } = useParams();
  const [pacienti, setPacienti] = useState([]);
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editNume, setEditNume] = useState('');
  const [editPrenume, setEditPrenume] = useState('');
  const [editId, setEditId] = useState(null);

  const loadPacienti = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    const response = await axios.get("http://localhost:8000/pacienti", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setPacienti(response.data);
  };

  const handleAdd = async () => {
    const user = auth.currentUser;
    if (!user || !nume.trim() || !prenume.trim()) return;

    const token = await user.getIdToken();

 const nivelDeRisc = Math.random();

let fc, fr, ta, spo2;

if (nivelDeRisc < 0.2) {
  // NEGRU: valori zero
  fc = fr = ta = spo2 = 0;
} else if (nivelDeRisc < 0.4) {
  // ROSU: valori critice
  fc = Math.floor(Math.random() * 30) + 181;  // >180
  fr = Math.floor(Math.random() * 10) + 61;   // >60
  ta = Math.floor(Math.random() * 20) + 30;   // <60
  spo2 = Math.floor(Math.random() * 10) + 75; // <85
} else if (nivelDeRisc < 0.7) {
  // GALBEN
  fc = Math.floor(Math.random() * 20) + 161;  // >160
  fr = Math.floor(Math.random() * 10) + 30;
  ta = Math.floor(Math.random() * 40) + 90;
  spo2 = Math.floor(Math.random() * 5) + 86;  // <90
} else {
  // VERDE: valori normale
  fc = Math.floor(Math.random() * 40) + 100;
  fr = Math.floor(Math.random() * 10) + 20;
  ta = Math.floor(Math.random() * 40) + 100;
  spo2 = Math.floor(Math.random() * 10) + 95;
}


    const pacient = { nume, prenume, fc, fr, ta, spo2 };

    await axios.post("http://localhost:8000/add_patient", pacient, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setNume('');
    setPrenume('');
    loadPacienti();
  };

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    await axios.delete(`http://localhost:8000/delete_patient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    loadPacienti();
  };

  const openEditModal = (pacient) => {
    setEditId(pacient.id);
    setEditNume(pacient.nume);
    setEditPrenume(pacient.prenume);
    setModalOpen(true);
  };

  const handleEditSave = async () => {
    const user = auth.currentUser;
    if (!user || !editId) return;

    const token = await user.getIdToken();

    await axios.put("http://localhost:8000/update_patient", {
      id: editId,
      nume: editNume,
      prenume: editPrenume,
      fc: 0,
      fr: 0,
      ta: 0,
      spo2: 0
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setModalOpen(false);
    loadPacienti();
  };

  useEffect(() => {
    loadPacienti();
  }, []);

return (
  <div className="p-6 relative">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Pacienți în sală</h1>
      <button
        onClick={() => {
          auth.signOut();
          window.location.reload(); // forțează reautentificarea
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Deconectare
      </button>
    </div>

    <div className="mb-6 flex gap-4">
      <input className="border p-2 rounded" placeholder="Nume" value={nume} onChange={(e) => setNume(e.target.value)} />
      <input className="border p-2 rounded" placeholder="Prenume" value={prenume} onChange={(e) => setPrenume(e.target.value)} />
      <button className="bg-green-500 text-white px-4 rounded" onClick={handleAdd}>Adaugă</button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {pacienti.map(p => (
        <div key={p.id} className="bg-gray-300 shadow rounded-lg p-4">
          <div className="mb-2 font-bold text-blue-700">
            {p.nume} {p.prenume}
          </div>
          <div className="grid grid-cols-2 gap-x-2 text-sm text-gray-700 mb-2">
            <div>FC: {p.fc}</div>
            <div>FR: {p.fr}</div>
            <div>TA: {p.ta}</div>
            <div>SpO₂: {p.spo2}</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <span>Status:</span>
            <div className={`w-4 h-4 rounded-full ${colorMap[p.risc] || 'bg-gray-300'}`} />
          </div>
          <div className="flex justify-between items-center mt-2">
            <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded" onClick={() => openEditModal(p)}>Modifică</button>
            <button className="bg-red-500 text-white text-xs px-2 py-1 rounded" onClick={() => handleDelete(p.id)}>Șterge</button>
          </div>
        </div>
      ))}
    </div>

    {modalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Modificare pacient</h2>
          <input className="border w-full p-2 mb-3 rounded" placeholder="Nume" value={editNume} onChange={(e) => setEditNume(e.target.value)} />
          <input className="border w-full p-2 mb-4 rounded" placeholder="Prenume" value={editPrenume} onChange={(e) => setEditPrenume(e.target.value)} />
          <div className="flex justify-end gap-2">
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setModalOpen(false)}>Anulează</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEditSave}>Modifică</button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default RoomPage;
