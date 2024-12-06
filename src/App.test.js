import React, { useState } from 'react';
import UserProfile from './components/UserProfile/UserProfile';
import Login from './components/Login/Login';
import EditProfile from './components/EditProfile/EditProfile';
import Balance from './components/Balance/Balance';
import PrivateRoute from './components/PrivateRoute'; // Componente para rutas protegidas

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('/login');
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token); // Actualiza el estado del token para acceder a las rutas protegidas
    setCurrentRoute('/profile'); // Redirige a la página de perfil
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setCurrentRoute('/login'); // Redirige al login
  };

  const renderRoute = () => {
    switch (currentRoute) {
      case '/login':
        return <Login onLogin={handleLogin} />;
      case '/profile':
        return authToken ? <PrivateRoute><UserProfile /></PrivateRoute> : <Login onLogin={handleLogin} />;
      case '/EditProfile':
        return authToken ? <PrivateRoute><EditProfile /></PrivateRoute> : <Login onLogin={handleLogin} />;
      case '/Balance':
        return authToken ? <PrivateRoute><Balance /></PrivateRoute> : <Login onLogin={handleLogin} />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div>
      <header>
        {authToken && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </header>

      <div>
        {/* Renderizar el componente basado en el estado de la ruta */}
        {renderRoute()}
      </div>
    </div>
  );
};

export default App;
