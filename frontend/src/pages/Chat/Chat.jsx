import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //
import api from "../../../api";
import { useAuth } from "../../contexts/authContext";
import "./Chat.css";

const Chat = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // id da conversa
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const { usuario } = useAuth();

  useEffect(() => {
    const carregarMensagens = async () => {
      const res = await api.get(`/babydiary/mensagens/${id}`);
      setMensagens(res.data);
    };
    carregarMensagens();
  }, [id]);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    await api.post(`/babydiary/mensagens`, {
      id_conversa: id,
      id_usuario: usuario.id,
      conteudo: novaMensagem,
    });

    setNovaMensagem("");
    const res = await api.get(`/babydiary/mensagens/${id}`);
    setMensagens(res.data);
  };

  return (
    <div className="conversa-container">
      <div className="indentificador">
      <button onClick={() => navigate("/listaChat")} className="voltar-button">
        Voltar
      </button>
        <h1>{mensagens[0]?.usuario.nome}</h1>
      </div>
      <div className="mensagens-box">
        {mensagens.map((m) => (
          <div
            key={m.id}
            className={`mensagem ${
              m.id_usuario === usuario.id ? "enviada" : "recebida"
            }`}
          >
            <div className="mensagem-texto">{m.texto}</div>
          </div>
        ))}
      </div>

      <form className="form-mensagem" onSubmit={enviarMensagem}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
