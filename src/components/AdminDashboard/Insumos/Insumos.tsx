import { ArticuloInsumoService } from "../../../services/ArticuloInsumoService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { ArticuloInsumo } from "../../../types/Articulos/ArticuloInsumo";
import { removeElementActive, setDataTable } from "../../../redux/slices/TablaDataReducer";
import formatBoolean from "../../../types/formats/booleanFormat";
import Swal from "sweetalert2";
import { GenericTable } from "../../GenericTable/GenericTable";
import { Box, Typography, Container} from "@mui/material";
import { InsumoDetailModal } from "./Detalle/InsumoDetailModal";
import { BotonNuevo } from "../../Botones/BotonNuevo";

export const InsumosCrud = () => {
  const dispatch = useAppDispatch();

  const [showDetail, setShowDetail] = useState<boolean>(false);

  //servicio para interactuar con la api
  const service: ArticuloInsumoService = new ArticuloInsumoService();

  //seteo el estado global data table con el array de insumos
  useEffect(() => {
    getInsumos();
  }, []);

  //defino las columnas de la tabla de insumos y si corresponde, un metodo para renderizar los valores
  const columnsTableInsumos = [
    {
      label: "Código",
      key: "codigo"
    },
    {
      label: "Denominacion",
      key: "denominacion"
    },
    {
      "label": "Para elaboración",
      "key": "esParaElaborar",
      render: (insumo: ArticuloInsumo) => {
        return formatBoolean(insumo.esParaElaborar);
      }
    },
    {
      "label": "Acciones",
      "key": "acciones"
    }
  ]

  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  //funcion para actualizar el estado global de los datos de la tabla
  const getInsumos = async () => {
    if (idSucursal) {
      await service.getAllBySucursalId(idSucursal).then((data) => {
        dispatch(setDataTable(data));
      });
    }
  };

  //funcion para manejar el eliminado de un insumo
  const handleDelete = async (id: number) => {
    //muestro una ventana para la confirmacion
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if(result.isConfirmed){ //si se confirma la eliminacion, elimino el insumo y cargo de nuevo los insumos
        service.delete(id).then(() => {
          getInsumos();
        });
      }
    });
  };

  const handleSelect = () => {
    setShowDetail(true);
  };

  const handleClose = () => {
    dispatch(removeElementActive());
    setShowDetail(false);
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Insumos
          </Typography>
          <BotonNuevo/>
        </Box>
        <GenericTable<ArticuloInsumo> 
          handleDelete={handleDelete}
          handleSelect={handleSelect}
          columns={columnsTableInsumos}
          handleHabilitar={() => {}}
        ></GenericTable>
        <InsumoDetailModal
          open={showDetail} 
          handleClose={handleClose} 
        />
      </Container>
    </Box>
  )
}