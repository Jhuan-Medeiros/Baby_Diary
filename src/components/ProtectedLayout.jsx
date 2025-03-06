import NavbarProfessores from "./navbarProfessores";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div>
      <NavbarProfessores />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
