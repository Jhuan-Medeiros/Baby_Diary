import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; //
import api from "../../services/api";
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
  const [imagem, setImagem] = useState(null); // Estado para a imagem
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para o modal
  const mensagensRef = useRef(null);

  useEffect(() => {
    const carregarMensagens = async () => {
      const res = await api.get(`/mensagens/${id}`);
      setMensagens(res.data);
    };

    const carregarDestinatario = async () => {
      const resConversa = await api.get(`/conversas/conversa/${id}`);
      const outroUsuario =
        resConversa.data.usuario1_id === usuario.id
          ? resConversa.data.Usuario2
          : resConversa.data.Usuario1;
      setDestinatario(outroUsuario);
    };

    carregarMensagens();
    carregarDestinatario();
  }, [id]);

  useEffect(() => {
    if (mensagensRef.current) {
      setTimeout(() => {
        mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
      }, 0);
    }
  }, [mensagens]);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    if (!destinatario || !destinatario.id) {
      console.error("Destinatário não definido.");
      return;
    }

    try {
      await api.post(`/mensagens`, {
        id_conversa: id,
        id_usuario: usuario.id,
        id_destinatario: destinatario.id,
        conteudo: novaMensagem,          
      });

      setNovaMensagem("");
      const res = await api.get(`/mensagens/${id}`);
      setMensagens(res.data);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem.");
    }
  };

  const handleUpload = async () => {
    if (!imagem) return alert("Selecione uma imagem.");

    const formData = new FormData();
    formData.append("imagem", imagem);

    try {
      const res = await api.post(
        `/usuarios/${usuario.id}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAluno({ ...aluno, imagem: res.data.imagem }); // atualiza imagem no estado
      setMostrarModal(false); // fecha o modal
      setImagem(null); // limpa o input
      alert("Imagem atualizada com sucesso!"); // mostra alerta
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Erro ao enviar imagem.");
    }
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
      <div
        className="mensagens-box"
        ref={mensagensRef}
      >
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
