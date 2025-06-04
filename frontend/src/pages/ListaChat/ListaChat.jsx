import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // AQUI
import api from "../../services/api";
import { useAuth } from "../../contexts/authContext";
import "./ListaChat.css";

const ListaChat = () => {
  const [chat, setchat] = useState([]);
  const { usuario } = useAuth();
  const navigate = useNavigate(); // AQUI

  useEffect(() => {
    if (usuario) {
      api.get(`/conversas/${usuario.id}`).then((res) => {
        setchat(res.data);
        localStorage.setItem("id", usuario.id);
      });
    }
  }, [usuario]);

  const abrirChat = (idChat) => {
    navigate(`/conversas/${idChat}`);
  };

  return (
    <div className="chat-container">
      <h2 class="alinha-tit">Chats</h2>
      <div className="chat-list">
        {chat.map((c) => {
          const outroUsuario = c.Usuario1.id === usuario.id ? c.Usuario2 : c.Usuario1;
          return (
            <div key={c.id} className="chat-card" onClick={() => abrirChat(c.id)}>
              <div className="chat-info" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={
                    outroUsuario.imagem
                      ? `http://localhost:3011/${outroUsuario.imagem.replace(/\\/g, "/")}`
                      : "src/assets/img/perfil-chat.png"
                  }
                  alt="Foto do usuário"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: 8,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <strong>{outroUsuario.nome}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListaChat;
