import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //
import api from "../../../api";
import { useAuth } from "../../contexts/authContext";
import "./Chat.css";
import { ArrowLeft } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // id da conversa
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [destinatario, setDestinatario] = useState(null); // Estado para o destinatário
  const { usuario } = useAuth();

  useEffect(() => {
    const carregarMensagens = async () => {
      const res = await api.get(`/babydiary/mensagens/${id}`);
      setMensagens(res.data);
    };

    const carregarDestinatario = async () => {
      const resConversa = await api.get(`/babydiary/conversas/conversa/${id}`);
      const outroUsuario =
        resConversa.data.usuario1_id === usuario.id
          ? resConversa.data.Usuario2
          : resConversa.data.Usuario1;
      setDestinatario(outroUsuario);
    };

    carregarMensagens();
    carregarDestinatario();
  }, [id]);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    if (!destinatario || !destinatario.id) {
      console.error("Destinatário não definido.");
      return;
    }

    await api.post(`/babydiary/mensagens`, {
      id_conversa: id,
      id_usuario: usuario.id,
      conteudo: novaMensagem,
      id_destinatario: destinatario.id,
    });

    setNovaMensagem("");
    const res = await api.get(`/babydiary/mensagens/${id}`);
    setMensagens(res.data);
  };

  return (
    <div className="conversa-container">
      <div className="indentificador">
        <button onClick={() => navigate("/listaChat")} id="voltar-button">
          <ArrowLeft color="white" size={30} />
        </button>
        <div className="usuario-info">
          {destinatario?.imagem && (
            <img
              src={`http://localhost:3011/${destinatario.imagem}`}
              alt="Foto do destinatário"
              className="imagem-perfil"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
          )}
          <h1>{destinatario?.nome || "Nome não encontrado"}</h1>
        </div>
      </div>
      {(!destinatario || !destinatario.id) && (
        <div style={{ color: "gray", margin: 10 }}>Carregando destinatário...</div>
      )}
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
        <button type="submit" disabled={!destinatario || !destinatario.id}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chat;
