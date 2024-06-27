import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import { UnidadMedidaService } from "../../../../services/UnidadMedidaService";
import { UnidadMedida } from "../../../../types/Articulos/UnidadMedida";
import { unidadMedidaVacia } from "../../../../types/TiposVacios";
import { BotonVolver } from "../../../Botones/BotonVolver";
import styles from "../../../../styles/ProductForm.module.css"

export const UnidadMedidaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service: UnidadMedidaService = new UnidadMedidaService();

  const [unidadMedida, setUnidadMedida] = useState<UnidadMedida>(new UnidadMedida());

  useEffect(() => {
    if (id) {
      service.getById(Number(id)).then((data) => {
        var u = data as UnidadMedida;
        setUnidadMedida(u);
      }).catch((error) => console.log(error));
    } else {
      setUnidadMedida(unidadMedidaVacia);
    }
  }, []);


  //formulario
  const save = async () => {

    if(unidadMedida.denominacion == ""){
      alert("Debes completar la denominación.");
      return;
    }

    await service.post(unidadMedida);
    navigate(-1);

  }

  return (
    <div className={styles.mainBox}>
      <div className={ styles.headerBox + " mb-3"}>
        <Typography variant="h5" gutterBottom>
          {`${id ? "Editar" : "Crear"} una unidad de medida`}
        </Typography>
        <BotonVolver/>
      </div>

      <Form className="w-100" >
        <Form.Group as={Row} className="mb-3" controlId="denominacion">
          <Form.Label column sm={2}>
            Denominación
          </Form.Label>
          <Col sm={10}>
            <Form.Control required type="text" placeholder="Denominación" defaultValue={unidadMedida?.denominacion.toString()} onChange={e => unidadMedida.denominacion = String(e.target.value)} />
          </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={save} type="button">CONFIRMAR</Button>
          </Col>
        </Form.Group>
      </Form>
    </div >
  )
}
