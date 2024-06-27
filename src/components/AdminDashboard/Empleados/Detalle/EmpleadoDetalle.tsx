import { Col, Container, Modal, Row } from "react-bootstrap"
import { useAppSelector } from "../../../../hooks/redux";
import { GenericGallery } from "../../../GenericGallery/GenericGallery";

//defino que va a recibir la ventana
interface IPropsEmpleadoDetalle {
    open: boolean,  //un booleano para indicar si se muestra o no
    handleClose: () => void,    //una funcion para cerrarla
}

export const EmpleadoDetalle = ({
    open,
    handleClose
    } : IPropsEmpleadoDetalle
) => {

  const item = useAppSelector((state) => state.tableDataReducer.elementActive);

  return (
    <Modal show={open} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
            {item!=undefined? <Modal.Title>{item.nombre} {item.apellido}</Modal.Title>: null}
        </Modal.Header>
        <Modal.Body>
          {item!=undefined?
            <Container>
                <Row className="mb-3">
                    <Col>
                        <GenericGallery imagenes={item.imagenPersona}></GenericGallery>
                    </Col>
                    <Col>
                        <b>Teléfono:</b> {item.telefono} <br />
                        <b>Email:</b> {item.usuario.email} <br/>
                        <b>Fecha de Nacimiento:</b> {item.fechaNacimiento} <br />
                        <b>Nombre de usuario: </b> {item.usuario.username} <br/>
                        <b>Puesto/Rol: </b> {item.usuario.rol} <br/>
                    </Col>
                </Row>
            </Container>
          : null } 
        </Modal.Body>
    </Modal>
  )
}
