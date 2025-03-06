import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Perfil } from "./pages/Perfil/Perfil";
import { RecuperarSenha } from "./pages/RecuperarSenha/RecuperarSenha";
import { Rotina } from "./pages/Rotina/Rotina";
import { Turmas } from "./pages/Turmas/Turmas";
import { ListaChat } from "./pages/ListaChat/ListaChat";
import { Config } from "./pages/Config/Config";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Página inicial sem navbar
  },
  {
    element: <ProtectedLayout />, // Grupo de rotas protegidas com navbar
    children: [
      { path: "/home", element: <Home /> },
      { path: "/perfil", element: <Perfil /> },
      { path: "/rotina", element: <Rotina /> },
      { path: "/turmas", element: <Turmas /> },
      { path: "/listaChat", element: <ListaChat/> },
      { path: "/config", element: <Config/>},
    ],
  },
  {
    path: "/recuperarSenha",
    element: <RecuperarSenha />, // Sem navbar
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

