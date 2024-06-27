import { Link } from "react-router-dom";
import { Navbar } from "../../components/NavBar/Navbar";
import { Outlet } from "react-router";
import styles from "../../styles/CajeroLayout.module.css"
import { Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { useEffect } from "react";
import { setSucursal } from "../../redux/slices/SucursalReducer";
import { SucursalService } from "../../services/SucursalService";

export const CajeroLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let service = new SucursalService();
    service.getById(1).then((sucursal) => 
      dispatch(setSucursal(sucursal))
    )
  }, [])

  return (
    <div>
        <Navbar/>    
        
        <div className={styles.linksVistas + " mb-5"}>
          <Typography variant="h5" gutterBottom>
            <Link className={styles.link} to="/cajero-console">Nuevos</Link>
          </Typography>
          <Typography variant="h5" gutterBottom>
            <Link className={styles.link} to="entrega_pendiente">Entrega Pendiente</Link>
          </Typography>
        </div>

        <Outlet/>
    </div>
  )
}