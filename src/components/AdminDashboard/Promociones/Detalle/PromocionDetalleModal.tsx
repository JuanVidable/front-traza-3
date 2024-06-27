import { FC } from "react"
import { Modal, Row, Col, Container } from "react-bootstrap"
import { useAppSelector } from "../../../../hooks/redux"
import styles from "../../../../styles/ProductoDetailModal.module.css"
import { GenericGallery } from "../../../GenericGallery/GenericGallery"
import formatPrice from "../../../../types/formats/priceFormat"
import { PromocionDetalle } from "../../../../types/Articulos/PromocionDetalle"

interface IPropsPromocionDetalleModal {
    open: boolean,
    handleClose: () => void
}

export const PromocionDetalleModal : FC<IPropsPromocionDetalleModal> = ({
    open,
    handleClose
}) => {
  const item =useAppSelector((state) => state.tableDataReducer.elementActive);
  console.log(item);

  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
            {item?.denominacion &&
                <Modal.Title  className={styles.title}> 
                    <p className={styles.title}>{item.denominacion}</p> 
                    {item.habilitado ? 
                        <div className={styles.habilitadoBox}>
                            <p className={styles.habilitadoLabel}>HABILITADO</p>
                        </div> 
                        : 
                        <div className={styles.deshabilitadoBox}>
                            <p className={styles.deshabilitadoLabel}>DESHABILITADO</p>
                        </div>
                    }
                </Modal.Title>
            }
        </Modal.Header>
        <Modal.Body>
          {item!=undefined &&
            <Container>
                <Row className="mb-3">
                    <Col>
                        <GenericGallery imagenes={item.imagenes}></GenericGallery>
                    </Col>
                    <Col>
                        <b>Precio Promocional:</b> {formatPrice(item.precioPromocional)} <br />
                        <b>Duración</b><br/>
                            <b>Inicio:</b> {item.fechaDesde} {item.horaDesde} <br />
                            <b>Fin:</b> {item.fechaHasta} {item.horaHasta} <br />
                        <b>Tipo de Promoción:</b> {item.tipoPromocion} <br/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <b>Descripción</b>
                    {item.descripcionDescuento}
                </Row>
                <Row>
                    <Container>
                        <Row>
                            <b>Articulos</b>
                        </Row>
                        {item?.promocionDetalles?.map((detalle: PromocionDetalle, index: number) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        {detalle.cantidad} {console.log(detalle.articulo)} de {detalle.articulo.denominacion}
                                    </Col>
                                </Row>
                            )
                        })}
                    </Container>
                </Row>
            </Container>
          } 
        </Modal.Body>
    </Modal>
  )
}
