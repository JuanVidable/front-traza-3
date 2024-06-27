import { removeElementActive, setDataTable } from "../../../redux/slices/TablaDataReducer"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useState, useEffect } from "react";
import { Promocion } from "../../../types/Articulos/Promocion";
import formatPrice from "../../../types/formats/priceFormat";
import { Box, Container, Typography } from "@mui/material";
import { GenericTable } from "../../GenericTable/GenericTable";
import Swal from "sweetalert2";
import { PromocionDetalleModal } from "./Detalle/PromocionDetalleModal";
import { BotonNuevo } from "../../Botones/BotonNuevo";
import { PromocionService } from "../../../services/PromocionService";

export const Promociones = () => {
  const dispatch = useAppDispatch();
  const service = new PromocionService();
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  
  useEffect(() => {
    getPromociones();
  }, []);

  const columnsTablePromociones = [
    {
        label: "Denominación",
        key: "denominacion"
    },
    {
        label: "Inicio",
        key: "fechaDesde"
    },
    {
        label: "Fin",
        key: "fechaHasta"
    },
    {
        label: "Precio",
        key: "precioPromocional",
        render: (promo: Promocion) => {
            return formatPrice(promo.precioPromocional);
        }
    },
    {
        label: "Acciones",
        key: "acciones"
    },
    {
        label: "Habilitado",
        key: "btnHabilitar"
    }
  ];

  const getPromociones = async () => {
    if (idSucursal){
      await service.getAllBySucursalId(idSucursal).then((data) => {
        dispatch(setDataTable(data));
      });
    }
  }

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Eliminar promoción",
      text: "¿Desea eliminar la promoción para la sucursal actual o para la empresa?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar de Sucursal",
      denyButtonText: "Eliminar de empresa"
    }).then((result) => {
      if (result.isConfirmed) {
        if(idSucursal){
          service.darDeBaja(id, idSucursal).then(() => {
          getPromociones();
          });
        }
      } else if (result.isDenied) {
        service.delete(id).then(() => {
          getPromociones();
        });
      }
    });
  };

  const handleSelect = () => {
    setShowDetail(true);
  };

  const handleHabilitar = async (id: number) => {
    await service.changeHabilitadoState(id);
    getPromociones();
  };

  const handleClose = () => {
    dispatch(removeElementActive());
    setShowDetail(false);
  }

  return (
    <Box  component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Promociones
          </Typography>
          <BotonNuevo/>
        </Box>
        <GenericTable<Promocion> 
          handleDelete={handleDelete} 
          handleSelect={handleSelect}
          columns={columnsTablePromociones}
          handleHabilitar={handleHabilitar}>
        </GenericTable>
        <PromocionDetalleModal
        open={showDetail} 
        handleClose={handleClose} 
      />
      </Container>
     
    </Box>
  )
}