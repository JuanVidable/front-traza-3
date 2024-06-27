import { Box, Container, Typography } from "@mui/material"
import { GenericTable } from "../../GenericTable/GenericTable"
import Swal from "sweetalert2"
import { Empleado } from "../../../types/Empresas/Empleado"
import { useDispatch } from "react-redux"
import { setDataTable, removeElementActive } from "../../../redux/slices/TablaDataReducer"
import { EmpleadoService } from "../../../services/EmpleadoService"
import { useEffect, useState } from "react"
import { EmpleadoDetalle } from "./Detalle/EmpleadoDetalle"
import { BotonNuevo } from "../../Botones/BotonNuevo"
import { useAppSelector } from "../../../hooks/redux"

export const Empleados = () => {
  const dispatch = useDispatch(); //hook para setear los datos de la tabla
  const service = new EmpleadoService();  //servicio para interactuar con la api
  //id de la sucursal actual
  const idSucursal: number | undefined = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  const [showDetail, setShowDetail] = useState<boolean>(false); //estado para manejar la visualizacion del detalle

  useEffect(()=>{
    getEmpleados();
  }, []);

  //funcion para cargar los datos a mostrar
  const getEmpleados = async () => {
    if (idSucursal) {
      await service.getAllBySucursalId(idSucursal).then((data) => {
        dispatch(setDataTable(data));
      });
    } 
  };

  //funcion para manejar las eliminaciones
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar al empleado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        service.deleteById(id).then(() => {
          getEmpleados();
        });
      }
    });
  };

  //funcion para manejar la seleccion de un dato
  const handleSelect = () => {
    setShowDetail(true);
  }

  //funcion para manejar el cierre del detalle
  const handleClose = () => {
    dispatch(removeElementActive());
    setShowDetail(false);
  }

  //columnas de la tabla a mostrar
  const columnsTablaEmpleados = [
    {
      label: "Nombre",
      key: "nombre"
    },
    {
      label: "Apellido",
      key: "apellido"
    },
    /*{
      label: "Puesto/Rol",
      key: "usuario",
      render: (empleado: Empleado) => {
        return empleado.usuario.rol.toString();
      }
    },*/
    {
      label: "Acciones",
      key: "acciones"
    }
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
        <Typography variant="h5" gutterBottom>
          Empleados
        </Typography>
        <BotonNuevo/>
      </Box>

      <GenericTable<Empleado>
        handleDelete={handleDelete}
        columns={columnsTablaEmpleados}
        handleSelect={handleSelect}
        handleHabilitar={() => {}}>
      </GenericTable>
      
      <EmpleadoDetalle
        open={showDetail} 
        handleClose={handleClose} 
      />
      </Container>
    </Box>
  )
}