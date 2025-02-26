import React from 'react'
import "../Perfil/Perfil.css"

export const Perfil = () => {

  const aluno = {
    nome: "Ever San Eyes",
    idade: 6,
    curso: "Educação Infantil",
    cpf: "123.456.789-00",
    email: "ever.san@example.com",
    dataInscricao: "31/12/2024",
    turma: "IDEV-2",
    telefoneResponsavel: "(14) 98765-4321",
  };

  return (
    <>    
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
            <p><strong>Idade:</strong> {aluno.idade} anos</p>
            <p><strong>Curso:</strong> {aluno.curso}</p>
            <p><strong>CPF:</strong> {aluno.cpf}</p>
            <p><strong>Email:</strong> {aluno.email}</p>
            <p><strong>Data de Inscrição:</strong> {aluno.dataInscricao}</p>
            <p><strong>Turma:</strong> {aluno.turma}</p>
            <p><strong>Telefone do Responsável:</strong> {aluno.telefoneResponsavel}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
