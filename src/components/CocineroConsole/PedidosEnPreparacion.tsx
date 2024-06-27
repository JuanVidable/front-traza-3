import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { PedidoService } from "../../services/PedidoService";
import { PedidoDto } from "../../types/Pedido/Pedido";
import { PedidosTable } from "../PedidosTable/PedidosTable";
import { Container, Typography, Box } from "@mui/material";
import { removeElementActive } from "../../redux/slices/TablaDataReducer";
import { PedidoDetalle } from "../AdminDashboard/Pedidos/Detalle/PedidoDetalle";

export const PedidosEnPreparacion = () => {
  const dispatch = useAppDispatch();
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  const service = new PedidoService();
  const [pedidos, setPedidos] = useState<PedidoDto[]>([]);
  const [showDetalle, setShowDetalle] = useState<boolean>(false);

  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = () =>{ 
    if(idSucursal) {
        service.getPedidosCocina(1).then((data) => {
            setPedidos(data);
        });
    }
  };

  const handleSelection = () => {
    setShowDetalle(true);
  }

  const handleCloseDetalle = () => {
    dispatch(removeElementActive());
    setShowDetalle(false);
  }

  return (
    <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
            <Typography variant="h5" gutterBottom>
                Pedidos en Preparación
            </Typography>
        </Box>
        <PedidosTable
          pedidos={pedidos}
          getPedidos={getPedidos}
          handleSelection={handleSelection}
        />
        <PedidoDetalle
          open={showDetalle}
          handleClose={handleCloseDetalle}
        />
    </Container>
  )
}
