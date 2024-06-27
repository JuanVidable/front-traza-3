import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { UnidadMedidaService } from "../../../services/UnidadMedidaService";
import { UnidadMedida } from "../../../types/Articulos/UnidadMedida";
import { useLoaderData } from "react-router";
import { setDataTable, removeElementActive } from "../../../redux/slices/TablaDataReducer";
import Swal from "sweetalert2";
import { Box, Typography } from "@mui/material";
import { GenericTable } from "../../GenericTable/GenericTable";
import { BotonNuevo } from "../../Botones/BotonNuevo";
import { Container } from "react-bootstrap";

export const UnidadesMedidaCrud = () => {
    const unidadesMedida = useLoaderData() as UnidadMedida[];
    const dispatch = useAppDispatch();
    const service: UnidadMedidaService = new UnidadMedidaService();

    useEffect(() => {
        dispatch(setDataTable(unidadesMedida));
    }, []);

    const columnsTableUnidadesMedida = [
        {
            label: "Denominacion",
            key: "denominacion"
        }
        ,
        {
            label: "Acciones",
            key: "acciones"
        }
    ];

    const getUnidadesMedida = async () => {
        await service.getAll().then((data) => {
            dispatch(setDataTable(data));
        });
    };


    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Seguro que desea eliminar la unidad de medida?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                service.delete(id).then(() => {
                    getUnidadesMedida();
                });
            }
        });
    };

    const handleSelect = () => {
        dispatch(removeElementActive());
    }

    return (
        <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
            <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
                <Typography variant="h5" gutterBottom>
                    Unidades de Medida
                </Typography>
                <BotonNuevo/>
            </Box>
            <GenericTable<UnidadMedida>
                handleDelete={handleDelete}
                columns={columnsTableUnidadesMedida}
                handleSelect={handleSelect}
                handleHabilitar={() => {}}>
            </GenericTable>
            </Container>
        </Box>
    )
}


//loader function
export const unidadesMedidaLoader = async () => {
    const service: UnidadMedidaService = new UnidadMedidaService();
    return service.getAll();
}
