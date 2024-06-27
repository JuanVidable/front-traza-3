import { useEffect, useState } from "react";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { GenericTableButtons } from "./GenericTableButtons/GenericTableButtons";
import { Base } from "../../types/Base";
import { useAppSelector } from "../../hooks/redux";
import { useDispatch } from "react-redux";
import { setElementActive } from "../../redux/slices/TablaDataReducer";
import styles from "../../styles/GenericTable.module.css"
import { HabilitarButton } from "./GenericTableButtons/HabilitarButton";

interface IGenericTableColumn<T> {
    label: string;
    key: string;
    render?: (item: T) => React.ReactNode;
}

interface IPropsGenericTable<T> {
    columns: IGenericTableColumn<T>[];
    handleDelete: (id: number) => void;
    handleSelect: () => void;
    handleHabilitar: (id: number) => void 
} 

export const GenericTable = <T extends Base>({
        columns,
        handleDelete,
        handleSelect,
        handleHabilitar
    }: IPropsGenericTable<T>
) => {
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

  const dataTable = useAppSelector((state) => state.tableDataReducer.dataTable);

  useEffect(() => {
    setRows(dataTable);
  }, [dataTable]);

  const dispatch = useDispatch();

  const handleRowSelection = (row: any) => {
    dispatch(setElementActive({element: row}));
    handleSelect();
  }

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column: IGenericTableColumn<T>, i:number) => (
                            <TableCell key={i} align={"center"}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                {Array.isArray(rows) && rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index: number) => {
                        return(

                            <TableRow className={styles.row} hover role="checkbox" tabIndex={-1} key={index} >
                                {columns.map((column: IGenericTableColumn<T>, i: number) => {
                                    return(

                                        <TableCell key={i} align="center" onClick={() => {column.label!="Acciones" && column.label!="Habilitado" ? handleRowSelection(row) : null}} >
                                            {
                                                column.render ? (
                                                    column.render(row)
                                                ) : column.label === "Acciones" ? (
                                                    //buttons
                                                    <GenericTableButtons
                                                        item={row}
                                                        handleDelete={handleDelete}
                                                    ></GenericTableButtons>
                                                ) : column.label === "Habilitado" ? (
                                                    <HabilitarButton 
                                                        item={row}
                                                        handleHabilitar={handleHabilitar}
                                                    />
                                                ) : (
                                                    row[column.key]
                                                )
                                            }
                                        </TableCell>

                                    );
                                })}
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
    </div>
  )
}
