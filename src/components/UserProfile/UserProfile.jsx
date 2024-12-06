import React, { useState, useEffect } from "react";
import { getApi } from "../../api";
import "./UserProfile.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  // Obtener el valor de userId
  const userId = queryParams.get('userId');
  useEffect(() => {
    getApi(`/user/${userId}`)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError("Error fetching user data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const logout = () => {
    localStorage.removeItem("authToken");  // Elimina el token de sesión
    navigate("/login");  // Redirige a la página de login
  };
  const {
    name,
    age,
    email,
    balance,
    company,
    phone,
    address,
    eyeColor,
    picture,
    _id,
  } = user;
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div
          className="profile-img"
          style={{ backgroundImage: `url(${picture})` }}
        ></div>
        <div className="profile-options">
          <Link
            to={{
              pathname: "/Balance",
              search: `?userdata=${encodeURIComponent(JSON.stringify(user))}`, // Serializar el objeto
            }}
            className="edit-button"
          >
            Balance
          </Link>

          <Link
            to={{
              pathname: `/EditProfile/${_id}`,
              search: `?userdata=${encodeURIComponent(JSON.stringify(user))}`, // Serializar el objeto
            }}
            className="edit-button"
          >
            Editar perfil
          </Link>
          <button onClick={logout} className="logout-button edit-button">
            Cerrar sesion
          </button>
        </div>
      </div>
      <div className="profile-details">
        <ul>
          <li>
            <strong>Name:</strong> {name.first} {name.last}
          </li>
          <li>
            <strong>Age:</strong> {age}
          </li>
          <li>
            <strong>Email:</strong> {email}
          </li>
          <li>
            <strong>Balance:</strong> {balance}
          </li>
          <li>
            <strong>Company:</strong> {company}
          </li>
          <li>
            <strong>Phone:</strong> {phone}
          </li>
          <li>
            <strong>Address:</strong> {address}
          </li>
          <li>
            <strong>Eye Color:</strong> {eyeColor}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
