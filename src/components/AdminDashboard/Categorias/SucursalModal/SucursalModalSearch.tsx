import { Button, Col, Modal, Row, Form, Container } from "react-bootstrap"
import { FC, useEffect, useState } from "react";
import "../../../../styles/SucursalModalSearch.module.css"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setSucursalesSelected } from "../../../../redux/slices/SucursalesReducer";
import { Sucursal } from "../../../../types/Empresas/Sucursal";

interface IPropsSucursalModalSearch {
  open: boolean;
  handleClose: () => {};
  options: Sucursal[];
}

export const SucursalModalSearch: FC<IPropsSucursalModalSearch> = ({ open, handleClose, options }) => {
  const [filteredData, setFilteredData] = useState<Sucursal[]>([]);
  const dispatch = useAppDispatch();
  const sucursalesSelected = useAppSelector((state) => (state.sucursalesReducer.sucursalesSelected));

  useEffect(() => {
    setFilteredData(options);
  }, [options]);

  const handleCheckButtonChange = (item: Sucursal, checked: boolean) => {

    var aux: Sucursal[] = sucursalesSelected.slice();
    var f = 0;
    var found = aux.some(function (element, index) { f = index; return element.id == item.id; });

    if (checked) {
      if (!found)
        aux.push(item);
    } else {
      if (found)
        aux.splice(f, 1);
    }
    dispatch(setSucursalesSelected(aux));
  };

  const handleChangeDenominacion = (value: string) => {
    const results = options.filter(
      option => (option.nombre?.toString().toUpperCase().includes(value.toUpperCase()))
    );
    setFilteredData(results);
  };

  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <Modal.Title>Agregar sucursales</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {filteredData ?
          <Container className="search-container mb-3">
            <Form.Control
              className="search"
              aria-label="denominacion"
              placeholder="Denominación"
              onChange={(e: { target: { value: string; }; }) => { handleChangeDenominacion(e.target.value) }} />
          </Container>
          : null}
        <Container className="grid-container">
          {filteredData ? filteredData.map((option: Sucursal, index: number) => (
            <Row key={index}>
              <Col md="auto">
                <Form.Check radioGroup="seleccionados" checked aria-label={option.nombre} name={String(option.id)} onChange={(e) => handleCheckButtonChange(option, e.target.checked)} />
              </Col>
              <Col md="6">
                {option.nombre}
              </Col>
            </Row>
          )) :
            <Row>
              <Col>
                {options ? <p>Ninguna sucursal concuerda con la búsqueda</p> : <p>No hay sucursales para agregar</p>}
              </Col>
            </Row>
          }
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btnClose" type="button" onClick={handleClose}>CERRAR</Button>
        <Button className="btnAdd" type="button" onClick={handleClose}>AGREGAR</Button>
      </Modal.Footer>
    </Modal>
  )
}
