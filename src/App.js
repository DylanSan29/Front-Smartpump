import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile';
import Login from './components/Login/Login';
import EditProfile from './components/EditProfile/EditProfile';
import Balance from './components/Balance/Balance';
import PrivateRoute from './components/PrivateRoute'; // Componente para rutas protegidas

const App = () => {
  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta pública de Login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Rutas protegidas */}
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/EditProfile/:userId" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/Balance" element={<PrivateRoute><Balance /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </Router>
  );
};

export default App;
