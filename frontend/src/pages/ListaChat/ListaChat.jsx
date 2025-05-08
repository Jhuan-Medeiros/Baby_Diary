import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // AQUI
import api from "../../../api";
import { useAuth } from "../../contexts/authContext";
import "./ListaChat.css";

const ListaChat = () => {
  const [chat, setchat] = useState([]);
  const { usuario } = useAuth();
  const navigate = useNavigate(); // AQUI

  useEffect(() => {
    if (usuario) {
      api.get(`/babydiary/conversas/${usuario.id}`).then((res) => {
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
      <h2>Chats</h2>
      <div className="chat-list">
        {chat.map((c) => (
          <div key={c.id} className="chat-card" onClick={() => abrirChat(c.id)}>
            <div className="chat-info">
              <strong>{c.nome}</strong>
              <p>
              {c.Usuario1?.id === usuario.id ? c.Usuario2?.nome : c.Usuario1?.nome}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaChat;
