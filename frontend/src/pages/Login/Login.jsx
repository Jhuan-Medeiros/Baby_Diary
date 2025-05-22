import React, { useState } from "react";
import "../Login/Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home } from "lucide-react";
 

const Login = () => { 
  const [isShow, setIsShow] = useState(false);
  
  const navigate = useNavigate();

  const mostrarSenha = () => setIsShow(!isShow);

  return (
    <div className="corpoLogin">
      <div className="tituloLogin">
        <img src="src\assets\img\logo.png" alt="logo" className="logo" />
        <h1 className="tituloSite">Baby Diary</h1>
      </div>
      <div className="areaLogin">
        <div className="areasDeRegistro">
          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" />  
          <label htmlFor="senha">Senha:</label>
          <div className="senhaInput">
            <input type={isShow ? "text": "password"} id="senha" />
            <button onClick={mostrarSenha} type="button" id="loginButton">
              {isShow && <Eye color="black" size={40} />}
              {!isShow && <EyeOff color="black" size={40} />}
            </button>
          </div>
          <Link to="/recuperarSenha" className="linkRedirecionamento">
            Esqueceu a senha
          </Link>
        </div>
        <button className="acessoAoSite" >
        <strong>Entrar </strong>
          </button>
      </div>
    </div>
  );
};

export default Login;