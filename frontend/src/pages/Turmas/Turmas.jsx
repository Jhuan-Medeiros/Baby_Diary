import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Turmas.css";
import NavbarProfessores from "../../components/navbarProfessores";

export const Turmas = () => {
  const navigate = useNavigate();
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
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmModal, setConfirmModal] = useState(null);

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

  const handleConfirmDelete = () => {
    if (confirmModal) {
      if (confirmModal.type === 'aluno') {
        handleDeleteAluno(confirmModal.turmaIndex, confirmModal.alunoIndex);
        setModalAlunoIndex(null);
        setShowSearchModal(false);
      } else if (confirmModal.type === 'turma') {
        handleDeleteTurma(confirmModal.turmaIndex);
      }
      setConfirmModal(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmModal(null);
  };

  // Filtra os alunos com base no termo buscado
  const filteredAlunos =
    modalAlunoIndex !== null
      ? turmas[modalAlunoIndex].alunos.filter((aluno) =>
          aluno.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

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
                  setShowSearchModal(false);
                }}
              >
                ›
              </span>
            </button>
            {expandedTurmas[index] && (
              <>
                <div className="turmaDetalhe">
                  <h3 className="turmaNomeHeader">{turma.nome}</h3>
                  <div className="listaAlunos">
                    {turma.alunos.length > 0 ? (
                      turma.alunos.map((aluno, idx) => (
                        <p key={idx}>
                          <span
                            className="alunoNomeClickable"
                            onClick={() =>
                              navigate("/perfil", { state: { aluno: { nome: aluno } } })
                            }
                          >
                            {aluno}
                          </span>{" "}
                          <button
                            className="excluirAlunoButton"
                            onClick={() =>
                              setConfirmModal({ type: 'aluno', turmaIndex: index, alunoIndex: idx })
                            }
                          >
                            Remover
                          </button>
                        </p>
                      ))
                    ) : (
                      <p>Sem alunos</p>
                    )}
                  </div>
                </div>
                <div className="turmaActions">
                  <button
                    className="adicionarAlunoButton"
                    onClick={() => {
                      setModalAlunoIndex(index);
                      setIsAddingAluno(true);
                      setShowSearchModal(false);
                    }}
                  >
                    Adicionar Aluno
                  </button>
                  <button
                    className="excluirTurmaButton"
                    onClick={() => setConfirmModal({ type: 'turma', turmaIndex: index })}
                  >
                    Excluir Turma
                 + </button>
                  <button
                    className="buscaAlunoButton"
                    onClick={() => {
                      setModalAlunoIndex(index);
                      setShowSearchModal(true);
                    }}
                  >
                    🔍 Buscar Aluno
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="botaoCriarTurmaContainer">
        <button className="botaoCriarTurma" onClick={handleOpenForm}>
          Adicionar Turma
        </button>
      </div>

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

      {modalAlunoIndex !== null && !showSearchModal && (
        <div className="modalOverlay">
          <div className="modalAlunoContent">
            {!isAddingAluno ? (
              <>
                <h2>{turmas[modalAlunoIndex].nome} - Alunos</h2>
                <div className="scrollHorizontal">
                  {turmas[modalAlunoIndex].alunos.length > 0 ? (
                    turmas[modalAlunoIndex].alunos.map((aluno, idx) => (
                      <div key={idx} className="alunoCard">
                        <span
                          className="alunoNomeClickable"
                          onClick={() =>
                            navigate("/perfil", { state: { aluno: { nome: aluno } } })
                          }
                        >
                          {aluno}
                        </span>{" "}
                        <button
                          className="excluirAlunoButton"
                          onClick={() =>
                            setConfirmModal({ type: 'aluno', turmaIndex: modalAlunoIndex, alunoIndex: idx })
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
                  <button onClick={() => {
                    setIsAddingAluno(false);
                    setShowSearchModal(false);
                    setModalAlunoIndex(null);
                  }}>
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showSearchModal && modalAlunoIndex !== null && (
        <div className="modalOverlay">
          <div className="modalAlunoContent">
            <h2>Buscar Aluno em {turmas[modalAlunoIndex].nome}</h2>
            <input
              type="text"
              placeholder="Buscar aluno..."
              className="campoBusca"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="scrollHorizontal">
              {filteredAlunos.length > 0 ? (
                filteredAlunos.map((aluno, idx) => (
                  <div key={idx} className="alunoCard">
                    <span
                      className="alunoNomeClickable"
                      onClick={() =>
                        navigate("/perfil", { state: { aluno: { nome: aluno } } })
                      }
                    >
                      {aluno}
                    </span>{" "}
                    <button
                      className="excluirAlunoButton"
                      onClick={() =>
                        setConfirmModal({ type: 'aluno', turmaIndex: modalAlunoIndex, alunoIndex: idx })
                      }
                    >
                      Excluir
                    </button>
                  </div>
                ))
              ) : (
                <p>Sem alunos encontrados</p>
              )}
            </div>
            <div className="modalButtons">
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setModalAlunoIndex(null);
                }}
              >
                Fechar Busca
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Confirmar Exclusão</h2>
            <p>
              {confirmModal.type === 'aluno'
                ? "Deseja remover este aluno?"
                : "Deseja excluir esta turma?"}
            </p>
            <div className="modalButtons">
              <button onClick={handleConfirmDelete}>Confirmar</button>
              <button onClick={handleCancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <NavbarProfessores />
    </div>
  );
};

export default Turmas;