import React from "react";
import "../Config/Config.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export const Config = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const isAdmin = usuario?.tipo === 1;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="corpoConfig">
      <div className="botoes">
        <button>Feedback de aplicativo</button>
        <button>Contato da escola</button>
        {isAdmin && (
          <button onClick={() => navigate("/criarUsuario")}>Criar usuário</button>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
