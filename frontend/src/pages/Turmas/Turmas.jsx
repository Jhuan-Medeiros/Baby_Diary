import React, { useEffect, useState } from "react";
import "./Turmas.css";
import NavbarProfessores from "../../components/navbarProfessores";
import { useNavigate } from "react-router-dom";

export const Turmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [nomeNovaTurma, setNomeNovaTurma] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(null); // Inicializado como null
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Função para buscar turmas
  const buscarTurmas = async () => {

    try {
      const resposta = await fetch("http://localhost:3011/babydiary/turmas", {
        headers: {
          Authorization: `Bearer ${token}`, // Token para autenticação
        },
      });

      if (resposta.status === 401) {
        console.error("Usuário não autorizado.");
        return;
      }

      const dados = await resposta.json();
      setTurmas(dados);
    } catch (erro) {
      console.error("Erro ao buscar turmas:", erro);
    }
  };

  // Função para criar nova turma
  const criarTurma = async () => {
    if (!nomeNovaTurma.trim()) return;

    try {
      const resposta = await fetch(
        "http://localhost:3011/babydiary/turmas/criar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
          body: JSON.stringify({ nome: nomeNovaTurma }),
        }
      );

      if (resposta.ok) {
        setNomeNovaTurma("");
        setMostrarPopup(false);
        buscarTurmas(); // Atualiza as turmas após a criação
      } else {
        console.error("Erro ao criar turma.");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    }
  };

  // Atualiza o tipoUsuario quando a página é carregada
  useEffect(() => {
    const tipo = localStorage.getItem("tipo");
    setTipoUsuario(tipo); 
    buscarTurmas();
  }, []);

  return (
    <div className="corpoTurmas">
      <h1 className="tituloTurmas">Turmas</h1>

      <div className="listaDeTurmas">
        {turmas.length > 0 ? (
          turmas.map((turma) => (
            <button
              key={turma.id}
              onClick={() => navigate(`/turmas/${turma.id}`)}
            >
              {turma.nome}
            </button>
          ))
        ) : (
          <p>Nenhuma turma cadastrada.</p>
        )}
      </div>

      {/* Só mostra o botão se o tipoUsuario for "1" (admin) */}
      {tipoUsuario === "1" && (
        <button
          className="botaoCriarTurma"
          onClick={() => setMostrarPopup(true)}
        >
          Adicionar Turma
        </button>
      )}

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
