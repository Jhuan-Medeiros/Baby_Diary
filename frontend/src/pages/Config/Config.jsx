import React from "react";
import "../Config/Config.css";
import { useNavigate } from "react-router-dom";



export const Config = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  return (
    <div className="corpoConfig">
      <div className="botoes">
        <button>Notificações</button>
        <button>Preferência de tema</button>
        <button>Feedback de aplicativo</button>
        <button>Contato da escola</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
