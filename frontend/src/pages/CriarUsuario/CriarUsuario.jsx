import React, { useState } from "react";
import "../CriarUsuario/CriarUsuario.css";
import api from "../../../api";

export const CriarUsuario = () => {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [permissao, setPermissao] = useState("usuario"); // Padrão: Usuário
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleCadastro = async () => {
    setErro("");
    setSucesso("");

    if (!cpf || !nome || !senha || !telefone) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const resposta = await api.post("/babydiary/usuario/criar", {
        cpf,
        nome,
        senha,
        telefone,
        permissao,
      });

      if (resposta.data.sucesso) {
        setSucesso("Usuário criado com sucesso!");
        setCpf("");
        setNome("");
        setSenha("");
        setTelefone("");
        setPermissao("usuario"); // Resetar para o padrão
      } else {
        setErro(resposta.data.mensagem || "Erro ao criar usuário.");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="corpoCriarUsuario">
      <div className="formularios">
        <div className="areasDeRegistroUsuario">
          <h2 className="tituloCriarUsuario">Criar Usuário</h2>
          <input
            type="text"
            id="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            type="text"
            id="nome"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="password"
            id="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input
            type="text"
            id="telefone"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <div className="usuarioPermissao">
            <label>
              Admin
              <input
                type="radio"
                name="permissao"
                value="admin"
                checked={permissao === "admin"}
                onChange={() => setPermissao("admin")}
              />
            </label>

            <label>
              Usuário
              <input
                type="radio"
                name="permissao"
                value="usuario"
                checked={permissao === "usuario"}
                onChange={() => setPermissao("usuario")}
              />
            </label>

            <label>
              Professor
              <input
                type="radio"
                name="permissao"
                value="professor"
                checked={permissao === "professor"}
                onChange={() => setPermissao("professor")}
              />
            </label>
          </div>
        </div>

        {erro && <p className="mensagemErro">{erro}</p>}
        {sucesso && <p className="mensagemSucesso">{sucesso}</p>}

        <div className="confirmaçãoECancelar">
          <button onClick={handleCadastro}>Criar</button>
          <button onClick={() => console.log("Lógica para deletar usuário")}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

//1111111
//123123
