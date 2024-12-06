import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Balance.css";

const Balance = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userData = queryParams.get("userdata");

  if (!userData) {
    return <div>Error: No user data available</div>;
  }

  let user;
  try {
    user = JSON.parse(decodeURIComponent(userData));
  } catch (error) {
    console.error("Error parsing userdata:", error);
    return <div>Error: Invalid user data</div>;
  }

  const { balance, _id } = user;

  return (
    <div className="balance-container">
      <div className="balance-header">
        <h2>Your Balance</h2>
      </div>
      <div className="balance-details">
        <p>
          <strong>Balance:</strong> {balance}
        </p>
      </div>
      <Link to={`/profile?userId=${_id}`} className="back-button">
        Volver al perfil
      </Link>
    </div>
  );
};

export default Balance;
