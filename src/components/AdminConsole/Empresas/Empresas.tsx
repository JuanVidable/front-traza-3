import { Box, Typography } from "@mui/material"
import "../../../styles/AdminConsole.css"
import { Empresa } from "../../../types/Empresas/Empresa";
import { Card, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPencil } from "@coreui/icons";
import { EmpresaService } from "../../../services/EmpresaService";
import { Link } from "react-router-dom";
import { EmptyCard } from "../EmptyCard/EmptyCard";
import { EmpresaForm } from "./EmpresaForm";
import { useAppDispatch } from "../../../hooks/redux";
import { setEmpresa } from "../../../redux/slices/EmpresaReducer";
import { empresaVacia } from "../../../types/TiposVacios";
import { ImageContextProvider } from "../../../context/ImagenContext";

export const Empresas = () => {
  //estado para manejar la lista de empresas
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  
  //estado para manejar la apertura y cierre de la modal
  const [showModal, setShowModal] = useState<boolean>(false);
  
  //estado para manejar la empresa a editar o la empresa nueva
  const [empresaForm, setEmpresaForm] = useState<Empresa>({
    id: 0,
    eliminado: false,
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: "",
    sucursales: []
  });
  
  //servicio de empresa para realizar las llamadas a la api
  const service = new EmpresaService();
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    //traigo empresas por servicio
    service.getAll().then((lista) => {
      setEmpresas(lista);
    }); 
  }, []);

  //funcion para manejar la eliminación de una empresa
  const handleDelete = (id: number) => {
    //muestro una alerta para confirmar la eliminación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eliminar la empresa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if(result.isConfirmed){
        service.delete(id);

        //elimino la empresa de la lista
        var auxArray: Empresa[] = empresas.slice();
        var index = 0;
        auxArray.forEach((emp, i) => {
          if(emp.id == id) index = i;
        });
        auxArray.splice(index, 1);
        setEmpresas(auxArray);
      }
    });
  };

  //funcion que abre el modal para editar la empresa
  const handleEdit = (e: Empresa) => {
    setEmpresaForm(e);  //seteo la empresa a editar
    setShowModal(true); //muestro la ventanaq modal
  };

  //funcion para guardar la empresa nueva o los cambio hechos en una empresa
  const saveEmpresa = async (empresa: Empresa) => {
    //reemplazo la empresa de la lista
    var auxArray: Empresa[] = empresas.slice();
    
    if(empresa.id != 0) {
      var index = 0;
      auxArray.forEach((emp, i) => {
        if(emp.id == empresa?.id) index = i;
      });
      auxArray.splice(index, 1);

      var newEmpresa = await service.put(empresa.id, empresa);
    } else {
      var newEmpresa = await service.post(empresa);
    }

    auxArray.push(newEmpresa);
    setEmpresas(auxArray);    

    handleClose();
  }

  const hanldeEmpresaSelection = async (empresa: Empresa) => {
    const data = await service.getFull(empresa.id);
    dispatch(setEmpresa(data));
  };

  const handleClose = () => {
    setEmpresaForm(empresaVacia);
    setShowModal(false);
  };

  return (
    <div>
      <Box>
        <Typography variant="h5" gutterBottom>
          ¿Con qué empresa quiere acceder?
        </Typography>
      </Box>
      <div className="d-flex flex-row card-container">
        <EmptyCard create={() => setShowModal(true)} item="empresa" />
        
        {empresas?.map((empresa: Empresa, index: number) => (
        <Card key={index} className="filled-card">
          <Card.Body as={Link} onClick={() => hanldeEmpresaSelection(empresa)} to={"sucursales/"+empresa.id} className="filled-card-body">
            <Card.Img  className="img-fluid mb-2" variant="top" src={empresa.logo}  />
            <Card.Title>{empresa.nombre}</Card.Title>
            <Card.Text>
              Razón social: {empresa.razonSocial} <br/>
              Cuit: {empresa.cuit}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <IconButton aria-label="editar" style={{backgroundColor: "var(--itemsColor)", marginRight: '2rem'}} onClick={() => handleEdit(empresa)}>
              <CIcon icon={cilPencil} size="lg" />
            </IconButton>
            <IconButton aria-label="eliminar" style={{backgroundColor: "var(--itemsColor)"}} onClick={() => handleDelete(empresa.id)}>
              <CIcon icon={cilTrash} size="lg" />
            </IconButton>
          </Card.Footer>
        </Card>
        ))}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Empresa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageContextProvider><EmpresaForm saveChanges={saveEmpresa} empresa={empresaForm} /></ImageContextProvider>
        </Modal.Body>
      </Modal>
    </div>
  )
};
