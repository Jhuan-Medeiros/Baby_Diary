import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PaginaTurma = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostrarPesquisa, setMostrarPesquisa] = useState(false);

  const carregarTurma = () => {
    fetch(`http://localhost:3011/babydiary/turmas/${id}`)
      .then((res) => res.json())
      .then((data) => setTurma(data))
      .catch((err) => console.error(err));
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
      });

      if (res.ok) {
        alert("Turma excluída com sucesso!");
        navigate("/turmas");
      } else {
        alert("Erro ao excluir a turma.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir a turma.");
    }
  };

  const togglePesquisa = async () => {
    if (mostrarPesquisa) {
      setMostrarPesquisa(false);
    } else {
      try {
        const res = await fetch("http://localhost:3011/babydiary/usuarios");
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarioId: idUsuario }),
        }
      );

      if (res.ok) {
        alert("Aluno adicionado com sucesso!");
        carregarTurma(); // Atualiza a turma com o novo aluno
      } else {
        alert("Erro ao adicionar aluno");
      }
    } catch (err) {
      console.log("Erro ao adicionar aluno:", err);
    }
  };

  if (!turma) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/turmas")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Voltar
        </button>
        <div className="flex gap-2">
          <button
            onClick={togglePesquisa}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {mostrarPesquisa ? "Fechar Adição de Aluno" : "Adicionar Aluno"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Excluir Turma
          </button>
        </div>
      </div>

      <h1 className="text-xl font-bold mb-2">{turma.nome}</h1>

      <h2 className="text-lg font-semibold mt-4">Alunos na turma:</h2>
      <ul className="list-disc pl-5 space-y-2">
        {turma.alunos && turma.alunos.length > 0 ? (
          turma.alunos.map((aluno) => (
            <li key={aluno.id} className="flex justify-between items-center">
              <span>{aluno.nome}</span>
              <button
                onClick={async () => {
                  const confirmar = confirm(`Remover ${aluno.nome} da turma?`);
                  if (!confirmar) return;

                  try {
                    const res = await fetch(
                      `http://localhost:3011/babydiary/turmas/${id}/remover-aluno`,
                      {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ usuarioId: aluno.id }),
                      }
                    );

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
                }}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remover
              </button>
            </li>
          ))
        ) : (
          <li>Nenhum aluno cadastrado</li>
        )}
      </ul>

      {/* Exibir barra de pesquisa e lista de usuários se mostrarPesquisa for true */}
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
    </div>
  );
};
