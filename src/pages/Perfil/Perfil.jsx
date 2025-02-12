import React from 'react'
import "../Perfil/Perfil.css"

export const Perfil = () => {


  return (
    <>    
    <div className="areaPerfil">
      <h1>Perfil do Aluno</h1>
      <div className="fotoAluno">
        <img src="src/assets/img/zoi.jpg" alt="Foto do aluno" />
      </div>
    </div>
      <div className='container'>
      <div className="dadosAluno">
        <h2>{aluno.nome}</h2>
        <p><strong>Idade:</strong> {aluno.idade}</p>
        <p><strong>Curso:</strong> {aluno.curso}</p>
      </div>
      </div>
    </>
  );
};

const aluno = {
  nome: "Ever San Eyes",
  idade: 6,
  curso: "Educação Infantil",
};

export default Perfil;

