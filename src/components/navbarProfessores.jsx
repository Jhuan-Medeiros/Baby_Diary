import "../pages/Home/Home.css";
import { Link, useLocation } from "react-router-dom";

function NavbarProfessores() {
  const location = useLocation(); // Obtém a URL atual

  return (
    <div className="navbar">
      <nav>
        <strong>
          <div className="nav-item">
            <Link
              to="/home"
              className={`icon-link ${
                location.pathname === "/home" ? "active" : ""
              }`}
            >
              <div className="icons-abaixo">
                <img
                  src={
                    location.pathname === "/home"
                      ? "src/assets/img/homeAzul.png"
                      : "src/assets/img/home.png"
                  }
                  alt="home"
                  id="homeAzul"
                />
                Home
              </div>
            </Link>

            <Link
              to="/turmas"
              className={`icon-link ${
                location.pathname === "/turmas" ? "active" : ""
              }`}
            >
              <div className="icons-abaixo">
                <img
                  src={
                    location.pathname === "/turmas"
                      ? "src/assets/img/turmasAzul.png"
                      : "src/assets/img/turmas.png"
                  }
                  alt="turmas"
                  id="turmas"
                />
                Turmas
              </div>
            </Link>

            <Link
              to="/perfil"
              className={`icon-link ${
                location.pathname === "/perfil" ? "active" : ""
              }`}
            >
              <div className="icons-abaixo">
                <img
                  src={
                    location.pathname === "/perfil"
                      ? "src/assets/img/perfilAzul.png"
                      : "src/assets/img/perfil.png"
                  }
                  alt="perfil"
                  id="perfil"
                />
                Perfil
              </div>
            </Link>

            <Link
              to="/chat"
              className={`icon-link ${
                location.pathname === "/chat" ? "active" : ""
              }`}
            >
              <div className="icons-abaixo">
                <img
                  src={
                    location.pathname === "/chat"
                      ? "src/assets/img/mensagensAzul.png"
                      : "src/assets/img/mensagens.png"
                  }
                  alt="mensagens"
                  id="mensagens"
                />
                Chat
              </div>
            </Link>

            <Link
              to="/configuracao"
              className={`icon-link ${
                location.pathname === "/configuracao" ? "active" : ""
              }`}
            >
              <div className="icons-abaixo">
                <img
                  src={
                    location.pathname === "/config"
                      ? "src/assets/img/configAzul.png"
                      : "src/assets/img/config.png"
                  }
                  alt="config"
                  id="config"
                />
                Configuração
              </div>
            </Link>
          </div>
        </strong>
      </nav>
    </div>
  );
}

export default NavbarProfessores;
