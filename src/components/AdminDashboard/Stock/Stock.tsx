import { Box, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { IconButton, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material"
import styles from "../../../styles/GenericTable.module.css"
import CIcon from "@coreui/icons-react"
import { cilPencil } from "@coreui/icons"
import { StockShort } from "../../../types/Articulos/Stock"
import { StockService } from "../../../services/StockService"
import { useAppSelector } from "../../../hooks/redux"

export const Stock = () => {
  const navigate = useNavigate(); //hook para navegar entre rutas
  const service: StockService = new StockService();   //servicio para interactuar con la api
  const [stocks, setStocks] =useState<StockShort[]>([]);    //estado para el contenido de la tabla

  //id de la sucursal actual
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  
  useEffect(()=>{
    getStocks();
  }, []);

  //función para obtener los datos a mostrar
  const getStocks = async () => {
    if (idSucursal) {
      let response: StockShort[] = await service.getAllBySucursalId(idSucursal);
      setStocks(response);
    };
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Función para cambiar de página
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Función para cambiar el número de filas por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Estado para almacenar las filas de la tabla
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    setRows(stocks);
  }, [stocks]);

  //funcion para manejar la edicion
  const handleEdit = (id: number) => {
    navigate("form/"+String(id));
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
        <Typography variant="h5" gutterBottom>
          Stock
        </Typography>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                      <TableCell align={"center"}>
                        Denominación
                      </TableCell>
                      <TableCell align={"center"}>
                        Stock Actual
                      </TableCell>
                      <TableCell align={"center"}>
                        Stock Mínimo
                      </TableCell>
                      <TableCell align={"center"}>
                        Stock Máximo
                      </TableCell>
                      <TableCell align={"center"}>
                        Editar
                      </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {Array.isArray(rows) && rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index: number) => {
                        return(
                            <TableRow className={styles.row} hover role="checkbox" tabIndex={-1} key={index} >
                                <TableCell align="center">
                                  {row["articuloInsumo"].denominacion}
                                </TableCell>
                                <TableCell align="center">
                                  {row["stockActual"]}
                                </TableCell>
                                <TableCell align="center">
                                  {row["stockMinimo"]}
                                </TableCell>
                                <TableCell align="center">
                                  {row["stockMaximo"]}
                                </TableCell>
                                <TableCell align={"center"}>
                                  <IconButton aria-label="editar" style={{backgroundColor: "var(--itemsColor)"}} onClick={() => handleEdit(row["id"])}>
                                    <CIcon icon={cilPencil} size="lg" />
                                  </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Container>
    </Box>
  )
}
