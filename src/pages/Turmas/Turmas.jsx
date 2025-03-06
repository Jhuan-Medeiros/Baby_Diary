import React from 'react';
import "./Turmas.css";
import NavbarProfessores from '../../components/navbarProfessores';

export const Turmas = () => {
  return (
    <div className='corpoTurmas'>
        <h1 className='tituloTurmas'>Turmas</h1>
        <div className='listaDeTurmas'>
            <button>Turma 1</button>
            <button>Turma 2</button>
            <button>Turma 3</button>
            <button>Turma 4</button>
            <button>Turma 5</button>
            <button>Turma 6</button>
        </div>
        <button className='botaoCriarTurma'>Adicionar Turma</button>
        <NavbarProfessores/>
    </div>
  )
}
