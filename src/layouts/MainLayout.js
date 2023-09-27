import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import { Sidebar, Topbar } from "../components";

const MainLayout = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};
export { MainLayout };
