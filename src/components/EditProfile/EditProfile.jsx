import React, { useState, useEffect } from "react";
import { patchApi } from "../../api";
import "./EditProfile.css";
import { useLocation, Link } from "react-router-dom";

const EditProfile = ({ userId }) => {
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    eyeColor: "",
    balance: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Para manejar el tipo de mensaje

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userData = queryParams.get("userdata");

  useEffect(() => {
    if (userData) {
      try {
        const parsedData = JSON.parse(userData); 
        setUserDetails({
          id: parsedData._id,
          firstName: parsedData.name?.first || "",
          lastName: parsedData.name?.last || "",
          email: parsedData.email || "",
          phone: parsedData.phone || "",
          address: parsedData.address || "",
          eyeColor: parsedData.eyeColor || "",
          balance: parsedData.balance
            ? parsedData.balance.replace(/[^0-9.-]+/g, "") 
            : "",
          company: parsedData.company || "",
        });
      } catch (error) {
        setMessage("Error al procesar los datos del usuario.");
        setMessageType("error");
      }
    } else {
      const fetchUserDetails = async () => {
        try {
          const response = await patchApi(`/user/${userId}`, {});
          setUserDetails({
            firstName: response.name?.first || "",
            lastName: response.name?.last || "",
            email: response.email,
            phone: response.phone,
            address: response.address,
            eyeColor: response.eyeColor,
            balance: response.balance
              ? response.balance.replace(/[^0-9.-]+/g, "") 
              : "",
            company: response.company,
          });
        } catch (error) {
          setMessage("Error fetching user details");
          setMessageType("error");
        }
      };
      fetchUserDetails();
    }
  }, [userId, userData]);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await patchApi(`/user/${userDetails.id}`, {
        name: {
          first: userDetails.firstName,
          last: userDetails.lastName,
        },
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
        eyeColor: userDetails.eyeColor,
        balance: userDetails.balance,
        company: userDetails.company,
      });
      setMessage("Perfil actualizado correctamente!");
      setMessageType("success"); // Establecer tipo de mensaje como éxito
    } catch (error) {
      setMessage("Error actualizando el perfil");
      setMessageType("error"); // Establecer tipo de mensaje como error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Eye Color:</label>
          <input
            type="text"
            name="eyeColor"
            value={userDetails.eyeColor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Balance:</label>
          <input
            type="number"
            name="balance"
            value={userDetails.balance}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={userDetails.company}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
        <Link to={`/profile?userId=${userDetails.id}`} className="edit-button">
          Regresar
        </Link>
        {message && (
          <p className={messageType === "success" ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
