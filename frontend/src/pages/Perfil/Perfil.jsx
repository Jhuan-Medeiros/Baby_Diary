import React, { useState, useEffect } from "react";
import "../Perfil/Perfil.css";
import api from "../../../api";
import { useAuth } from "../../contexts/authContext";

export const Perfil = () => {
  const [aluno, setAluno] = useState(null);
  const [erro, setErro] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [imagem, setImagem] = useState(null);
  const { usuario } = useAuth();

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        if (!usuario) return;
        const response = await api.get(`/babydiary/usuarios/${usuario.id}`);
        setAluno(response.data);
      } catch (error) {
        setErro("Erro ao carregar os dados do usuário.");
      }
    };

    fetchAluno();
  }, [usuario]);

  const handleImagemClick = () => {
    setMostrarModal(true);
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setImagem(null);
  };

  const handleImagemSelecionada = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imagem) return alert("Selecione uma imagem.");

    const formData = new FormData();
    formData.append("imagem", imagem);

    try {
      const res = await api.post(
        `/babydiary/usuarios/${usuario.id}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAluno({ ...aluno, imagem: res.data.imagem }); // atualiza imagem no estado
      handleFecharModal();
      alert("Imagem atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Erro ao enviar imagem.");
    }
  };

  if (erro) return <div className="erro">{erro}</div>;
  if (!aluno) return <div>Carregando...</div>;

  return (
    <div className="corpoAreaPerfil">
      <div className="areaPerfil">
        <h1>Perfil do Usuário</h1>
        <div className="fotoAluno">
          <img
            src={`http://localhost:3011/${aluno.imagem}`}
            alt="Foto do usuário"
            onClick={handleImagemClick}
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              width: 150,
              height: 150,
            }}
          />
        </div>
      </div>

      <div className="container">
        <p className="tituloDados">Dados Cadastrais</p>
        <div className="dadosAluno">
          <div className="perfilInfo">
            <h2>{aluno.nome}</h2>
            <p>
              <strong>CPF:</strong> {aluno.cpf}
            </p>
            <p>
              <strong>Email:</strong> {aluno.email}
            </p>
            <p>
              <strong>Telefone:</strong> {aluno.telefone}
            </p>
            <p>
              <strong>Turma:</strong>{" "}
              {aluno.turmas?.map((t) => t.nome).join(", ") || "Nenhuma"}
            </p>
          </div>
        </div>
      </div>

      {/* Modal de upload */}
      {mostrarModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Enviar nova imagem</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemSelecionada}
            />
            <div className="modal-botoes">
              <button onClick={handleUpload}>Enviar</button>
              <button onClick={handleFecharModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
