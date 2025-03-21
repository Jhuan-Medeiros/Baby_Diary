import React, { useState } from "react";
import "../Login/Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home } from "lucide-react";
import api from "../../../api";

const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const [erro, setErro] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const mostrarSenha = () => setIsShow(!isShow);

  const fazerLogin = async () => {
    try {
      const resposta = await api.post("/babydiary/login", { cpf, senha });
      if (resposta.data.sucesso) {
        navigate("/home");
      } else {
        setErro("CPF ou senha incorretos.");
      }
    } catch (err) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="corpoLogin">
      <div className="tituloLogin">
        <img src="src\assets\img\logo.png" alt="logo" className="logo" />
        <h1 className="tituloSite">Baby Diary</h1>
      </div>
      <div className="areaLogin">
        <div className="areasDeRegistro">
          <label htmlFor="cpf">CPF:</label>
          <input 
            type="text" 
            id="cpf" 
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <label htmlFor="senha">Senha:</label>
          <div className="senhaInput">
            <input 
              type={isShow ? "text" : "password"} 
              id="senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={mostrarSenha} type="button" id="loginButton">
              {isShow && <Eye color="black" size={40} />}
              {!isShow && <EyeOff color="black" size={40} />}
            </button>
          </div>
          {erro && <p className="mensagemErro">{erro}</p>}
          <Link to="/recuperarSenha" className="linkRedirecionamento">
            Esqueceu a senha
          </Link>
        </div>
        <button className="acessoAoSite" onClick={fazerLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;