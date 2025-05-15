import React, { useState } from "react";
import "./Turmas.css";
import NavbarProfessores from "../../components/navbarProfessores";

export const Turmas = () => {
  const [showForm, setShowForm] = useState(false);
  const [turmas, setTurmas] = useState([
    {
      nome: "Turma 1",
      alunos: Array.from({ length: 30 }, (_, i) => `Aluno ${i + 1}`),
    },
    {
      nome: "Turma 2",
      alunos: Array.from({ length: 20 }, (_, i) => `Aluno ${i + 31}`),
    },
  ]);

  const [newTurma, setNewTurma] = useState("");
  const [expandedTurmas, setExpandedTurmas] = useState({});
  const [modalAlunoIndex, setModalAlunoIndex] = useState(null);
  const [isAddingAluno, setIsAddingAluno] = useState(false);
  const [novoAlunoNome, setNovoAlunoNome] = useState("");

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setNewTurma("");
  };

  const handleAddTurma = () => {
    if (newTurma.trim() !== "") {
      setTurmas([...turmas, { nome: newTurma, alunos: [] }]);
      setNewTurma("");
      setShowForm(false);
    }
  };

  const handleToggleExpand = (index) => {
    setExpandedTurmas((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleConfirmAddAluno = () => {
    if (novoAlunoNome.trim() !== "") {
      const atualizadas = turmas.map((turma, idx) => {
        if (idx === modalAlunoIndex) {
          return { ...turma, alunos: [...turma.alunos, novoAlunoNome] };
        }
        return turma;
      });
      setTurmas(atualizadas);
      setNovoAlunoNome("");
      setIsAddingAluno(false);
    }
  };

  const handleDeleteTurma = (index) => {
    setTurmas(turmas.filter((_, idx) => idx !== index));
    // Remove o estado de expansão se necessário
    setExpandedTurmas((prev) => {
      const novo = { ...prev };
      delete novo[index];
      return novo;
    });
    if (modalAlunoIndex === index) {
      setModalAlunoIndex(null);
      setIsAddingAluno(false);
    }
  };

  const handleDeleteAluno = (turmaIndex, alunoIndex) => {
    setTurmas(
      turmas.map((turma, idx) => {
        if (idx === turmaIndex) {
          return {
            ...turma,
            alunos: turma.alunos.filter((_, aIdx) => aIdx !== alunoIndex),
          };
        }
        return turma;
      })
    );
  };

  return (
    <div className="corpoTurmas">
      <h1 className="tituloTurmas">Turmas</h1>
      <div className="listaDeTurmas">
        {turmas.map((turma, index) => (
          <div key={index} className="turmaItem">
            <button
              className="turmaButton"
              onClick={() => handleToggleExpand(index)}
            >
              <span className="turmaNome">{turma.nome}</span>
              <span
                className="arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalAlunoIndex(index);
                  setIsAddingAluno(false);
                }}
              >
                ›
              </span>
            </button>
            {expandedTurmas[index] && (
              <>
                <div className="listaAlunos">
                  {turma.alunos.length > 0 ? (
                    turma.alunos.map((aluno, idx) => (
                      <p key={idx}>
                        {aluno}{" "}
                        <button
                          className="excluirAlunoButton"
                          onClick={() => handleDeleteAluno(index, idx)}
                        >
                          Excluir
                        </button>
                      </p>
                    ))
                  ) : (
                    <p>Sem alunos</p>
                  )}
                </div>
                <button
                  className="adicionarAlunoButton"
                  onClick={() => {
                    setModalAlunoIndex(index);
                    setIsAddingAluno(true);
                  }}
                >
                  Adicionar Aluno
                </button>
                <button
                  className="excluirTurmaButton"
                  onClick={() => handleDeleteTurma(index)}
                >
                  Excluir Turma
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <button className="botaoCriarTurma" onClick={handleOpenForm}>
        Adicionar Turma
      </button>

      {showForm && (
        <div className="modalCriarTurma">
          <div className="modalContent">
            <h2>Criar Turma</h2>
            <input
              type="text"
              placeholder="Nome da Turma"
              value={newTurma}
              onChange={(e) => setNewTurma(e.target.value)}
            />
            <br />
            <br />
            <button onClick={handleAddTurma}>Adicionar</button>
            <button onClick={handleCloseForm}>Fechar</button>
          </div>
        </div>
      )}

      {modalAlunoIndex !== null && (
        <div className="modalOverlay">
          <div className="modalAlunoContent">
            {!isAddingAluno ? (
              <>
                <h2>{turmas[modalAlunoIndex].nome} - Alunos</h2>
                <input
                  type="text"
                  placeholder="Buscar aluno..."
                  className="campoBusca"
                  onChange={(e) => {
                    const termo = e.target.value.toLowerCase();
                    const alunosFiltrados = turmas[modalAlunoIndex].alunos.filter(
                      (aluno) => aluno.toLowerCase().includes(termo)
                    );
                    setTurmas((prev) =>
                      prev.map((turma, idx) =>
                        idx === modalAlunoIndex
                          ? { ...turma, alunosFiltrados }
                          : turma
                      )
                    );
                  }}
                />
                <div className="scrollHorizontal">
                  {(turmas[modalAlunoIndex].alunosFiltrados ||
                    turmas[modalAlunoIndex].alunos).length > 0 ? (
                    (turmas[modalAlunoIndex].alunosFiltrados ||
                      turmas[modalAlunoIndex].alunos).map((aluno, idx) => (
                      <div key={idx} className="alunoCard">
                        {aluno}{" "}
                        <button
                          className="excluirAlunoButton"
                          onClick={() =>
                            handleDeleteAluno(modalAlunoIndex, idx)
                          }
                        >
                          Excluir
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>Sem alunos cadastrados</p>
                  )}
                </div>
                <div className="modalButtons">
                  <button onClick={() => setIsAddingAluno(true)}>
                    Adicionar Novo Aluno
                  </button>
                  <button onClick={() => setModalAlunoIndex(null)}>
                    Fechar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Adicionar Aluno</h2>
                <input
                  type="text"
                  placeholder="Digite o nome do aluno"
                  value={novoAlunoNome}
                  onChange={(e) => setNovoAlunoNome(e.target.value)}
                  className="adicionarAlunoInput"
                />
                <div className="modalButtons">
                  <button onClick={handleConfirmAddAluno}>Adicionar</button>
                  <button onClick={() => setIsAddingAluno(false)}>
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <NavbarProfessores />
    </div>
  );
};

export default Turmas;