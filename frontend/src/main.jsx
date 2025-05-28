import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import RotaPrivada from "./components/rotaPrivada";

import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Perfil } from "./pages/Perfil/Perfil";
import { RecuperarSenha } from "./pages/RecuperarSenha/RecuperarSenha";
import { Rotina } from "./pages/Rotina/Rotina";
import { Turmas } from "./pages/Turmas/Turmas";
import { PaginaTurma } from "./pages/paginaTurma/PaginaTurma";
import ListaChat from "./pages/ListaChat/ListaChat";
import { Config } from "./pages/Config/Config";
import CriarUsuario from "./pages/CriarUsuario/CriarUsuario";
import Chat from "./pages/Chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/recuperarSenha",
    element: <RecuperarSenha />,
  },
  { path: "/criarUsuario", element: <CriarUsuario /> },
  {
    element: (
      <RotaPrivada>
        <ProtectedLayout />
      </RotaPrivada>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/perfil", element: <Perfil /> },
      { path: "/rotina", element: <Rotina /> },
      { path: "/turmas", element: <Turmas /> },
      { path: "/turmas/:id", element: <PaginaTurma /> },
      { path: "/listaChat", element: <ListaChat /> },
      { path: "/conversas/:id", element: <Chat /> },
      { path: "/config", element: <Config /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
