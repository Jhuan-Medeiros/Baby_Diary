import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const RotaPrivada = ({ children }) => {
  const { usuario, loading } = useAuth();

  if (loading) {
    // Exibe um indicador de carregamento enquanto verifica o token
    return <div>Carregando...</div>;
  }

  if (!usuario) {
    console.log("Usuário não logado, redirecionando para login...");
    return <Navigate to="/" />;
  }

  console.log("Usuário logado:", usuario);
  return children ? children : <Outlet />;
};

export default RotaPrivada;