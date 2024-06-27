import { Col, Container, Modal, Row } from "react-bootstrap"
import { useAppSelector } from "../../../../hooks/redux";
import formatPrice from "../../../../types/formats/priceFormat";
import { GenericGallery } from "../../../GenericGallery/GenericGallery";
import formatBoolean from "../../../../types/formats/booleanFormat";

//defino que va a recibir la ventana
interface IPropsInsumoDetailModal {
    open: boolean,  //un booleano para indicar si se muestra o no
    handleClose: () => void,    //una funcion para cerrarla
}

export const InsumoDetailModal = ({
    open,
    handleClose
    } : IPropsInsumoDetailModal
) => {
    
  const item = useAppSelector((state) => state.tableDataReducer.elementActive);

  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
            {item? <Modal.Title>{item.codigo} {item.denominacion}</Modal.Title>: null}
        </Modal.Header>
        <Modal.Body>
          {item?
            <Container>
                <Row className="mb-3">
                    <Col>
                        <GenericGallery imagenes={item.imagenes}></GenericGallery>
                    </Col>
                    <Col>
                        <b>Unidad de medida:</b> {item.unidadMedida.denominacion} <br />
                        <b>Categoría:</b> {item.categoria.denominacion} <br/>
                        <b>Precio de compra:</b> {formatPrice(item.precioCompra)} <br />
                        {!item.esParaElaborar ? 
                            <><b>Precio de venta:</b> {formatPrice(item.precioCompra)} <br /></>
                         : (
                            <><b>Es para elaborar:</b> {formatBoolean(item.esParaElaborar)} <br/></>
                        )}
                    </Col>
                </Row>
                <Row>
                </Row>
            </Container>
          : null } 
        </Modal.Body>
    </Modal>
  )
}
