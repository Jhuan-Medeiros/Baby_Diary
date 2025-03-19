import React from "react";
import "./RecuperarSenha.css";
import { Link } from "react-router-dom";

export const RecuperarSenha = () => {
  return (
    <div className="corpoRecuperarSenha">
      <div className="tituloRecuperarSenha">
        <img
          src="src\assets\img\logo.png"
          alt="logoRecuperar"
          className="logoRecuperar"
        />
        <h1>BabyDiary</h1>
      </div>
      <div className="areaRecuperarSenha">
        <div className="textoRecuperarSenha">
          <p className="avisoRecuperarSenha">Você receberá um código de confirmação antes de alterar a senha</p>
          <label htmlFor="rgDoBebe">Rg do bebê:</label>
          <input type="text" id="rgDoBebe" />
          <label htmlFor="contato">Digite seu e-mail ou celular:</label>
          <input type="text" id="contato" />
          <Link to="/" className="linkRedirecionamento">
            Voltar ao login
          </Link>
        </div>

        <button className="acessoAoSite">Entrar</button>
      </div>
    </div>
  );
};
