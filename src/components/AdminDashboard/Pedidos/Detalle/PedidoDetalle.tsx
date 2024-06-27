import { Col, Container, Modal, Row } from "react-bootstrap"
import { useAppSelector } from "../../../../hooks/redux";
import formatPrice from "../../../../types/formats/priceFormat";
import { DetallePedidoDto } from "../../../../types/Pedido/DetallePedido";
import styles from "../../../../styles/ProductoDetailModal.module.css"

//defino que va a recibir la ventana
interface IPropsPedidoDetalle {
    open: boolean,  //un booleano para indicar si se muestra o no
    handleClose: () => void,    //una funcion para cerrarla
}

export const PedidoDetalle = ({
    open,
    handleClose
    } : IPropsPedidoDetalle
) => {

  const item = useAppSelector((state) => state.tableDataReducer.elementActive);

  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
            {item!=undefined? 
            <Modal.Title  className={styles.title}> 
                <p className={styles.title}>Pedido NRO {item.id}</p> 
                <p className={styles.title + " text-warning"}>{item.estadoPedido.toString()}</p> 
            </Modal.Title>: null}
        </Modal.Header>
        <Modal.Body>
          {item!=undefined?
            <Container>
                <Row className="mb-3">
                    <Col>
                        <h6 className="text-primary">Cliente</h6>
                        <b>Nombre y Apellido:</b> {item.cliente.nombre} {item.cliente.apellido} <br/>
                        <b>Teléfono:</b> {item.cliente.telefono} <br/>
                    </Col>
                    <Col>
                        <h6 className="text-primary">Sucursal</h6> {item.sucursal.nombre} <br/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h6 className="text-primary">Pedido</h6>
                        <b>Fecha:</b> {item.fechaPedido} <br/>
                        <b>Hora Estimada de Finalización:</b> {item.horaEstimadaFinalizacion} <br/>
                        <b>Tipo de Envío:</b> {item.tipoEnvio.toString()} <br/>
                    </Col>
                    <Col>
                        <b>Forma de Pago:</b> {item.formaPago.toString()} <br/>
                        <b>TOTAL:</b> {formatPrice(item.total)} <br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6 className="text-primary">Detalles</h6> 
                    </Col>
                </Row>
                { item.detallePedidos.map((detalle: DetallePedidoDto, i: number) => 
                        <Row key={i}>
                            <Col className="text-center" sm={1}>
                                {detalle.cantidad}
                            </Col>
                            { detalle.articulo?
                                <Col>
                                    {detalle.articulo.denominacion}
                                </Col>
                              :
                                <Col>
                                    Promoción {detalle.promocion?.denominacion}
                                </Col>
                            }
                        </Row>                
                    )       
                }
            </Container>
          : null } 
        </Modal.Body>
    </Modal>
  )
}
