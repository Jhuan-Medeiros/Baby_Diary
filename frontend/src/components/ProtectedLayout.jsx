import NavbarProfessores from "./navbarProfessores";
import { Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/turmas/") ||
    location.pathname.startsWith("/conversas/") ||
    location.pathname.startsWith("/chat/");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
      {!hideNavbar && <NavbarProfessores />}
    </div>
  );
};

export default ProtectedLayout;
