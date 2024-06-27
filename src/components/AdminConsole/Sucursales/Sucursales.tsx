import { Box, Typography } from "@mui/material"
import { SucursalesList } from "./SucursalesList"
import { useAppSelector } from "../../../hooks/redux"

export const Sucursales = () => {

  const empresaSelected = useAppSelector((state) => state.empresaReducer.empresa);

  return (
    <div>
      <Box>
        <Typography variant="h5" gutterBottom>
          {empresaSelected?.nombre} <br/>
          ¿Con qué sucursal quiere acceder?
        </Typography>
      </Box>
      <div className="d-flex flex-row card-container">
        <SucursalesList></SucursalesList>
      </div>
    </div>
  )
}
