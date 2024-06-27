import { Outlet, useNavigate } from "react-router"
import BasicSidebar from "../../components/AdminDashboard/SidebarMenu/BasicSidebar"
import '../../styles/AdminDashboard.css'
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Navbar } from "../../components/NavBar/Navbar";

export const DashboardLayout = () => {
  //obtengo la empresa actual del estado global
  const empresaActual = useAppSelector((state) => state.empresaReducer.empresa);
  //obtengo la sucursal actual del estado global
  const sucursalActual = useAppSelector((state) => state.sucursalReducer.sucursal);
  const navigate = useNavigate(); 

  useEffect(() => {   
    //cuando cargo el dashboard me aseguro de que haya una empresa y una sucursal seleccionadas
    /*if(empresaActual === null && sucursalActual === null){ 
      navigate("/admin-console"); //si no hay ninguna seleccionada redirecciono al la consola para seleccionarlas
    }*/
  }, []);

  return (
    <div>
        <Navbar />
        <BasicSidebar/>    
        
        <div className="page-wrapper">
          <Outlet/>
        </div>
       
    </div>
  )
};
