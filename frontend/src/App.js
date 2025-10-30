import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import RoomsDashboard from './components/RoomsDashboard';
import RoomPage from './components/RoomPage';
import Login from './components/Login';

const AppWrapper = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Se încarcă...</div>;
  }

  if (!loggedIn) {
    return (
      <Routes>
        <Route path="*" element={<Login onLogin={() => setLoggedIn(true)} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<RoomsDashboard onEnterRoom={(id) => navigate(`/room/${id}`)} />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
