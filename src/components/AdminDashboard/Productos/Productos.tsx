import { ArticuloManufacturadoService } from "../../../services/ArticuloManufacturadoService"
import { GenericTable } from "../../GenericTable/GenericTable"
import { ArticuloManufacturado } from "../../../types/Articulos/ArticuloManufacturado"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { removeElementActive, setDataTable } from "../../../redux/slices/TablaDataReducer"
import Swal from "sweetalert2"
import formatPrice from "../../../types/formats/priceFormat"
import { Box, Typography } from "@mui/material";
import { ProductoDetailModal } from "./Detalle/ProductoDetailModal"
import { BotonNuevo } from "../../Botones/BotonNuevo"
import { Container } from "react-bootstrap"

export const ProductosCrud = () => {
  const dispatch = useAppDispatch();
  const service: ArticuloManufacturadoService = new ArticuloManufacturadoService();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));

  useEffect(() => {
    getProductos();
  }, []);

  const columnsTableProductos: any = [
    {
      label: "Código",
      key: "codigo"
    },
    {
      label: "Denominacion",
      key: "denominacion"
    },
    {
      label: "Precio de Venta",
      key: "precioVenta",
      render: (producto: ArticuloManufacturado) => {
        return formatPrice(producto.precioVenta);
      }
    },
    {
      label: "Categoria",
      key: "categoria",
      render: (producto: ArticuloManufacturado) => {
        if(producto.categoria){
          return producto.categoria.denominacion;
        } else {
          return "";
        }
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

  const getProductos = async () => {
    if (idSucursal){
      await service.getAllBySucursalId(idSucursal).then((data) => {
        dispatch(setDataTable(data));
      });
    }
  };

  const handleDelete = async (id: number) => {
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
      if(result.isConfirmed){
        service.delete(id).then(() => {
          getProductos();
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

  const handleHabilitar = async (id: number) => {
    await service.changeHabilitadoState(id);
    getProductos();
  }

  return (
    <Box  component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Productos
          </Typography>
          <BotonNuevo/>
        </Box>
        <GenericTable<ArticuloManufacturado> 
          handleDelete={handleDelete} 
          handleSelect={handleSelect}
          columns={columnsTableProductos}
          handleHabilitar={handleHabilitar}>
        </GenericTable>
        <ProductoDetailModal
          open={showDetail} 
          handleClose={handleClose} 
        />
      </Container>
    </Box>
  )
}