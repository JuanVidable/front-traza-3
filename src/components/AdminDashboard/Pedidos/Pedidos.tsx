import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { Box, Container, Typography } from "@mui/material";
import { PedidoDto } from "../../../types/Pedido/Pedido";
import { PedidoService } from "../../../services/PedidoService";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { removeElementActive } from "../../../redux/slices/TablaDataReducer";
import { PedidoDetalle } from "./Detalle/PedidoDetalle";
import { PedidosTable } from "../../PedidosTable/PedidosTable";

export const Pedidos = () => {
  const dispatch = useAppDispatch();
  const service: PedidoService = new PedidoService();   //servicio para interactuar con la api
  const [pedidos, setPedidos] = useState<PedidoDto[]>([]);    //estado para el contenido de la tabla
  const [showDetalle, setShowDetalle] = useState<boolean>(false);

  //id de la sucursal actual
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  
  const intialDateFrom = new Date();
  intialDateFrom.setMonth(0);
  intialDateFrom.setDate(1);
  const initialDateTo = new Date();
  initialDateTo.setMonth(11);
  initialDateTo.setDate(31);
  const [dateFrom, setDateFrom] = useState<Date>(intialDateFrom);
  const [dateTo, setDateTo] = useState<Date>(initialDateTo);
  const [error, setError] = useState<boolean>(false);

  useEffect(()=>{
    getPedidos();
  }, []);

  //función para obtener los datos a mostrar
  const getPedidos = async () => {
    if (idSucursal) {
      let response: PedidoDto[] = await service.getAllBySucursal(idSucursal, dateFrom, dateTo);
      setPedidos(response);
    };
  };

  const handleSelection = () => {
    setShowDetalle(true);
  }

  const handleCloseDetalle = () => {
    dispatch(removeElementActive());
    setShowDetalle(false);
  }

  const handleChangeDateInput = (inputId: string, date: string) => {
    let newDate: Date = new Date(date);
    if(inputId == "dateFrom"){
        setDateFrom(newDate);
    } else {    //dateTo
        setDateTo(newDate);
    }
  };

  const handleClickButtonVer = () => {
    if(dateFrom > dateTo) {
        setError(true);
        return;
    }
    getPedidos();
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
        <Typography variant="h5" gutterBottom>
          Pedidos
        </Typography>
      </Box>
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="date"
            id="dateFrom"
            aria-label="Desde"
            onChange={(e) => handleChangeDateInput(e.target.id, e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="date"
            id="dateTo"
            aria-label="Hasta"
            onChange={(e) => handleChangeDateInput(e.target.id, e.target.value)}
          />
        </Col>
        <Col>
          <Button type="button" onClick={handleClickButtonVer}>VER</Button>
        </Col>
      </Row>
      <Row className="mb-3">
        { error &&
          <div className="text-danger">Rango de fechas no válido</div>
        }
      </Row>
        <PedidosTable
          pedidos={pedidos}
          getPedidos={getPedidos}
          handleSelection={handleSelection}
        />
      </Container>
      <PedidoDetalle open={showDetalle} handleClose={handleCloseDetalle}/>
    </Box>
  )
}
