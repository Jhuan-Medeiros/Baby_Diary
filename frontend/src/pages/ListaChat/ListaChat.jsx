import React from "react";
import "../ListaChat/ListaChat.css";

const users = ["Ana", "Carlos", "Maria", "João"]; // Lista de usuários

export const ListaChat = () => {
  return (
    <div className="corpoListaChat">
      <div className="tituloListaChat">
        <h1>Chats</h1>
      </div>
      <div className="listaChat">
        <div className="itensChat">
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <img
                src="https://s2-techtudo.glbimg.com/L9wb1xt7tjjL-Ocvos-Ju0tVmfc=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/q/l/TIdfl2SA6J16XZAy56Mw/canvaai.png"
                alt={`Avatar de ${user}`}
                className="user-avatar"
              />
              <div className="user-info">
                <h3>{user}</h3>
                <div>mensagens</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
