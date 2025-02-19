import React from 'react'
import "../Home/Home.css"

export const Home = () => {
  return (
    <>
      <div className="navbar">
        <nav>
          <strong>
            <div class="nav-item">
              <a href="" id="homeSelection" class="icon-link">
                <div class="icons-abaixo">
                  <img src="src/assets/img/homeAzul.png" alt="homeAzul" id="homeAzul" />
                  Home
                </div>
              </a>
              <a href="" class="icon-link">
                <div class="icons-abaixo">
                  <img src="src/assets/img/turmas.png" alt="turmas" id="turmas" />
                  Turmas
                </div>
              </a>
              <a href="" class="icon-link">
                <div class="icons-abaixo">
                  <img src="src/assets/img/perfil.png" alt="perfil" id="perfil" />
                  Perfil
                </div>
              </a>
              <a href="" class="icon-link">
                <div class="icons-abaixo">
                  <img src="src/assets/img/mensagens.png" alt="mensagens" id="mensagens" />
                  Chat
                </div>
              </a>
              <a href="" class="icon-link">
                <div class="icons-abaixo">
                  <img src="src/assets/img/config.png" alt="config" id="config" />
                  Configuração
                </div>
              </a>
            </div>
          </strong>
        </nav>
      </div>

      <div class="notifacaçao">
        <h1 id="avisos">Avisos:</h1>
        <hr />
        <div class="alinhamento-noti">
          <img src="src/assets/img/logo.png" alt="logo" id="logo" />
          <div class="letras-coluna">
            <p>EMEI Meu Anjo</p>
            <p id="data">3 de março 2025</p>
          </div>
        </div>
        <p id="aviso-msg">Amanhã não teremos aula devido ao feriado de Carnaval.</p>
      </div>

      <div class="chat-inicial">
        <div class="alinhamento-chat">
          <img src="src/assets/img/perfil-chat.png" alt="perfil-chat" id="perfil-chat" />
          <div class="letras-coluna2">
            <h2>Professor Cururu</h2>
            <p id="info-chat">Filho com problema intestinal</p>
          </div>
        </div>
      </div>

      <div class="rotina-inicial">
        <div class="alinhamento-rotina">
          <img src="src/assets/img/rotina.png" alt="rotina" id="rotina" />
          <h1 id="letras-coluna3">Rotina</h1>
        </div>
      </div>

      <div class="container-calendario">
        <div class="calendario-inicial">
          <div class="cabeçalho-calendario">
            <button id="prevBtn">←</button>
            <div class="mesAno" id="mesAno">
              <button id="nextBtnx">→</button>
            </div>
          </div>

          <div class="dias">
            <div class="dia">Seg</div>
            <div class="dia">Ter</div>
            <div class="dia">Qua</div>
            <div class="dia">Qui</div>
            <div class="dia">Sex</div>
            <div class="dia">Sab</div>
            <div class="dia">Dom</div>
          </div>
          <div class="datas" id="datas"></div>
        </div>
      </div>

    </>

  )
}
