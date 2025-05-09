import React, { useState, useEffect } from 'react';
import "../Perfil/Perfil.css";
import api from "../../../api";
import { useAuth } from "../../contexts/authContext";

export const Perfil = () => {
  const [aluno, setAluno] = useState(null);
  const [erro, setErro] = useState('');
  const { usuario } = useAuth();

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        if (!usuario) return;
        const response = await api.get(`/babydiary/usuarios/${usuario.id}`);
        setAluno(response.data);
      } catch (error) {
        setErro('Erro ao carregar os dados do usuário.');
      }
    };

    fetchAluno();
  }, [usuario]);

  if (erro) {
    return <div className="erro">{erro}</div>;
  }

  if (!aluno) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='corpoAreaPerfil'>
      <div className="areaPerfil">
        <h1>Perfil do Usuário</h1>
        <div className="fotoAluno">
          <img src="src/assets/img/zoi.jpg" alt="Foto do usuário" />
        </div>
      </div>

      <div className="container">
        <p className="tituloDados">Dados Cadastrais</p>
        <div className="dadosAluno">
          <div className="perfilInfo">
            <h2>{aluno.nome}</h2>
            <p><strong>CPF:</strong> {aluno.cpf}</p>
            <p><strong>Email:</strong> {aluno.email}</p>
            <p><strong>Telefone:</strong> {aluno.telefone}</p>
            <p><strong>Turma:</strong> {aluno.turmas?.map(t => t.nome).join(", ") || "Nenhuma"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
