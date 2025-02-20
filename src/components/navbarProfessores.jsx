import "../pages/Home/Home.css"
import { Link } from "react-router-dom";


function NavbarProfessores() {
  return (
    <div className="navbar">
      <nav>
        <strong>
          <div className="nav-item">
            <Link to={"/home"} id="homeSelection" className="icon-link">
              <div className="icons-abaixo">
                <img
                  src="src/assets/img/homeAzul.png"
                  alt="homeAzul"
                  id="homeAzul"
                />
                Home
              </div>
            </Link>
            <Link to={"/turmas"} className="icon-link">
              <div className="icons-abaixo">
                <img src="src/assets/img/turmas.png" alt="turmas" id="turmas" />
                Turmas
              </div>
            </Link>
            <Link to={"/perfil"} className="icon-link">
              <div className="icons-abaixo">
                <img src="src/assets/img/perfil.png" alt="perfil" id="perfil" />
                Perfil
              </div>
            </Link>
            <Link to={"/chat"} className="icon-link">
              <div className="icons-abaixo">
                <img
                  src="src/assets/img/mensagens.png"
                  alt="mensagens"
                  id="mensagens"
                />
                Chat
              </div>
            </Link>
            <Link to={"/configuracao"} className="icon-link">
              <div className="icons-abaixo">
                <img src="src/assets/img/config.png" alt="config" id="config" />
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
