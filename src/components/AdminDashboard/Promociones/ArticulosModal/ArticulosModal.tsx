import { FC } from "react"
import { PromocionDetalle } from "../../../../types/Articulos/PromocionDetalle"
import { Modal, Container, Form, Button, Row, Col } from "react-bootstrap"
import { useState } from "react"
import styles from "../../../../styles/ProductoModalInsumos.module.css"
import { Articulo } from "../../../../types/Articulos/Articulo"
import { useEffect } from "react"

interface IPropsArticulosModal {
    show: boolean,
    close: () => void,
    add: (array: PromocionDetalle[]) => void,
    options: Articulo[]
    array: PromocionDetalle[]
}

export const ArticulosModal : FC<IPropsArticulosModal> = ({
    show,
    close,
    add,
    options,
    array
}) => {
  //estado para manejar los articulos cuyos checkbox sean marcados
  const [articulosSelected, setArticulosSelected] = useState<Articulo[]>([]);

  //estado para manejar la búsqueda
  const [filteredData, setFilteredData] = useState<Articulo[]>([]);

  useEffect(() => {
    setFilteredData(options);
  }, [options]);

  //funcion para cerrar la ventana
  const handleClose = () => {
    setArticulosSelected([]); //limpiar los insumos seleccionados
    close();  //cerrar la ventana
  };

  //funcion para añadir los insumos al arreglo de detalles del componente padre
  const handleAdd = () => {
    if(articulosSelected.length != 0){  //si he seleccionado insumos
      //creo un detalle a partir de cada insumo y los almaceno en un array de detalles
      var detallesAux: PromocionDetalle[] = array.slice();

      articulosSelected.forEach((art: Articulo) => {
        var newDetalle: PromocionDetalle = {
          id: 0,
          eliminado: false,
          cantidad: 0,
          articulo: art
        }
        detallesAux.push(newDetalle);
      });

      console.log(detallesAux);
      add(detallesAux);
      console.log(array);
      handleClose();
    }
  };

  //funcion para añadir articlo cuando se marque el checkbox
  const addToSelected = (art: Articulo) => {
    var selectedAux: Articulo[] = articulosSelected.slice();
    selectedAux.push(art);
    setArticulosSelected(selectedAux);
  }

  //funcion para eliminar articulo cuando se desmarque el checkbox
  const removeFromSelected = (art: Articulo) => {
    var selectedAux: Articulo[] = articulosSelected.slice();
    var index: number = 0;
    var found = selectedAux.some((articulo: Articulo, i: number) => {
      index = i; return articulo===art
    });
    if(found){
      selectedAux.splice(index, 1);
    }
    setArticulosSelected(selectedAux);
  }

  //funcion para manejar el cambio del checkbox
  const handleCheckChange = (checked: boolean, articulo: Articulo) => {
    if(checked) {
      addToSelected(articulo);
    } else {
      removeFromSelected(articulo);
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
        <Modal.Header>
            <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {filteredData? //al abrir el modal solo muestro los filtros si tengo datos
              <Container className={styles.searchContainer + " mb-3"}> 
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
                filteredData? filteredData.map((articulo: Articulo, index: number) => (
                  <Row key={index}>
                    <Col md="auto">
                      <Form.Check radioGroup="seleccionados" onChange={(e) => handleCheckChange(e.target.checked, articulo)} />
                    </Col>
                    <Col md="6">
                      {articulo.codigo}
                    </Col>
                    <Col>
                      {articulo.denominacion}
                    </Col>
                  </Row>
                )):
                <Row>
                    <Col>
                        {options? <p>Ningún ingrediente concuerda con la búsqueda</p> : <p>No hay ingredientes para agregar</p>}
                    </Col>
                </Row>
              }
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" className={styles.btnClose} onClick={handleClose} >CERRAR</Button>
          <Button type="button" className={styles.btnAdd} onClick={handleAdd} >AÑADIR</Button>
        </Modal.Footer>
    </Modal>
  )
}
