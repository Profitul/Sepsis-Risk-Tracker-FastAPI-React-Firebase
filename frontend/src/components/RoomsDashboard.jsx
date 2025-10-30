import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db, auth } from '../firebase';

const RoomCard = ({ room, onDelete, onEnter }) => {
  return (
    <div onClick={() => onEnter(room.id)} className="cursor-pointer bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-blue-700">{room.nume}</h2>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(room.id);
          }}
        >
          Șterge
        </button>
      </div>
    </div>
  );
};

const RoomsDashboard = ({ onEnterRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  const loadRooms = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const saliRef = collection(db, "users", userId, "sali");
    const snapshot = await getDocs(saliRef);
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setRooms(list);
  };

  const handleAddRoom = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId || !newRoomName.trim()) return;

    const saliRef = collection(db, "users", userId, "sali");
    await addDoc(saliRef, { nume: newRoomName });
    setNewRoomName('');
    loadRooms();
  };

  const handleDeleteRoom = async (id) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const roomDoc = doc(db, "users", userId, "sali", id);
    await deleteDoc(roomDoc);
    loadRooms();
  };

  useEffect(() => {
    loadRooms();
  }, []);

return (
  <div className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Săli disponibile</h1>
      <button
        onClick={() => {
          auth.signOut().then(() => {
            localStorage.clear();
            indexedDB.deleteDatabase('firebaseLocalStorageDb');
            window.location.reload();
          });
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Deconectare
      </button>
    </div>

    <div className="mb-6 flex gap-4">
      <input
        className="border p-2 rounded w-full max-w-xs"
        placeholder="Nume sală"
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 rounded"
        onClick={handleAddRoom}
      >
        Adaugă sală
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onDelete={handleDeleteRoom}
          onEnter={onEnterRoom}
        />
      ))}
    </div>
  </div>
);

};

export default RoomsDashboard;
