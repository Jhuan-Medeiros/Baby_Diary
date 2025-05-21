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
        <button>Feedback de aplicativo</button>
        <button>Contato da escola</button>
        <button onClick={() => navigate("/criarUsuario")}>Criar usuário</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
