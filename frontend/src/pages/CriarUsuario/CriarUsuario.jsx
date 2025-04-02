import React, { useState } from 'react';
import axios from 'axios';
import "../CriarUsuario/CriarUsuario.css";

const CriarUsuario = () => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/babydiary/usuario/criar', {
        cpf,
        nome,
        email,
        senha,
        telefone,
      });
      setMensagem(response.data.mensagem);
    } catch (error) {
      setMensagem('Erro ao criar o usuário');
    }
  };

  return (  
    <div className="criarUsuario">
      <h1>Criar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label>
          CPF:
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </label>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <label>
          Telefone:
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </label>
        <button type="submit">Criar Usuário</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CriarUsuario;
