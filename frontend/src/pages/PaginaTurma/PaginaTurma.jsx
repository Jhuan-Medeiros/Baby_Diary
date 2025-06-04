import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./PaginaTurma.css";

export const PaginaTurma = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostrarPesquisa, setMostrarPesquisa] = useState(false);
  const token = localStorage.getItem("token");
  const tipoUsuario = Number(localStorage.getItem("tipo"));

  const carregarTurma = () => {
    fetch(`http://localhost:3011/babydiary/turmas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Usuário não autorizado. Faça login novamente.");
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then((data) => setTurma(data))
      .catch((err) => console.error("Erro ao carregar turma:", err));
  };

  useEffect(() => {
    carregarTurma();
  }, [id]);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta turma?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3011/babydiary/turmas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        alert("Usuário não autorizado. Faça login novamente.");
        navigate("/login");
        return;
      }

      if (res.ok) {
        alert("Turma excluída com sucesso!");
        navigate("/turmas");
      } else {
        alert("Erro ao excluir a turma.");
      }
    } catch (err) {
      console.error("Erro ao excluir a turma:", err);
      alert("Erro ao excluir a turma.");
    }
  };

  const togglePesquisa = async () => {
    if (mostrarPesquisa) {
      setMostrarPesquisa(false);
    } else {
      try {
        const res = await fetch("http://localhost:3011/babydiary/usuarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          alert("Usuário não autorizado. Faça login novamente.");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUsuarios(data);
        setMostrarPesquisa(true);
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
      }
    }
  };

  const adicionarAluno = async (idUsuario) => {
    try {
      const res = await fetch(
        `http://localhost:3011/babydiary/turmas/${id}/adicionar-aluno`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ usuarioId: idUsuario }),
        }
      );

      if (res.status === 401) {
        alert("Usuário não autorizado. Faça login novamente.");
        navigate("/login");
        return;
      }

      if (res.ok) {
        alert("Aluno adicionado com sucesso!");
        carregarTurma();
      } else {
        alert("Erro ao adicionar aluno");
      }
    } catch (err) {
      console.log("Erro ao adicionar aluno:", err);
    }
  };

  const removerAluno = async (idUsuario, nomeAluno) => {
    const confirmar = confirm(`Remover ${nomeAluno} da turma?`);
    if (!confirmar) return;

    try {
      const res = await fetch(
        `http://localhost:3011/babydiary/turmas/${id}/remover-aluno`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ usuarioId: idUsuario }),
        }
      );

      if (res.status === 401) {
        alert("Usuário não autorizado. Faça login novamente.");
        navigate("/login");
        return;
      }

      if (res.ok) {
        alert("Aluno removido com sucesso!");
        carregarTurma();
      } else {
        alert("Erro ao remover aluno.");
      }
    } catch (err) {
      console.error("Erro ao remover aluno:", err);
      alert("Erro ao remover aluno.");
    }
  };

  const criarChatComAluno = async (idAluno, nomeAluno) => {
    try {
      const res = await fetch("http://localhost:3011/babydiary/conversas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario1_id: Number(localStorage.getItem("id")),
          usuario2_id: idAluno,
          titulo: `Chat com ${nomeAluno}`,
        }),
      });

      if (res.ok) {
        alert("Chat criado com sucesso!");
      } else {
        const erro = await res.json();
        alert("Erro ao criar chat: " + (erro.detalhes || ""));
      }
    } catch (err) {
      alert("Erro ao criar chat.");
    }
  };

  if (!turma) return <p>Carregando...</p>;

  return (
    <div className="corpo-turma">
      <div className="centralizar-barra-turmas">
        <button onClick={() => navigate("/turmas")} id="voltar-button-turma">
          <ArrowLeft color="white" size={30} />
        </button>

        {tipoUsuario === 1 && (
          <button onClick={handleDelete} className="delete-turmas" id="delete-turmas">
            Excluir Turma
          </button>
        )}
      </div>

      <h1 className="titulo-turma">{turma.nome}</h1>
      <div class="container-turma">
        <div className="detalhes-turma">
          <h2 className="subtitulo-turma">Alunos na turma:</h2>
          <ul className="list-disc pl-5 space-y-2">
            {turma.alunos && turma.alunos.length > 0 ? (
              turma.alunos.map((aluno) => (
                <li key={aluno.id} className="aluno-item">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      className="aluno-foto"
                      src={
                        aluno.imagem
                          ? `http://localhost:3011/${aluno.imagem.replace(
                            /\\/g,
                            "/"
                          )}`
                          : "/src/assets/img/perfil-chat.png"
                      }
                      alt="Foto do aluno"
                    />
                    <span className="aluno-nome">{aluno.nome}</span>
                  </div>
                  <div className="aluno-botoes">
                    <button
                      onClick={() => criarChatComAluno(aluno.id, aluno.nome)}
                      className="btn-criar-chat"
                      id="btn-criar-chat"
                    >
                      Criar Chat
                    </button>
                    {tipoUsuario === 1 && (
                      <button
                        onClick={() => removerAluno(aluno.id, aluno.nome)}
                        className="btn-remover"
                        id="btn-remover"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li>Nenhum aluno cadastrado</li>
            )}
          </ul>

          {tipoUsuario === 1 && (
            <>
              <div className="alinha_aluno">
                <button
                  onClick={togglePesquisa}
                  className="adicionar_aluno"
                >
                  {mostrarPesquisa ? "Fechar busca de usuários" : "Adicionar Aluno"}
                </button>
              </div>

              {mostrarPesquisa && (
                <>
                  <h2 className="text-lg font-semibold mt-4">Buscar Usuários:</h2>
                  <input
                    type="text"
                    placeholder="Buscar usuário..."
                    className="w-full px-3 py-2 mb-4 border rounded"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  />

                  <ul className="space-y-2">
                    {usuariosFiltrados.map((usuario) => (
                      <li
                        key={usuario.id}
                        className="flex justify-between items-center"
                      >
                        <span>{usuario.nome}</span>
                        <button
                          onClick={() => adicionarAluno(usuario.id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Adicionar
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
