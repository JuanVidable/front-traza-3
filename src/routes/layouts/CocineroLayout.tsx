import { Navbar } from "../../components/NavBar/Navbar";
import { Outlet } from "react-router";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../../styles/CajeroLayout.module.css"
import { useAppDispatch } from "../../hooks/redux";
import { useEffect } from "react";
import { SucursalService } from "../../services/SucursalService";
import { setSucursal } from "../../redux/slices/SucursalReducer";

export const CocineroLayout = () => {
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
            <Link className={styles.link} to="/cocinero-console">En Preparación</Link>
          </Typography>
          <Typography variant="h5" gutterBottom>
            <Link className={styles.link} to="stock">Stock Insumos</Link>
          </Typography>
        </div>
        
        <Outlet/>
    </div>
  )
}
