// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  // Verifica si el token ha expirado
  const isTokenExpired = () => {
    if (!token) return true; // Si no hay token, redirigir a login

    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar el token JWT
    const expirationTime = decodedToken.exp * 1000; // Expira en milisegundos
    return Date.now() > expirationTime;
  };

  return isTokenExpired() ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
