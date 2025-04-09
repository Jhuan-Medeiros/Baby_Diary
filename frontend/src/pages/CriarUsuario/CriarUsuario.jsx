import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3011/babydiary/usuario/criar', {
        cpf,
        nome,
        email,
        senha,
        telefone,
        id_tipo: parseInt(tipoUsuario),
      });

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
      <h1>Criar Usuário</h1>
      <form onSubmit={handleSubmit}>
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
        <div>
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
        <button type="submit">Criar Usuário</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CriarUsuario;
