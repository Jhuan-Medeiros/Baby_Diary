import "../pages/Home/Home.css";
import { Link, useLocation } from "react-router-dom";

function NavsConfig({ children, src, alt, title }) {
    const location = useLocation(); // Obtém a URL atual

    return (
        <>
            <a className="nav-button">
                <figure>
                    <img alt={alt} className="img-config" src={src}/>
                    <div>
                        <h2>{title}</h2>
                        <figcaption>{children}</figcaption>
                    </div>
                </figure>
            </a>
        </>
    );
}

export default NavsConfig;
