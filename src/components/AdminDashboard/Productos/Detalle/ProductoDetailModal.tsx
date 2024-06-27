import { Col, Container, Modal, Row } from "react-bootstrap"
import { useAppSelector } from "../../../../hooks/redux";
import formatPrice from "../../../../types/formats/priceFormat";
import { ArticuloManufacturadoDetalle } from "../../../../types/Articulos/ArticuloManufacturadoDetalle";
import { GenericGallery } from "../../../GenericGallery/GenericGallery";
import styles from "../../../../styles/ProductoDetailModal.module.css"

//defino que va a recibir la ventana
interface IPropsProductoDetailModal {
    open: boolean,  //un booleano para indicar si se muestra o no
    handleClose: () => void,    //una funcion para cerrarla
}

export const ProductoDetailModal = ({
    open,
    handleClose
    } : IPropsProductoDetailModal
) => {
    
  const item = useAppSelector((state) => state.tableDataReducer.elementActive);

  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
            {item!=undefined? <Modal.Title  className={styles.title}> 
                <p className={styles.title}>{item.codigo}</p> 
                <p className={styles.title}>{item.denominacion}</p> 
                {item.habilitado ? <div className={styles.habilitadoBox}><p className={styles.habilitadoLabel}>HABILITADO</p></div> : 
                <div className={styles.deshabilitadoBox}><p className={styles.deshabilitadoLabel}>DESHABILITADO</p></div>}</Modal.Title>: null}
        </Modal.Header>
        <Modal.Body>
          {item!=undefined?
            <Container>
                <Row className="mb-3">
                    <Col>
                        <GenericGallery imagenes={item.imagenes}></GenericGallery>
                    </Col>
                    <Col>
                        <b>Precio de venta:</b> {formatPrice(item.precioVenta)} <br />
                        <b>Unidad de medida:</b> {item.unidadMedida.denominacion} <br />
                        <b>Categoría:</b> {item.categoria.denominacion} <br/>
                        <b>Tiempo estimado de preparación:</b> {item.tiempoEstimadoMinutos}'
                    </Col>
                </Row>
                <Row className="mb-3">
                    <b>Descripción</b>
                    {item.descripcion}
                </Row>
                <Row className="mb-3">
                    <b>Preparación</b>
                    {item.preparacion}
                </Row>
                <Row>
                    <Container>
                        <Row>
                            <b>Ingredientes</b>
                        </Row>
                        {item.articuloManufacturadoDetalles?.map((detalle: ArticuloManufacturadoDetalle, index: number) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        {detalle.cantidad} {detalle.articuloInsumo.unidadMedida.denominacion} de {detalle.articuloInsumo.denominacion}
                                    </Col>
                                </Row>
                            )
                        })}
                    </Container>
                </Row>
            </Container>
          : null } 
        </Modal.Body>
    </Modal>
  )
}
