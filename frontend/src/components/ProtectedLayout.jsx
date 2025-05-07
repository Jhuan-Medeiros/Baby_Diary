import NavbarProfessores from "./navbarProfessores";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div>
      <Outlet />
      <NavbarProfessores />
    </div>
  );
};

export default ProtectedLayout;
