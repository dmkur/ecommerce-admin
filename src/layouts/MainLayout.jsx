import "./MainLayout.css";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar, Topbar } from "../components";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const {currentUser} = useSelector(state=>state.authReducer)   
  const user =  currentUser && currentUser.isAdmin


  const ProtectedRoute = ({children}) => {     
    if(!user) return <Navigate to={'/login'}/>    

    return children
  }
 
  return (
    <ProtectedRoute>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};
export { MainLayout };
