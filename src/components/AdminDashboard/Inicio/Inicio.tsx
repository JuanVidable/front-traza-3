import { Box, Typography } from "@mui/material"
import { Col, Container, Row, Card } from "react-bootstrap"
import "../../../styles/Inicio.module.css"
import CIcon from "@coreui/icons-react"
import { cilGroup, cilFastfood, cilBuilding } from "@coreui/icons"
import { Link } from "react-router-dom"

export const Inicio = () => {
  return (
    <Box  component="main" sx={{ flexGrow: 1, my: 2 }}>
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
              <Typography variant="h5" gutterBottom>
                ¡Bienvenido!
              </Typography>
            </Box>
            <Container>
                <Row>
                    <Col>
                        <Card as={Link} to="sucursales" className="inicio-card">
                            <Card.Body className="inicio-card-body" >
                                <CIcon icon={cilBuilding} size="3xl" />
                                <Card.Img variant="top"></Card.Img>
                                <Card.Title>Sucursales</Card.Title>
                                <Card.Text>
                                    Administrar sucursales
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card as={Link} to="productos" className="inicio-card">
                            <Card.Body className="inicio-card-body">
                                <CIcon icon={cilFastfood} size="3xl" />
                                <Card.Img variant="top"></Card.Img>
                                <Card.Title>Productos</Card.Title>
                                <Card.Text>
                                    Administrar productos
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card as={Link} to="empleados" className="inicio-card">
                            <Card.Body className="inicio-card-body">
                                <CIcon icon={cilGroup} size="3xl" />
                                <Card.Img variant="top"></Card.Img>
                                <Card.Title>Empleados</Card.Title>
                                <Card.Text>
                                    Administrar empleados
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    </Box>
  )
}
