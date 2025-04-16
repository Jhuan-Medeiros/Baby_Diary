import React, { useEffect, useState } from 'react';
import "./Turmas.css";
import NavbarProfessores from '../../components/navbarProfessores';
import { useNavigate } from 'react-router-dom'; // <-- Importação nova

export const Turmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [nomeNovaTurma, setNomeNovaTurma] = useState("");
  const navigate = useNavigate(); // <-- Inicialização

  useEffect(() => {
    buscarTurmas();
  }, []);

  const buscarTurmas = async () => {
    try {
      const resposta = await fetch("http://localhost:3011/babydiary/turmas");
      const dados = await resposta.json();
      setTurmas(dados);
    } catch (erro) {
      console.error("Erro ao buscar turmas:", erro);
    }
  };

  const criarTurma = async () => {
    if (!nomeNovaTurma.trim()) return;

    try {
      const resposta = await fetch("http://localhost:3011/babydiary/turmas/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeNovaTurma })
      });

      if (resposta.ok) {
        setNomeNovaTurma("");
        setMostrarPopup(false);
        buscarTurmas();
      } else {
        console.error("Erro ao criar turma.");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    }
  };

  return (
    <div className='corpoTurmas'>
      <h1 className='tituloTurmas'>Turmas</h1>

      <div className='listaDeTurmas'>
        {turmas.length > 0 ? (
          turmas.map((turma) => (
            <button
              key={turma.id}
              onClick={() => navigate(`/turmas/${turma.id}`)} // <-- Redirecionamento
            >
              {turma.nome}
            </button>
          ))
        ) : (
          <p>Nenhuma turma cadastrada.</p>
        )}
      </div>

      <button
        className='botaoCriarTurma'
        onClick={() => setMostrarPopup(true)}
      >
        Adicionar Turma
      </button>

      {mostrarPopup && (
        <div className="popupOverlay">
          <div className="popupContent">
            <h2>Criar nova turma</h2>
            <input
              type="text"
              placeholder="Nome da turma"
              value={nomeNovaTurma}
              onChange={(e) => setNomeNovaTurma(e.target.value)}
            />
            <div className="botoesPopup">
              <button onClick={criarTurma}>Criar</button>
              <button onClick={() => setMostrarPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <NavbarProfessores />
    </div>
  );
};
