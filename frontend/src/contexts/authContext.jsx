import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const token = localStorage.getItem("token");  

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Tempo atual em segundos

        if (decoded.exp && decoded.exp < currentTime) {
          // Token expirado
          localStorage.removeItem("token");
          setUsuario(null);
        } else {
          // Token válido
          setUsuario(decoded);
        }
      } catch (err) {
        console.error("Erro ao decodificar o token", err);
        localStorage.removeItem("token"); // Remove o token inválido
        setUsuario(null);
      }
    }
    setLoading(false); // Finaliza o carregamento
  }, []); // Executa apenas na montagem do componente

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUsuario(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);