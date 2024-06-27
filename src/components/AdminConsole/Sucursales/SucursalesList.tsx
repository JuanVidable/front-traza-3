import { Sucursal } from "../../../types/Empresas/Sucursal";
import { Card, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPencil } from "@coreui/icons";
import { SucursalService } from "../../../services/SucursalService";
import { Link } from "react-router-dom";
import { EmptyCard } from "../EmptyCard/EmptyCard";
import { SucursalForm } from "./SucursalForm";
import { useAppDispatch } from "../../../hooks/redux";
import { setSucursal } from "../../../redux/slices/SucursalReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { sucursalVacia } from "../../../types/TiposVacios";

export const SucursalesList = () => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tieneCasaMatriz, setTieneCasaMatriz] = useState<boolean>(false);

  const emp = useSelector((state: RootState) => state.empresaReducer.empresa);

  const [sucursalForm, setSucursalForm] = useState<Sucursal>(sucursalVacia);

  const service = new SucursalService();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (emp){
      service.findByEmpresaId(emp.id).then((data) => {
        setSucursales(data);
      });
    } 
  }, [emp, sucursalForm]);

  //seteo el estado con si existe una sucursal que sea casa matriz
  useEffect(() => {
    //busco si tiene casa matriz
    const tieneCasaMatrizInicial = sucursales.some( 
      function (sucursal) {
        return sucursal.esCasaMatriz == true;
      }
    );

    //si la tiene seteo el estado
    setTieneCasaMatriz(tieneCasaMatrizInicial);
  }, [sucursales]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar la sucursal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        service.delete(id);

        var auxArray: Sucursal[] = sucursales.slice();
        var index = 0;
        auxArray.forEach((suc, i) => {
          if (suc.id == id) index = i;
        });
        auxArray.splice(index, 1);
        setSucursales(auxArray);
      }
    });
  };

  const handleEdit = (e: Sucursal) => {
    setSucursalForm(e);
    setShowModal(true);
  };

  const saveSucursal = async (sucursal: Sucursal) => {
    var auxArray: Sucursal[] = sucursales.slice();

    if (sucursal.id != 0) {
      var index = 0;
      auxArray.forEach((suc, i) => {
        if (suc.id == sucursal?.id) index = i;
      });
      auxArray.splice(index, 1);

      var newSucursal = await service.put(sucursal.id, sucursal);
    } else {
      var newSucursal = await service.post(sucursal);
    }

    auxArray.push(newSucursal);
    setSucursales(auxArray);

    handleClose();
  }

  const hanldeSucursalSelection = (sucursal: Sucursal) => {
    dispatch(setSucursal(sucursal));
  };

  const handleClose = () => {
    setSucursalForm(sucursalVacia);
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex flex-row card-container">
        <EmptyCard create={() => setShowModal(true)} item="sucursal" />
        {sucursales?.map((sucursal: Sucursal, index: number) => (
          <Card key={index} className="filled-card">
            <Card.Body as={Link} onClick={() => hanldeSucursalSelection(sucursal)} to={"/dashboard"} className="filled-card-body">
              <Card.Title>{sucursal.nombre}</Card.Title>
              <Card.Text>
                Domicilio: {sucursal.domicilio.calle} <br />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <IconButton aria-label="editar" style={{ backgroundColor: "var(--itemsColor)", marginRight: '2rem' }} onClick={() => handleEdit(sucursal)}>
                <CIcon icon={cilPencil} size="lg" />
              </IconButton>
              <IconButton aria-label="eliminar" style={{ backgroundColor: "var(--itemsColor)" }} onClick={() => handleDelete(sucursal.id)}>
                <CIcon icon={cilTrash} size="lg" />
              </IconButton>
            </Card.Footer>
          </Card>
        ))}
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Sucursal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SucursalForm saveChanges={saveSucursal} sucursal={sucursalForm} tieneCasaMatriz={tieneCasaMatriz} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

