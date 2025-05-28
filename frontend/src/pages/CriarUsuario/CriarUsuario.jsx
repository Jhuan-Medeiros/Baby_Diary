import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../CriarUsuario/CriarUsuario.css";

const CriarUsuario = () => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        'http://localhost:3011/babydiary/usuario/criar',
        {
          cpf,
          nome,
          email,
          senha,
          telefone,
          id_tipo: parseInt(tipoUsuario),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Usuário criado com sucesso!");

      // Limpa os campos após sucesso
      setCpf('');
      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      setTipoUsuario('');

    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.warning("Usuário já existe com esse CPF ou email.");
        } else {
          toast.error(`Erro: ${error.response.data?.message || "Erro ao criar usuário."}`);
        }
      } else {
        toast.error("Erro ao conectar com o servidor.");
      }

      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div className="criarUsuario">
      <div className="corpoCriarUsuario">
        <button
          className="voltar-btn"
          onClick={() => navigate(-1)}
          type="button"
        >
          &#8592; Voltar
        </button>
        <form className="formularios" onSubmit={handleSubmit}>
          <h2 className="tituloCriarUsuario">Criar Usuário</h2>
          <div className="areasDeRegistroUsuario">
            <label>
              CPF:
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </label>
            <label>
              Nome:
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Senha:
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </label>
            <label>
              Telefone:
              <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
            </label>
          </div>
          <div className="usuarioPermissao">
            <p>Selecione o tipo de usuário:</p>
            <label>
              <input
                type="radio"
                name="tipoUsuario"
                value="1"
                checked={tipoUsuario === "1"}
                onChange={(e) => setTipoUsuario(e.target.value)}
                required
              />
              Administrador
            </label>
            <label>
              <input
                type="radio"
                name="tipoUsuario"
                value="2"
                checked={tipoUsuario === "2"}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              Professor
            </label>
            <label>
              <input
                type="radio"
                name="tipoUsuario"
                value="3"
                checked={tipoUsuario === "3"}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              Responsável
            </label>
          </div>
          <div className="confirmaçãoECancelar">
            <button className="confirmarCadastro" type="submit">Confirmar</button>
            <button className="cancelarCadastro" type="button">Cancelar</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CriarUsuario;
