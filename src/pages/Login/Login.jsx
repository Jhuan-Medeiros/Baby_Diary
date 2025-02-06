import React from "react";
import "../Login/Login.css";

const Login = () => {
  return (
    <div className="corpoLogin">

      <div className="tituloLogin">
        <img src="src\assets\img\logo.png" alt="logo" className="logo" />
        <h1 className="tituloSite">Baby Diary</h1>
      </div>
      <div className="areaLogin">
        <div className="areasDeRegistro">
          <label htmlFor="rg">CPF:</label>
          <input type="text" id="rg" />
          <label htmlFor="senha">Senha:</label>
          <input type="text" id="senha" />
          <p>Esqueci a senha</p>
        </div>
        <button className="acessoAoSite">Entrar</button>
      </div>
    </div>
  );
};

export default Login;
