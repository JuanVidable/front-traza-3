import { Form, Button, Col, Container, Modal, ModalBody, ModalHeader, ModalTitle, Row, ModalFooter } from "react-bootstrap"
import { FC, useEffect, useState } from "react"
import { ArticuloInsumo } from "../../../../types/Articulos/ArticuloInsumo"
import { ArticuloManufacturadoDetalle } from "../../../../types/Articulos/ArticuloManufacturadoDetalle"
import styles from "../../../../styles/ProductoModalInsumos.module.css"

interface IPropsModalInsumos {
    show: boolean,  //indica si se muestra o no la ventana
    close: () => void, //funcion para cerrar la ventana
    add: (array: ArticuloManufacturadoDetalle[]) => void, //funcion para devolver los detalles al componente padre
    array: ArticuloManufacturadoDetalle[] //detalles existentes
    options: ArticuloInsumo[]   //arreglos con los insumos a mostrar
}

export const ModalInsumos: FC<IPropsModalInsumos> = ({
    show,
    close,
    add,
    options,
    array
}) => {

  //estado para manejar los insumos cuyos checkbox sean marcados
  const [insumosSelected, setInsumosSelected] = useState<ArticuloInsumo[]>([]);

  //estado para manejar la búsqueda
  const [filteredData, setFilteredData] = useState<ArticuloInsumo[]>([]);

  useEffect(() => {
    setFilteredData(options);
  }, [options]);

  //funcion para cerrar la ventana
  const handleClose = () => {
    setInsumosSelected([]); //limpiar los insumos seleccionados
    close();  //cerrar la ventana
  };

  //funcion para añadir los insumos al arreglo de detalles del componente padre
  const handleAdd = () => {
    if(insumosSelected.length != 0){  //si he seleccionado insumos
      //creo un detalle a partir de cada insumo y los almaceno en un array de detalles
      var detallesAux: ArticuloManufacturadoDetalle[] = array.slice();

      insumosSelected.forEach((insumo: ArticuloInsumo) => {
        var newDetalle: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle();
        newDetalle.articuloInsumo = insumo;
        detallesAux.push(newDetalle);
      });

      //console.log(detallesAux);
      add(detallesAux);
      handleClose();
    }
  };

  //funcion para añadir insumo cuando se marque el checkbox
  const addToSelected = (insumo: ArticuloInsumo) => {
    var selectedAux: ArticuloInsumo[] = insumosSelected.slice();
    selectedAux.push(insumo);
    setInsumosSelected(selectedAux);
  }

  //funcion para eliminar insumo cuando se desmarque el checkbox
  const removeFromSelected = (insumo: ArticuloInsumo) => {
    var selectedAux: ArticuloInsumo[] = insumosSelected.slice();
    var index: number = 0;
    var found = selectedAux.some((ins: ArticuloInsumo, i: number) => {
      index = i; return ins===insumo
    });
    if(found){
      selectedAux.splice(index, 1);
    }
    setInsumosSelected(selectedAux);
  }

  //funcion para manejar el cambio del checkbox
  const handleCheckChange = (checked: boolean, insumo: ArticuloInsumo) => {
    if(checked) {
      addToSelected(insumo);
    } else {
      removeFromSelected(insumo);
    }
  }; 

  const handleChangeCodigo = (value: string) => {
    //filtramos las opciones segun el valor ingresado
    const results = options.filter(
        option => (option.codigo.toUpperCase().includes(value.toUpperCase()))
    );
    setFilteredData(results);
  };

  //función para realizar la búsqueda de opciones por denominacion
  const handleChangeDenominacion = (value: string) => {
    //filtramos las opciones segun el valor ingresado
    const results = options.filter(
        option => (option.denominacion.toUpperCase().includes(value.toUpperCase()))
    );
    setFilteredData(results);
  };

  return (
    <Modal show={show} centered size="lg">
        <ModalHeader>
            <ModalTitle></ModalTitle>
        </ModalHeader>
        <ModalBody>
            {filteredData? //al abrir el modal solo muestro los filtros si tengo datos
              <Container className={styles.searchContainer + " mb-3"}>
                {/*Input para las búsquedas por código y denominación */}
                <Form.Control 
                    className={styles.search} 
                    aria-label="codigo" 
                    placeholder="Código" 
                    onChange={(e) => {handleChangeCodigo(e.target.value)}} /> 
                <Form.Control 
                    className={styles.search}
                    aria-label="denominacion" 
                    placeholder="Denominación" 
                    onChange={(e) => {handleChangeDenominacion(e.target.value)}}/>
            </Container>
            : null}
            <Container className={styles.gridContainer}>
              {
                filteredData? filteredData.map((insumo: ArticuloInsumo, index: number) => (
                  <Row key={index}>
                    <Col md="auto">
                      <Form.Check radioGroup="seleccionados" onChange={(e) => handleCheckChange(e.target.checked, insumo)} />
                    </Col>
                    <Col md="6">
                      {insumo.codigo}
                    </Col>
                    <Col>
                      {insumo.denominacion}
                    </Col>
                  </Row>
                )):
                <Row>
                    {/*Si no hay opciones muestro un mensaje */}
                    <Col>
                        {options? <p>Ningún ingrediente concuerda con la búsqueda</p> : <p>No hay ingredientes para agregar</p>}
                    </Col>
                </Row>
              }
            </Container>
        </ModalBody>
        <ModalFooter>
          <Button type="button" className={styles.btnClose} onClick={handleClose} >CERRAR</Button>
          <Button type="button" className={styles.btnAdd} onClick={handleAdd} >AÑADIR</Button>
        </ModalFooter>
    </Modal>
  )
}
