import { Box, Typography } from "@mui/material";
import { RankingProductosModule } from "./Charts/RankingProductos";
import { Container, Form } from "react-bootstrap";
import { useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { Sucursal } from "../../../types/Empresas/Sucursal";
import { SucursalService } from "../../../services/SucursalService";
import { setActiveSucursal } from "../../../redux/slices/EmpresaReducer";
import { RecaudacionDiaria } from "./Charts/RecaudacionDiaria";
import { RecaudacionMensual } from "./Charts/RecaudacionMensual";
import { CostosGanancias } from "./Charts/CostosGanancias";

export const EstadisticasSucursal = () => {
  const empresaActual = useAppSelector((state) => (state.empresaReducer.empresa));
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);

  useEffect(() => {
    if(empresaActual){
      let serviceSucursal = new SucursalService();
      serviceSucursal.findByEmpresaId(empresaActual.id).then((data) => {
        setSucursales(data);
      });
    }
  }, [empresaActual]);

  const handleSucursalSelection = (value: string) => {
    setActiveSucursal(Number(value));
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Estadísticas
          </Typography>
        </Box>
        { sucursales &&
          <Box className="mb-4">
            <Form.Select onChange={(e) => handleSucursalSelection(e.target.value)}>
              { 
                sucursales.map((sucursal: Sucursal) => 
                  <option value={String(sucursal.id)}>{sucursal.nombre}</option>
                )
              }
            </Form.Select>
          </Box>
        }
        <Box>
          <RankingProductosModule business="sucursal"/>
          <RecaudacionDiaria business="sucursal"/>
          <RecaudacionMensual business="sucursal"/>
          <CostosGanancias business="sucursal"/>
        </Box>
      </Container>
    </Box>
  )
}
