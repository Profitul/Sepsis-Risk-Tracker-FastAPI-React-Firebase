import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = () => {
  signInWithEmailAndPassword(auth, username.trim(), password)
    .then(() => {
      console.log('Autentificare reușită ✅');
      onLogin();
    })
    .catch((error) => {
      console.error('Eroare autentificare:', error.code, error.message);
      alert('Eroare: ' + error.message);
    });
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Autentificare</h2>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleLogin}
        >
          Conectează-te
        </button>
      </div>
    </div>
  );
};

export default Login;
