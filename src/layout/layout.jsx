import { Outlet } from "react-router-dom";
import NavbarApp from "./navbar/navbar";

function Layout() {
  return (
    <>
      <NavbarApp />
      <Outlet />
    </>
  );
}

export default Layout;
