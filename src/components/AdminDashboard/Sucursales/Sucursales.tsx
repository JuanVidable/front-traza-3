import { SucursalesList } from "../../AdminConsole/Sucursales/SucursalesList"
import { Typography, Box, Container } from "@mui/material"
import { SucursalService } from "../../../services/SucursalService"

export const SucursalCrud = () => {
  return (
    <Box  component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Sucursales
          </Typography>
        </Box>
        <div>
          <SucursalesList></SucursalesList>
        </div>
      </Container>
    </Box>
  )
}

export const sucursalesLoader = async () => {
  const service: SucursalService = new SucursalService();
  return service.getAll();
}

export const sucursalesByEmpresaLoader = async(id: number) =>{
  const service: SucursalService = new SucursalService();
  return service.findByEmpresaId(id);
}
