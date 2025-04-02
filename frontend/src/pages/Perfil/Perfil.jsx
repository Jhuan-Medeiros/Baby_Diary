import React from 'react'
import "../Perfil/Perfil.css"
import axios from "axios"
import { useState, useEffect } from 'react';


export const Perfil = () => {

  const [aluno, setAluno] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await axios.get(`/babydiary/usuarios/${cpf}`); // Ajuste a URL conforme necessário
        setAluno(response.data);
      } catch (error) {
        setErro('Erro ao carregar os dados do aluno.');
      }
    };

    fetchAluno();
  }, []);

  if (erro) {
    return <div className="erro">{erro}</div>;
  }

  if (!aluno) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='corpoAreaPerfil'>    
      <div className="areaPerfil">
        <h1>Perfil do Aluno</h1>
        <div className="fotoAluno">
          <img src="src/assets/img/zoi.jpg" alt="Foto do aluno" />
        </div>
      </div>

      <div className="container">
        <p className="tituloDados">Dados Cadastrais</p>
        <div className="dadosAluno">
          <div className="perfilInfo">
            <h2>{aluno.nome}</h2>
            <p><strong>CPF:</strong> {aluno.cpf}</p>
            <p><strong>Email:</strong> {aluno.email}</p>
            <p><strong>Turma:</strong> {aluno.turma}</p>
            <p><strong>Telefone do Responsável:</strong> {aluno.telefone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
