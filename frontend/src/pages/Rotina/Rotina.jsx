import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { createRotina, getUsuarios } from "../../services/services.js";
import api from "../../services/api"; // certifique-se que este import está correto
import "../Rotina/Rotina.css";

export const Rotina = () => {
  const { usuario } = useAuth();
  const isAdmin = usuario?.tipo === 1;
  const isProfessor = usuario?.tipo === 2;
  const podeEditar = isAdmin || isProfessor;
  const [selected, setSelected] = useState({});
  const [evacuacao, setEvacuacao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [mensagemPopup, setMensagemPopup] = useState("");
  const [tipoPopup, setTipoPopup] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [alunoConfirmadoId, setAlunoConfirmadoId] = useState(null);

  const navigate = useNavigate();

  const rows = [
    "Fruta 8:30-9h",
    "Almoço 8:30-9h",
    "Leite 12:30-13h",
    "Lanche 12:30-13h",
    "Porção de fruta",
  ];

  const evacuacaoOptions = ["Normal", "Seco", "Mole", "Líquido", "Não Defecou"];

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const data = await getUsuarios();
        setAlunos(data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    }
    fetchAlunos();
  }, []);

  useEffect(() => {
    async function fetchRotina() {
      if (alunoConfirmadoId) {
        try {
          const res = await api.get(`/rotina/${alunoConfirmadoId}`);
          if (res.data) {
            setSelected(res.data.alimentacao || {});
            setEvacuacao(res.data.evacuacao || "");
            setObservacoes(res.data.observacoes || "");
          } else {
            setSelected({});
            setEvacuacao("");
            setObservacoes("");
          }
        } catch (err) {
          setSelected({});
          setEvacuacao("");
          setObservacoes("");
        }
      }
    }
    fetchRotina();
  }, [alunoConfirmadoId]);

  useEffect(() => {
    if (!podeEditar && usuario?.id) {
      async function fetchMinhaRotina() {
        try {
          const res = await api.get(`/rotina/${usuario.id}`);
          if (res.data) {
            setSelected(res.data.alimentacao || {});
            setEvacuacao(res.data.evacuacao || "");
            setObservacoes(res.data.observacoes || "");
          }
        } catch (err) {
          setSelected({});
          setEvacuacao("");
          setObservacoes("");
        }
      }
      fetchMinhaRotina();
    }
  }, [podeEditar, usuario]);

  const mostrarPopup = (mensagem, tipo) => {
    setMensagemPopup(mensagem);
    setTipoPopup(tipo);
    setTimeout(() => {
      setMensagemPopup("");
      setTipoPopup("");
    }, 3000);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(true);

    const filtered = alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAlunos(filtered);
  };

  const selecionarAluno = (aluno) => {
    setAlunoSelecionado(aluno.nome);
    setSearchTerm(aluno.nome);
    setShowResults(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alunoSelecionado) {
      mostrarPopup("Por favor, selecione um aluno.", "erro");
      return;
    }

    const todasRefeicoesPreenchidas = rows.every((row) => selected[row]);
    if (!todasRefeicoesPreenchidas) {
      mostrarPopup("Por favor, preencha todas as opções de alimentação.", "erro");
      return;
    }

    if (!evacuacao) {
      mostrarPopup("Por favor, selecione o tipo evacuação.", "erro");
      return;
    }

    const alimentacaoData = rows.reduce((acc, row) => {
      acc[row] = selected[row] || "";
      return acc;
    }, {});

    const data = {
      aluno: alunoConfirmadoId,
      alimentacao: alimentacaoData,
      evacuacao,
      observacoes,
      remetenteId: usuario.id,
    };

    try {
      await createRotina(data);
      mostrarPopup("Rotina enviada com sucesso!", "sucesso");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (err) {
      console.error("Erro:", err);
      mostrarPopup("Erro ao enviar rotina.", "erro");
    }
  };

  return (
    <div className="container-rotina">
      <div className="titulo">
        <h1 id="cor-tit">Rotina Diária</h1>
      </div>

      {(isAdmin || isProfessor) && (
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar aluno..."
            className="search-input"
            onFocus={() => setShowResults(true)}
          />
        </div>
      )}

      {searchTerm && (
        <div className="lista-alunos">
          {filteredAlunos.map((aluno) => (
            <div key={aluno.id} className="aluno-item">
              <span>{aluno.nome}</span>
              <button
                onClick={() => {
                  if (alunoConfirmadoId === aluno.id) {
                    setAlunoConfirmadoId(null);
                  } else {
                    selecionarAluno(aluno);
                    setAlunoConfirmadoId(aluno.id);
                  }
                }}
                style={{
                  backgroundColor: alunoConfirmadoId === aluno.id ? "green" : "",
                  color: alunoConfirmadoId === aluno.id ? "white" : "",
                }}
              >
                {alunoConfirmadoId === aluno.id ? "Confirmado" : "Confirmar"}
              </button>
            </div>
          ))}
        </div>
      )}

      {alunoConfirmadoId && (
        <div className="aluno-selecionado" style={{ margin: "10px 0", padding: 8, background: "#e0ffe0", borderRadius: 6 }}>
          <span>
            Selecionado:{" "}
            {filteredAlunos.find((a) => a.id === alunoConfirmadoId)?.nome || "Aluno"}
          </span>
          <button
            style={{ marginLeft: 12, background: "red", color: "white", border: "none", borderRadius: 4, padding: "4px 10px" }}
            onClick={() => setAlunoConfirmadoId(null)}
            type="button"
          >
            Desselecionar
          </button>
        </div>
      )}

      <div className="subtitulo">
        <h2 id="cor-sub">Informações da Rotina</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {mensagemPopup && (
          <div className={`popup ${tipoPopup}`}>{mensagemPopup}</div>
        )}

        <div className="tabela-rotina">
          <table>
            <thead>
              <tr>
                <th>Refeição</th>
                <th>Bom</th>
                <th>Pouco</th>
                <th>Não quis</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row}</td>
                  {["bom", "pouco", "naoQuis"].map((valor) => (
                    <td key={valor}>
                      <input
                        type="radio"
                        name={`row-${index}`}
                        checked={selected[row] === valor}
                        onChange={
                          podeEditar
                            ? () => setSelected({ ...selected, [row]: valor })
                            : undefined
                        }
                        readOnly={!podeEditar}
                        className={!podeEditar ? "visual-only" : ""}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="select-container">
          <label>Evacuação:</label>
          <select
            className="select-aluno"
            value={evacuacao}
            onChange={(e) => setEvacuacao(e.target.value)}
            disabled={!podeEditar}
          >
            <option value="">Selecione</option>
            {evacuacaoOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="observacoes">
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Observações"
            disabled={!podeEditar}
          />
        </div>

        {isAdmin && (
          <div className="enviarButao">
            <button id="enviar" type="submit">
              Enviar Rotina
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
